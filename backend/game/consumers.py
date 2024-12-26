import asyncio
import random
import json
from authentification.models import Client
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q 
from collections import deque
from game.models import Game

connected_users = deque()  # list of connected clients
connected_users_set = set()  # set of connected clients
user_channels = {}  # map of user to channel name
game_states = {}  # Dictionary to store GameState instances for each match
max_score = 2

class GameState:
    def __init__(self, match_name, consumer=None):
        self.consumer = consumer
        self.match_name = match_name
        self.is_active = False
        self.canvas_width = 1000
        self.canvas_height = 500
        
        # Initialize game objects for this specific match
        self.ball = {
            "x": self.canvas_width / 2,
            "y": self.canvas_height / 2,
            "velocityX": 4,
            "velocityY": 4,
            "radius": 10,
            "color": "yellow",
        }

        self.pleft = {
            "id": None,  # Will be set when players join
            "x": 10,
            "y": self.canvas_height / 2 - 50,
            "width": 10,
            "height": 100,
            "speed": 20,
            "score": 0,
            "color": "blue",
        }

        self.pright = {
            "id": None,  # Will be set when players join
            "x": self.canvas_width - 20,
            "y": self.canvas_height / 2 - 50,
            "width": 10,
            "height": 100,
            "speed": 20,
            "score": 0,
            "color": "red",
        }

    def get_game_state(self):
        return {
            "canvas_width": self.canvas_width,
            "canvas_height": self.canvas_height,
            "ball": {
                "x": self.ball["x"],
                "y": self.ball["y"],
                "radius": self.ball["radius"],
                "velocityX": self.ball["velocityX"],
                "velocityY": self.ball["velocityY"],
                "color": self.ball["color"],
            },
            "pleft": {
                "x": self.pleft["x"],
                "y": self.pleft["y"],
                "width": self.pleft["width"],
                "height": self.pleft["height"],
                "speed": self.pleft["speed"],
                "score": self.pleft["score"],
                "color": self.pleft["color"],
            },
            "pright": {
                "x": self.pright["x"],
                "y": self.pright["y"],
                "width": self.pright["width"],
                "height": self.pright["height"],
                "speed": self.pright["speed"],
                "score": self.pright["score"],
                "color": self.pright["color"],
            },
        }
    def set_player_ids(self, player1_id, player2_id):
        self.pleft["id"] = player1_id
        self.pright["id"] = player2_id

    def update_ball(self):
        # Update ball position
        # print("------------- {  self.consumer  }-------------", self.consumer.users)


        self.ball["x"] += self.ball["velocityX"]
        self.ball["y"] += self.ball["velocityY"]

        # print(f"Ball position: ({self.ball['x']}, {self.ball['y']})")

        # Check for collisions with top and bottom walls
        if self.ball["y"] - self.ball["radius"] <= 0 or self.ball["y"] + self.ball["radius"] >= self.canvas_height:
            self.ball["velocityY"] *= -1  # Reverse vertical velocity


        # Check for collisions with paddles
        # Left paddle collision
        if (
            self.ball["x"] - self.ball["radius"] <= self.pleft["x"] + self.pleft["width"] and
            self.pleft["y"] <= self.ball["y"] <= self.pleft["y"] + self.pleft["height"]
        ):

            self.ball["velocityX"] *= -1  # Reverse horizontal velocity
            self.ball["x"] = self.pleft["x"] + self.pleft["width"] + self.ball["radius"]

        # Right paddle collision
        elif (
            self.ball["x"] + self.ball["radius"] >= self.pright["x"] and
            self.pright["y"] <= self.ball["y"] <= self.pright["y"] + self.pright["height"]
        ):
            self.ball["velocityX"] *= -1  # Reverse horizontal velocity
            self.ball["x"] = self.pright["x"] - self.ball["radius"]

        # Check for scoring

        if self.ball["x"] - self.ball["radius"] <= 0:
            self.pright["score"] += 1
            scoring_info = {
                "scorer": "player2",
                "scorer_id": self.pright["id"],
            }
            self.reset_ball()
            self.reset_paddles()
            asyncio.create_task(self.increase_score(scoring_info))
        elif self.ball["x"] + self.ball["radius"] >= self.canvas_width:
            self.pleft["score"] += 1
            scoring_info = {
                "scorer": "player1",
                "scorer_id": self.pleft["id"],
            }
            self.reset_ball()
            self.reset_paddles()
            asyncio.create_task(self.increase_score(scoring_info))


            
    def reset_paddles(self):
        # Reset paddles to the center
        self.pleft["y"] = self.canvas_height / 2 - self.pleft["height"] / 2
        self.pright["y"] = self.canvas_height / 2 - self.pright["height"] / 2

    def reset_ball(self):
        # Reset ball to the center
        self.ball["x"] = self.canvas_width / 2
        self.ball["y"] = self.canvas_height / 2
        self.ball["velocityX"] = 4  # Reverse horizontal direction
        self.ball["velocityY"] = 4  # Reset vertical velocity

    # ... rest of the GameState methods remain the same, but update group sends to use self.match_name ...
    async def increase_score(self, scoring_info):
        if not self.consumer:
            print("Error: No consumer available")
            return

        player1 = await database_sync_to_async(Client.objects.get)(id=self.pleft["id"])
        player2 = await database_sync_to_async(Client.objects.get)(id=self.pright["id"])

        await self.consumer.channel_layer.group_send(
            self.match_name,  # Use match-specific group
            {
                "type": "score_update",
                "message": {
                    "scorer": player1.username if scoring_info["scorer"] == "player1" else player2.username,
                    "scorer_id": scoring_info["scorer_id"],
                    "score": {
                        "player1": self.pleft["score"],
                        "player2": self.pright["score"]
                    }
                }
            }
        )

        if self.pleft["score"] >= max_score:
            winner = player1
            self.is_active = False
        elif self.pright["score"] >= max_score:
            winner = player2   # Loser's XP range
            self.is_active = False
        else:
            return

        await database_sync_to_async(Game.objects.create)(
            player1_id=player1,
            player2_id=player2,
            winner=winner,
            score_player1=self.pleft["score"],
            score_player2=self.pright["score"],
            xp_gained_player1=random.randint(100, 500) if winner.id == player2.id else random.randint(1000, 5000),
            xp_gained_player2=random.randint(100, 500) if winner.id == player1.id else random.randint(1000, 5000),
        )

        await self.consumer.channel_layer.group_send(
            self.match_name,
            {
                "type": "game_over",
                "message": f"Game Over! {winner.username} wins!",
                "winner": winner.username,
                "loser": player1.username if winner.id == player2.id else player2.username,
                "final_score": {
                    "player1": self.pleft["score"],
                    "player2": self.pright["score"]
                }
            }
        )

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.match_name = None
        self.game_state = None

    async def connect(self):
        self.player = {
            "username": self.scope.get('user').username,
            "avatar": self.scope.get('user').avatar if self.scope.get('user').avatar else "http://localhost:8000/media/avatars/anonyme.png",
            "numberPlayer": "",
            "id": self.scope.get('user').id,
            "match_name": "",
            "channel_name": self.channel_name,
        }
        
        await self.accept()
        
        user_exists = any(user['id'] == self.player['id'] for user in connected_users)
        print("-------------", connected_users)
        print("*************************", user_exists)
        if not user_exists:
            self.player["numberPlayer"] = "1" if len(connected_users) % 2 == 0 else "2"
            connected_users.append(self.player)
            print("-------------", connected_users)
            await self.send(json.dumps({"type": "connected", "data": self.player}))
            if len(connected_users) >= 2:
                try:
                    user1 = connected_users.popleft()
                    user2 = connected_users.popleft()
                    
                    if user1['id'] == user2['id']:
                        connected_users.appendleft(user1)
                        await self.send(json.dumps({
                            "type": "waiting_for_players",
                            "message": "Waiting for another player.",
                        }))
                        return
                    # Create match name and initialize game state
                    self.match_name = f"{user1['username']}vs{user2['username']}"
                    user1["match_name"] = self.match_name
                    user2["match_name"] = self.match_name

                    # Create new game state for this match
                    game_states[self.match_name] = GameState(self.match_name, self)
                    game_states[self.match_name].set_player_ids(user1['id'], user2['id'])
                    self.game_state = game_states[self.match_name]

                    # Add players to match-specific group
                    if user1 and user2:
                        await self.channel_layer.group_add(self.match_name, user1["channel_name"]) 
                        await self.channel_layer.group_add(self.match_name, user2["channel_name"])
                        await self.channel_layer.group_send(self.match_name, {
                                "type": "match_ready",
                                "user1": user1,
                                "user2": user2,
                                "match_name": self.match_name
                        })
                except Exception as e:
                    print(f"Error during matchmaking: {e}")
            else:
                await self.send(json.dumps({
                    "type": "waiting_for_players",
                    "message": "Waiting for another player.",
                }))
        else:
            print("ConectedUsers------------------", connected_users)
            await self.send(json.dumps({
                "type": "error",
                "message": "You are already connected in another window."
            }))
            await self.close()

    async def score_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "score_update",
            "message": event["message"]
        })) 

    async def match_ready(self, event):
        await self.send(text_data=json.dumps({
            "type": "match_ready",
            "user1": event["user1"],
            "user2": event["user2"],
        }))

        if not self.game_state:
            self.game_state = game_states[event["match_name"]]
            self.match_name = event["match_name"]
        if not self.game_state.is_active:
            self.game_state.is_active = True
            asyncio.create_task(self.game_loop())

    async def disconnect(self, close_code):
        print("in disconnect", self.player)
        if self.match_name:
            print("in ---------------------", self.match_name)
            if self.match_name in game_states:
                if not game_states[self.match_name].is_active:
                    del game_states[self.match_name]
                    return
                game_states[self.match_name].is_active = False
                del game_states[self.match_name]
            print("remove", self.channel_name, "from", self.match_name)
            await self.channel_layer.group_discard(self.match_name, self.channel_name)
            # print (
            #     f"Player {self.player['username']} disconnected. Match: {self.match_name}"
            #     f"Connected users: {connected_users}"
            #     f"Connected users set: {game_states}"
            # )
            await self.channel_layer.group_send(
                self.match_name,
                {
                    "type": "player_disconnected",
                    "message": "Player disconnected",
                }
            )
        for user in list(connected_users):
            if user['id'] == self.player['id']:
                connected_users.remove(user)
                break
            

    async def game_over(self, event):
        await self.send(text_data=json.dumps({
            "type": "game_over",
            "message": event["message"],
            "winner": event["winner"],
            "loser": event["loser"],
            "user1": event["final_score"]["player1"],
            "user2": event["final_score"]["player2"],
        }))

    async def player_disconnected(self, event):
        print("inside player_disconnected")
        await self.send(text_data=json.dumps({
            "type": "player_disconnected",
            "message": event["message"],
        }))

    async def game_loop(self):
        await asyncio.sleep(4)
        while self.game_state and self.game_state.is_active:
            self.game_state.update_ball()
            game_state = self.game_state.get_game_state()
            
            await self.channel_layer.group_send(
                self.match_name,
                {
                    "type": "send_game_state",
                    "message": game_state,
                }
            )
            await asyncio.sleep(1 / 60)

    async def send_game_state(self, event):
        message = event["message"]
        try:
            await self.send(text_data=json.dumps({
                "type": "game_state_update",
                "message": message,
            }))
        except Exception as e:
            print(f"Failed to send message: {e}")
    async def receive(self, text_data):
        if not self.game_state:
            return
            
        data = json.loads(text_data)
        if data["type"] == "key_press":
            key = data["key"].lower()

            if self.player["numberPlayer"] == "1":
                if key == "w":
                   self.move_paddle("pleft", "up")
                elif key == "s":
                   self.move_paddle("pleft", "down")
            else:
                if key == "arrowup":
                   self.move_paddle("pright", "up")
                elif key == "arrowdown":
                   self.move_paddle("pright", "down")

            await self.channel_layer.group_send(
                self.match_name,
                {
                    "type": "send_game_state",
                    "message": self.game_state.get_game_state(),
                }
            )

    def move_paddle(self, paddle, direction):
        if paddle == "pleft":
            if direction == "up":
                self.game_state.pleft["y"] -= self.game_state.pleft["speed"]
                if self.game_state.pleft["y"] < 0:
                    self.game_state.pleft["y"] = 0
            elif direction == "down":
                self.game_state.pleft["y"] += self.game_state.pleft["speed"]
                if self.game_state.pleft["y"] + self.game_state.pleft["height"] > self.game_state.canvas_height:
                    self.game_state.pleft["y"] = self.game_state.canvas_height - self.game_state.pleft["height"]

        elif paddle == "pright":
            if direction == "up":
                self.game_state.pright["y"] -= self.game_state.pright["speed"]
                if self.game_state.pright["y"] < 0:
                    self.game_state.pright["y"] = 0
            elif direction == "down":
                self.game_state.pright["y"] += self.game_state.pright["speed"]
                if self.game_state.pright["y"] + self.game_state.pright["height"] > self.game_state.canvas_height:
                    self.game_state.pright["y"] = self.game_state.canvas_height - self.game_state.pright["height"]


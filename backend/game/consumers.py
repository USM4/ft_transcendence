import asyncio
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
user_channels = {} # map of user to channel name
game_started = False  # Shared flag to prevent multiple game loops
player_paddles = {}  # Map of player to paddle
max_score = 2

class GameState:
    def __init__(self, consumer=None):
        self.consumer = consumer
    canvas_width = 1000
    canvas_height = 500

    ball = {
        "x": canvas_width / 2,
        "y": canvas_height / 2,
        "velocityX": 4,
        "velocityY": 4,
        "radius": 10,
        "color": "yellow",
    }

    pleft = {
        "id": 1,
        "x": 10,  # Left paddle
        "y": canvas_height / 2 - 50,
        "width": 10,
        "height": 100,
        "speed": 20,
        "score": 0,
        "color": "blue",
    }

    pright = {
        "id": 2,
        "x": canvas_width - 20,  # Right paddle
        "y": canvas_height / 2 - 50,
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
    def update_ball(self):
        # Update ball position
        print("------------- { update_ball  }-------------")
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

    async def increase_score(self, scoring_info):
        print("------------- { increase_score  }-------------")
        if not self.consumer:
            print("Error: No consumer available")
            return
        print("------------- { increase_score  }-------------")
        # Retrieve Client instances
        player1 = await database_sync_to_async(Client.objects.get)(id=self.pleft["id"])
        player2 = await database_sync_to_async(Client.objects.get)(id=self.pright["id"])

        # Send scoring update to all players
        print ("-------------player1.username-----------" ,player1.username)
        print ("-------------player2.username-----------" ,player2.username)
        await self.consumer.channel_layer.group_send(
            "game_room",
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

        if self.pleft["score"] == max_score:
            winner = player1
            game_started = False
        elif self.pright["score"] == max_score:
            winner = player2
            game_started = False
        else:
            return

        # Create and save the game
        await database_sync_to_async(Game.objects.create)(
            player1_id=player1,
            player2_id=player2,
            winner=winner,
            score_player1=self.pleft["score"],
            score_player2=self.pright["score"]
        )

        await self.consumer.channel_layer.group_send(
            "game_room",
            {
                "type": "game_over",
                "message": f"Game Over! {winner.username} wins!",
                "winner": winner.username,
                "final_score": {
                    "player1": self.pleft["score"],
                    "player2": self.pright["score"]
                }
            }
        )
    

class GameConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.game_state = GameState(consumer=self)
    async def connect(self):
        global game_started
        self.player = {
            "username": self.scope.get('user').username,
            "avatar": self.scope.get('user').avatar,
            "numberPlayer": "",
            "id": self.scope.get('user').id,
            "match_name": "",
            "channel_name": self.channel_name,
        }
        print(self.channel_name)
        await self.accept()
        print(self.channel_name)
        await self.channel_layer.group_add("game_room", self.channel_name)
    
    # Check if user is already in connected_users based on ID
        user_exists = any(user['id'] == self.player['id'] for user in connected_users)
    
        if not user_exists:
            # Determine player number
            self.player["numberPlayer"] = "1" if len(connected_users) % 2 == 0 else "2"
            connected_users.append(self.player)

            # Notify the frontend
            await self.send(json.dumps({"type": "connected", "data": self.player}))

            if len(connected_users) >= 2:
                try:
                    print(f"=========== connected_users ===========",  connected_users)
                    user1 = connected_users.popleft()
                    print(f"=========== user1 ===========",  user1)
                    user2 = connected_users.popleft()
                    print(f"=========== user2 ===========",  user2)
                    # Make sure we're not matching a player with themselves
                    if user1['id'] == user2['id']:
                        print("Make sure we're not matching a player with themselves")
                        # Put the first user back and wait for a different opponent
                        connected_users.appendleft(user1)
                        await self.send(json.dumps({
                            "type": "waiting_for_players",
                            "message": "Waiting for another player.",
                        }))
                        return

                    match_name = f"{user1['username']}_vs_{user2['username']}"
                    user1["match_name"] = match_name
                    user2["match_name"] = match_name

                    await self.channel_layer.group_add(match_name, user1["channel_name"])
                    await self.channel_layer.group_add(match_name, user2["channel_name"])
                    await self.channel_layer.group_send(match_name, {
                        "type": "match_ready",
                        "user1": user1,
                        "user2": user2,
                    })
                except Exception as e:
                    print(f"Error during matchmaking: {e}")
            else:
                await self.send(json.dumps({
                    "type": "waiting_for_players",
                    "message": "Waiting for another player.",
                }))
        else:
            # If user is already connected, send an error message
            await self.send(json.dumps({
                "type": "error",
                "message": "You are already connected in another window."
            }))
            # Close this connection
            await self.close()
    
    async def match_ready(self, event):
        global game_started
        await self.send(text_data=json.dumps({
            "type": "match_ready",
            "user1": event["user1"],
            "user2": event["user2"],
        }))
        if not game_started:
            game_started = True
            # print("game_started -------------", game_started)
            asyncio.create_task(self.game_loop())

    async def disconnect(self, close_code):
        global game_started
        await self.channel_layer.group_discard("game_room", self.channel_name)

        # Remove player from connected_users based on ID
        for user in list(connected_users):  # Create a copy of the list to modify it
            if user['id'] == self.player['id']:
                connected_users.remove(user)
                break

        if game_started:
            game_started = False
            # Notify other players about disconnection
            if user_channels:
                try:
                    first_user, first_channel = next(iter(user_channels.items()))
                    await self.channel_layer.send(user_channels[first_user], {
                        "type": "game_over",
                        "message": "The other player has disconnected. Game over.",
                    })
                except Exception as e:
                    print(f"Error notifying other players: {e}")

        # Clean up other collections
        if self.player['id'] in user_channels:
            del user_channels[self.player['id']]
        if self.player['id'] in player_paddles:
            del player_paddles[self.player['id']]

    async def game_over(self, event):

        await self.send(text_data=json.dumps({
            "type": "game_over",
            "message": event["message", "winner": event["winner"], "final_score": event["final_score"]]
        }))


    async def score_update(self, event):
        await self.send(text_data=json.dumps({
            "type": "score_update",
            "message": event["message"]
        }))


    async def game_loop(self):
        await asyncio.sleep(4)
        # print("Game loop started")
        while True:
            if not game_started:
                print("Game loop ending - game not started")
                break

            self.game_state.update_ball()
            game_state = self.game_state.get_game_state()
            # print("Sending game state update")
            await self.channel_layer.group_send(
                "game_room",
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
        data = json.loads(text_data)
        if data["type"] == "key_press":
            key = data["key"].lower()

            # Determine which player this is
            if self.player["numberPlayer"] == "1":
                # Player 1 controls (W/S)
                if key == "w":
                    self.move_paddle("pleft", "up")
                elif key == "s":
                    self.move_paddle("pleft", "down")
            else:
                # Player 2 controls (Arrow keys)
                if key == "arrowup":
                    self.move_paddle("pright", "up")
                elif key == "arrowdown":
                    self.move_paddle("pright", "down")

            # Send updated game state
            await self.channel_layer.group_send(
                "game_room",
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


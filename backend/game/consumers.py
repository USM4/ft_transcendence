import asyncio
import json
from authentification.models import Client
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User
from django.db import models
from django.db.models import Q 
from collections import deque

connected_users = deque()  # list of connected clients
connected_users_set = set()  # set of connected clients
user_channels = {} # map of user to channel name

class GameState:
    canvas_width = 1000
    canvas_height = 500

    ball = {
        "x": canvas_width / 2,
        "y": canvas_height / 2,
        "velocityX": 2,
        "velocityY": 2,
        "radius": 10,
        "color": "yellow",
    }

    pleft = {
        "x": 10,  # Left paddle
        "y": canvas_height / 2 - 50,
        "width": 10,
        "height": 100,
        "speed": 20,
        "score": 0,
        "color": "blue",
    }

    pright = {
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

        # Right paddle collision
        elif (
            self.ball["x"] + self.ball["radius"] >= self.pright["x"] and
            self.pright["y"] <= self.ball["y"] <= self.pright["y"] + self.pright["height"]
        ):
            self.ball["velocityX"] *= -1  # Reverse horizontal velocity

        # Check for scoring
        if self.ball["x"] - self.ball["radius"] <= 0:
            self.pright["score"] += 1  # Right paddle scores
            self.reset_ball()
            self.reset_paddles()
        elif self.ball["x"] + self.ball["radius"] >= self.canvas_width:
            self.pleft["score"] += 1  # Left paddle scores
            self.reset_ball()
            self.reset_paddles()
    
    def reset_paddles(self):
        # Reset paddles to the center
        self.pleft["y"] = self.canvas_height / 2 - self.pleft["height"] / 2
        self.pright["y"] = self.canvas_height / 2 - self.pright["height"] / 2

    def reset_ball(self):
        # Reset ball to the center
        self.ball["x"] = self.canvas_width / 2
        self.ball["y"] = self.canvas_height / 2
        self.ball["velocityX"] *= -1  # Reverse horizontal direction
        self.ball["velocityY"] = 2  # Reset vertical velocity


class GameConsumer(AsyncWebsocketConsumer):
    game_state = GameState()
    game_started = False  # Shared flag to prevent multiple game loops

    async def connect(self):
        self.sender = self.scope.get('user')
        await self.accept()
        await self.channel_layer.group_add("game_room", self.channel_name)
        print(f"{self.sender} connected. Channel name: {self.channel_name}")
        user_channels[self.sender] = self.channel_name
        print("user_channels", user_channels)

        if self.sender not in connected_users_set:
            connected_users.append(self.sender)
            connected_users_set.add(self.sender)
            print(f"{self.sender} added. Connected users: {list(connected_users)}")

        if len(connected_users) >= 2:
            user1 = connected_users.popleft()
            user2 = connected_users.popleft()
            connected_users_set.remove(user1)
            connected_users_set.remove(user2)
            await self.notify_users(user1, user2)
        else:
            await self.send(text_data=json.dumps({
                "type": "waiting_for_players",
                "message": "Waiting for another player to join.",
            }))

    async def notify_users(self, user1, user2):
        print("**************USERRR 1  , 2 ***********", user1, user2)
        if user1 in user_channels:
            print("sending message to user_channels[user1]", user_channels[user1])
            await self.channel_layer.send(user_channels[user1], {
                "type": "game_start",
                "message": "The game is starting!",
                "player": "1"
            })
        
        if user2 in user_channels:
            print("sending message to user_channels[user2]", user_channels[user2])
            await self.channel_layer.send(user_channels[user2], {
                "type": "game_start",
                "message": "The game is starting!",
                "player": "2"
            })

        # Start the game loop only once for the primary player
        if not self.game_started:
            self.game_started = True
            asyncio.create_task(self.game_loop())

    async def game_start(self, event):
        print(event["message"], event["player"])
        await self.send(text_data=json.dumps({
            "type": "game_start",
            "message": event["message"],
            "player": event["player"]
        }))

    async def game_loop(self):
        await asyncio.sleep(4)
        print("*************************Game loop started***************************")
        while True:
            self.game_state.update_ball()

            # Broadcast the updated game state
            await self.channel_layer.group_send(
                "game_room",
                {
                    "type": "send_game_state",
                    "message": self.game_state.get_game_state(),
                }
            )
            await asyncio.sleep(1 / 60)

    async def send_game_state(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({
            "type": "game_state_update",
            "message": message,
        }))

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data["type"] == "key_press":
            key = data["key"].lower()  # Convert to lowercase for consistency
            if key == "w":
                self.move_paddle("pleft", "up")
            elif key == "s":
                self.move_paddle("pleft", "down")
            elif key == "arrowup":
                self.move_paddle("pright", "up")
            elif key == "arrowdown":
                self.move_paddle("pright", "down")

        await self.channel_layer.group_send(
            "game_room",
            {
                "type": "send_game_state",
                "message": self.game_state.get_game_state(),
            }
        )
    
    async def send_game_state(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({
            "type": "game_state_update",
            "message": message,
        }))
    
# **********************************************GAME LOOOOOOOP****************************************************
    async def game_loop(self):
        await asyncio.sleep(4)
        print("*************************Game loop started***************************")
        while True:
            self.game_state.update_ball()
            print("Game loop running")
            await self.channel_layer.group_send(
                "game_room",
                {
                    "type": "send_game_state",
                    "message": self.game_state.get_game_state(),
                }
            )
            await asyncio.sleep(1 / 60)
        print("*************************Game loop ended***************************")
# **************************************************************************************************

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

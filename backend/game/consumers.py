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

    paddle1 = {
        "x": 10,  # Left paddle
        "y": canvas_height / 2 - 50,
        "width": 10,
        "height": 100,
        "speed": 20,
        "score": 0,
        "color": "blue",
    }

    paddle2 = {
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
            "paddle1": {
                "x": self.paddle1["x"],
                "y": self.paddle1["y"],
                "width": self.paddle1["width"],
                "height": self.paddle1["height"],
                "speed": self.paddle1["speed"],
                "score": self.paddle1["score"],
                "color": self.paddle1["color"],
            },
            "paddle2": {
                "x": self.paddle2["x"],
                "y": self.paddle2["y"],
                "width": self.paddle2["width"],
                "height": self.paddle2["height"],
                "speed": self.paddle2["speed"],
                "score": self.paddle2["score"],
                "color": self.paddle2["color"],
            },
        }




class GameConsumer(AsyncWebsocketConsumer):
    game_state = GameState()  # Create a global game state instance

    async def connect(self):
        self.sender = self.scope.get('user')

        connected_users.append(self.sender)
        await self.channel_layer.group_add("game_room", self.channel_name)
        print(f"{self.sender} connected. Current users: {list(connected_users)}")
        await self.accept()

    async def disconnect(self, close_code):
        if self.sender in connected_users:
            connected_users.remove(self.sender)
            print(f"{self.sender} disconnected. Current users: {list(connected_users)}")
        await self.channel_layer.group_discard("game_room", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        print(f"Received data: {data}")

        # Handle key press events and update paddles
        if data["type"] == "key_press":
            key = data["key"]
            if key == "w":  # Paddle 1 up
                self.move_paddle("paddle1", "up")
            elif key == "s":  # Paddle 1 down
                self.move_paddle("paddle1", "down")
            elif key == "arrowup":  # Paddle 2 up
                self.move_paddle("paddle2", "up")
            elif key == "arrowdown":  # Paddle 2 down
                self.move_paddle("paddle2", "down")

        # Broadcast updated game state
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
    
    async def game_loop(self):
        while True:
            await self.channel_layer.group_send(
                "game_room",
                {
                    "type": "send_game_state",
                    "message": self.game_state.get_game_state(),
                }
            )
            await asyncio.sleep(1 / 60)

    def move_paddle(self, paddle, direction):
        if paddle == "paddle1":
            if direction == "up":
                self.game_state.paddle1["y"] -= self.game_state.paddle1["speed"]
                if self.game_state.paddle1["y"] < 0:
                    self.game_state.paddle1["y"] = 0
            elif direction == "down":
                self.game_state.paddle1["y"] += self.game_state.paddle1["speed"]
                if self.game_state.paddle1["y"] + self.game_state.paddle1["height"] > self.game_state.canvas_height:
                    self.game_state.paddle1["y"] = self.game_state.canvas_height - self.game_state.paddle1["height"]

        elif paddle == "paddle2":
            if direction == "up":
                self.game_state.paddle2["y"] -= self.game_state.paddle2["speed"]
                if self.game_state.paddle2["y"] < 0:
                    self.game_state.paddle2["y"] = 0
            elif direction == "down":
                self.game_state.paddle2["y"] += self.game_state.paddle2["speed"]
                if self.game_state.paddle2["y"] + self.game_state.paddle2["height"] > self.game_state.canvas_height:
                    self.game_state.paddle2["y"] = self.game_state.canvas_height - self.game_state.paddle2["height"]

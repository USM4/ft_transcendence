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
        elif self.ball["x"] + self.ball["radius"] >= self.canvas_width:
            self.pleft["score"] += 1  # Left paddle scores
            self.reset_ball()

    def reset_ball(self):
        # Reset ball to the center
        self.ball["x"] = self.canvas_width / 2
        self.ball["y"] = self.canvas_height / 2
        self.ball["velocityX"] *= -1  # Reverse horizontal direction
        self.ball["velocityY"] = 2  # Reset vertical velocity





class GameConsumer(AsyncWebsocketConsumer):
    game_state = GameState()  # Create a global game state instance

    async def connect(self):
        self.sender = self.scope.get('user')
        # Add the user to the group
        await self.channel_layer.group_add("game_room", self.channel_name)
        connected_users.append(self.sender)
        print(f"{self.sender} ======================== Current users ============> {list(connected_users)}")

        # Check if there are enough players to start the game
        # if len(connected_users) % 2 == 0 and len(connected_users) > 0:
        #     await self.start_game()
        # else:
        #     await self.send(text_data=json.dumps({
        #         "type": "waiting_for_players",
        #         "message": "Waiting for second player..."
        #     }))

        # Accept the connection after handling the logic
        await self.accept()
        
        game_loop_task = asyncio.create_task(self.game_loop())


    async def disconnect(self, close_code):
        if self.sender in connected_users:
            connected_users.remove(self.sender)
        print(f"{self.sender} disconnected. Current users: {list(connected_users)}")
        await self.channel_layer.group_discard("game_room", self.channel_name)

    # async def start_game(self):
    #     await self.channel_layer.group_send(
    #         "game_room",
    #         {
    #             "type": "start_game",
    #             "message": "The game has started!",
    #         }
    #     )

    #     await self.game_loop()

    async def receive(self, text_data):
        data = json.loads(text_data)
        # Handle key press events and update paddles
        if data["type"] == "key_press":
            key = data["key"]
            if key == "w":  # Paddle 1 up
                self.move_paddle("pleft", "up")
            elif key == "s":  # Paddle 1 down
                self.move_paddle("pleft", "down")
            elif key == "arrowup":  # Paddle 2 up
                self.move_paddle("pright", "up")
            elif key == "arrowdown":  # Paddle 2 down
                self.move_paddle("pright", "down")

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
            # Update ball position
            self.game_state.update_ball()
            print('ana f loooop')
            # Broadcast the updated game state
            await self.channel_layer.group_send(
                "game_room",
                {
                    "type": "send_game_state",
                    "message": self.game_state.get_game_state(),
                }
            )
            await asyncio.sleep(1 / 60)
        print("*************************Game loop ended***************************")

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

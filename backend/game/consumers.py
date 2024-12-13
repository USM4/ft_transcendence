import asyncio
import json
from authentification.models import Client
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

class gameState():
    canvas_width = 1000
    canvas_height = 500

    isGameOVer = False
    ball = {
        "x" : canvas_width / 2,
        "y" : canvas_height / 2,
        "vx" : 5,
        "vy" : 5,
        "speed" : 5,
        "radius" : 10,
        "color" : "white",
    }

    paddle1 = {
        "x" : 10,
        "y" : 0,
        "speed" : 5,
        "width" : 10,
        "height" : 100,
        "score" : 0,
        "color" : "blue",
    }

    paddle2 = {
        "x" : canvas_width - 20,
        "y" : 0,
        "speed" : 5,
        "width" : 10,
        "height" : 100,
        "score" : 0,
        "color" : "blue",
    }

    paddle1_number = None
    paddle2_number = None

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender = self.scope.get('user')

        #assign the player number
        if gameState.paddle1_number == None:
            gameState.paddle1_number = self.sender.id
        
        else:
            gameState.paddle2_number = self.sender.id

        await self.channel_layer.group_add("game_room", self.channel_name)
        await self.accept()


    async def disconnect(self, close_code):
        if gameState.paddle1_number == 1:
            gameState.paddle1_number = None

        else:
            gameState.paddle2_number = None
        await self.channel_layer.group_discard("game_room", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data['message_type'] == "start":
            self.game_loop()
        elif data['message_type'] == "movepaddle":
            self.handle_paddle_movement(data['message_type'])

        await self.channel_layer.group_send(
            "game_room",
            {
                "type": "game_message",
                "message": data['message']
            }
        )

    async def game_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))

    async def handle_paddle_movement(self, message_type):
        if message_type == "movepaddle1_up":
            gameState.paddle1["y"] -= gameState.paddle1["speed"]
        elif message_type == "movepaddle1_down":
            gameState.paddle1["y"] += gameState.paddle1["speed"]
        elif message_type == "movepaddle2_up":
            gameState.paddle2["y"] -= gameState.paddle2["speed"]
        elif message_type == "movepaddle2_down":
            gameState.paddle2["y"] += gameState.paddle2["speed"]

    async def game_loop(self):
        while True:
            gameState.ball["x"] += gameState.ball["vx"]
            gameState.ball["y"] += gameState.ball["vy"]

            if gameState.ball["y"] <= 0 or gameState.ball["y"] >= gameState.canvas_height:
                gameState.ball["vy"] *= -1

            if gameState.ball["x"] <= 0 or gameState.ball["x"] >= gameState.canvas_width:
                gameState.ball["vx"] *= -1
            
            if gameState.ball["x"] <= 0:
                gameState.paddle1["score"] += 1
            elif gameState.ball["x"] >= gameState.canvas_width:
                gameState.paddle2["score"] += 1
            
            if gameState.ball["x"] <= gameState.paddle1["x"] and (gameState.ball["y"] >= gameState.paddle1["y"]) and gameState.ball["y"] <= gameState.paddle1["y"] + 100:
                gameState.ball["vx"] *= -1
            elif gameState.ball["x"] >= gameState.paddle2["x"] and gameState.ball["y"] >= gameState.paddle2["y"] and gameState.ball["y"] <= gameState.paddle2["y"] + 100:
                gameState.ball["vx"] *= -1


            await self.channel_layer.group_send(
                "game_room",
                {
                    "type": "state_update",
                    "message": gameState
                }
            )

            await asyncio.sleep(1/60)
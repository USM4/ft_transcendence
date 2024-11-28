import json
from channels.generic.websocket import AsyncWebsocketConsumer

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("game_room", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("game_room", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
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

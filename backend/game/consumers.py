import json
from channels.generic.websocket import AsyncWebsocketConsumer
from . logic import Game
from . task import gameUpdater

class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.game = Game()
        self.updater = GameUpdater(self.game)
        asyncio.create_task(self.updater.start())


# class GameConsumer(AsyncWebsocketConsumer):
#     game = Game()

#     async def connect(self):
#         await self.accept()

#     async def disconnect(self, close_code):
#         pass

#     async def receive(self, text_data):
#         data = json.loads(text_data)
#         player_action = data.get("action")

#         self.game.update()
#         game_state = self.game.get_state()
#         await self.send(text_data=json.dumps(game_state))


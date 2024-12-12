from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
import asyncio

class GameUpdater:
    def __init__(self, game):
        self.game = game
        self.channel_layer = get_channel_layer()

    async def start(self):
        while True:
            self.game.update()
            game_state = self.game.get_state()

            # Broadcast the state to all connected clients
            await self.channel_layer.group_send(
                "game",
                {
                    "type": "game.update",
                    "message": game_state,
                }
            )

            await asyncio.sleep(0.016)  # ~60 FPS

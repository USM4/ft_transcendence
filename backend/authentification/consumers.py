import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

class NotificationsConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = 'notifications'
        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name,
        )
        await self.accept()
        # self.send(text_data=json.dumps({'message': 'Connected'}))
    
    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,   #leave the notifications group
            self.channel_name,
        )

    def receive(self, text_data):
        pass
    
    async def send_notification(self, event):
        notification_data = ["data"]
        message = text_data_json['message']
        self.send(text_data=json.dumps({'message': notification_data}))


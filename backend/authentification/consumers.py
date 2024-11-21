import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model


async def send_friend_request(self, data):
	to_user = data['to_user']
	from_user = data['from_user']
	group_name = 'notifications'
	await self.channel_layer.group_send(
		group_name,
		{
			'type': 'receive_notification',
			'message':{
				'from_user': from_user,
			}
		}
	)

user = get_user_model()
class NotificationsConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		if user is not None:
			await self.accept()
			self.group_name = 'notifications'
			await self.channel_layer.group_add(self.group_name, self.channel_name)
	
	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.group_name,
			self.channel_name,
		)

	async def receive(self, text_data):
		data = json.loads(text_data)
		if data['type'] == 'friend_request':
			await send_friend_request(self, data)
	



	async def send_notification(self, event):
		notification_data = event['message']
		await self.send(text_data=json.dumps({'message': notification_data}))


	
	async def receive_notification(self, event):
		await self.send(text_data=json.dumps({
			'type' : 'receive_notification',
			'message' : event['message']
		}))
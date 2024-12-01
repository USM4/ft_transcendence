import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model

class OnlineStatusConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.user = self.scope['user']
		self.room_group_name = f'online_status_{self.user.id}'
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)
		await self.accept()
		await self.update_user_status(self.user, True)

	async def disconnect(self, close_code):
		await self.update_user_status(self.user, False)
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)

	async def update_user_status(self, user, is_online):
		print("------------------->", user)
		print("------------------->", is_online)
		await database_sync_to_async(
			user.__class__.objects.filter(id=user.id).update
		)(is_online=is_online)

	async def user_status(self, event):
		user = event['user']
		status = event['status']

		await self.send(text_data=json.dumps({
			'user': user,
			'status': status
		}))
import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth import get_user_model
from asgiref.sync import sync_to_async
user_channel_name = {}

class OnlineStatusConsumer(AsyncWebsocketConsumer):
	async def connect(self):
		self.user = self.scope['user']
		self.room_group_name = f'online_status_{self.user.id}'
		if self.user.id in user_channel_name:
			user_channel_name[self.user.id].append(self.channel_name)
		else:
			user_channel_name[self.user.id] = [self.channel_name]
		print(f"++++++++++ {user_channel_name}")
		await self.channel_layer.group_add(
			self.room_group_name,
			self.channel_name
		)
		await self.accept()
		await self.update_user_status(self.user, True)

	async def disconnect(self, close_code):
		await self.channel_layer.group_discard(
			self.room_group_name,
			self.channel_name
		)
		if self.channel_name in user_channel_name[self.user.id]:
	   		user_channel_name[self.user.id].remove(self.channel_name)
		if not user_channel_name[self.user.id]:
			await self.update_user_status(self.user, False)
			del user_channel_name[self.user.id]

	async def update_user_status(self, user, is_online):
		user.is_online = is_online
		await sync_to_async(user.save)()
		# await database_sync_to_async(
		# 	user.__class__.objects.filter(id=user.id).update
		# )(is_online=is_online)

	async def user_status(self, event):
		user = event['user']
		status = event['status']

		await self.send(text_data=json.dumps({
			'user': user,
			'status': status
		}))
	async def friend_request_accepted(self, event):
		await self.send(text_data=json.dumps({
			'type': 'friend_request_accepted',
			'friend' : event['friend']
		}))

	async def friend_removed_you(self, event):
		await self.send(text_data=json.dumps({
			'type': 'friend_removed_you',
			'friend' : event['friend']
		}))
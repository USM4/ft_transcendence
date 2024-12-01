import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Messages,Room_Name
from channels.db import database_sync_to_async
from authentification.models import Client,Friend


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.sender = self.scope.get('user')
        self.room_name = f'room_{self.sender.id}'

        await self.channel_layer.group_add(self.room_name,self.channel_name)

        await self.accept()


        # Send chat history to the sender upon connection
        self.messages = []

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_name,self.channel_name)
        
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        rq_type = text_data_json["type"]
        flag = text_data_json["flag"]
        message = text_data_json["message"]
        receiver = text_data_json["receiver"]
        room_receive = f'room_{receiver}'

        if not receiver:
            return
        if rq_type == "message":
            try:
                chat_room = await self.get_or_create_room(self.sender.id, receiver)

                # Save the message to the database
                await self.save_message(message, chat_room, receiver)

                await self.channel_layer.group_send(
                    self.room_name, {
                        "type": "sendMessage",
                        "message": message,
                        "receiver": receiver,
                        "sender": self.sender.id,
                    })
                await self.channel_layer.group_send(
                    room_receive, {
                        "type": "sendMessage",
                        "message": message,
                        "receiver": receiver,
                        "sender": self.sender.id,
                    })
            except Exception as e:
                print("An error occurred: ", str(e))
        elif rq_type == "history":
            try:
                chat_room = await self.get_or_create_room(self.sender.id, receiver)

                if not self.messages or self.messages['group_id'] != chat_room.id:
                        if self.messages:
                            self.messages.clear()
                        self.messages = await self.get_messages(chat_room.id)
                        messages_data = await self.convert_messages_to_dict(self.messages["messages"])
                        for msg in self.messages["messages"]:
                            if not msg.message:
                                continue
                            await self.send(text_data=json.dumps({
                                'message': msg.message,
                                'receiver': msg.receiver,
                                "sender": self.sender.id,
                            }))
            except Exception as e:
                print("An error occurred: ", str(e))
        elif rq_type == "block":
            try:
                await self.block_friend(flag,receiver)
                print("Blocked")
                await self.send(text_data=json.dumps({
                    "message": None,
                    "receiver": receiver,
                    "sender": self.sender.id,
                }))
            except Exception as e:
                print("An error occurred: ", str(e))



    async def sendMessage(self, event):
        message = event["message"]
        receiver = event["receiver"]
        sender = event["sender"]
        if not message:
            return
        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "receiver": receiver,
                    "sender": sender,
                }
                )
            )

    @database_sync_to_async
    def block_friend(self, flag, receiver):
        friend = Friend.objects.get(user=self.sender,friend_id=receiver)
        friend.is_blocked = flag
        friend.save()
        return 

    @database_sync_to_async
    def get_or_create_room(self, sender_id, receiver_id):
        # Ensure a unique chat room exists between the sender and receiver
        ids = sorted([sender_id,receiver_id])
        sender = Client.objects.get(id=ids[0])
        receiver = Client.objects.get(id=ids[1])
        try:
            chat_room = Room_Name.objects.get(
                sender=sender,
                receiver=receiver,
            )
            return chat_room
        except:
            chat_room = Room_Name.objects.create(
                sender=sender,
                receiver=receiver,
            )
            return chat_room
            

    @database_sync_to_async
    def get_messages(self, chatroom_id):
        # Fetch all messages for the specified chat room
        messages = list(Messages.objects.filter(chat_group_id=chatroom_id).order_by('timestamp'))
        return {
            "messages": list(Messages.objects.filter(chat_group_id=chatroom_id).order_by('timestamp')),
            "group_id": chatroom_id
        }


    @database_sync_to_async
    def convert_messages_to_dict(self, messages):
        return [
            {
                'message': msg.message,
                'receiver': msg.receiver,
            }
            for msg in messages
        ]

    @database_sync_to_async
    def save_message(self, message, chat_room, receiver):
        # Save the message to the database
        if not message:
            return
        Messages.objects.create(
            chat_group=chat_room,
            receiver=receiver,
            message=message
        )
        
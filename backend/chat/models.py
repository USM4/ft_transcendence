from django.db import models
from authentification.models import Client

class Room_Name(models.Model):
    sender = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='receiver')
    last_msg = models.TextField()

    def __str__(self):
        return f"Room_Name {self.id}"

class Messages(models.Model):
    chat_group =  models.ForeignKey(Room_Name, on_delete=models.CASCADE, related_name='chat_group')
    receiver = models.CharField(max_length=255)
    message = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Id: {self.id}: From {self.receiver}: {self.message[:50]}"
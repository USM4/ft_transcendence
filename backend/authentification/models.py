from django.db import models
from django.contrib.auth.models import AbstractUser

class Client(AbstractUser):
    avatar = models.URLField(max_length=500, blank=True, null=True)
    username = models.CharField(max_length=255, unique=True)
    bio = models.CharField(max_length=255, blank=True, null=True , default="I don't just play ping pong—I redefine it. Every serve, every smash, every point, I'm not just winning the game, I'm making history")
    phone = models.CharField(max_length=255, blank=True, null=True , default='No phone')
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)
    is_2fa_enabled = models.BooleanField(default=False)
    secret_key = models.CharField(max_length=32, blank=True, null=True)
    is_online = models.BooleanField(default=False )
    display_name = models.CharField(max_length=32, blank=True, null=True, default="player1")
    # def __str__(self):
    #     return self.username

class FriendShip(models.Model):
    from_user = models.ForeignKey(Client, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(Client, related_name='received_requests', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DENY = 'deny'
    STATUS_CHOICES = [
        (PENDING , 'Pending'),
        (ACCEPTED , 'Accepted'),
        (DENY , 'Deny'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)

class Friend(models.Model):
    user = models.ForeignKey(Client, related_name="friends" ,on_delete=models.CASCADE)
    friend = models.ForeignKey(Client,related_name="friends_with" ,on_delete=models.CASCADE)
    is_blocked = models.BooleanField(default=False)
    blocker = models.ForeignKey(Client, related_name='blocker', on_delete=models.CASCADE, blank=True, null=True)


class Notification(models.Model):
    sender = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='sender_notifications')
    receiver = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='receiver_notifications')
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    notification_type = models.CharField(max_length=255, null=True, blank=True, default='default')
    is_read = models.BooleanField(default=False)

class Search(models.Model):
    search = models.CharField(max_length=255)
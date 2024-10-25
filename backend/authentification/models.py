from django.db import models
from django.contrib.auth.models import AbstractUser

class Client(AbstractUser):
    avatar = models.URLField(max_length=500, blank=True, null=True)
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # def __str__(self):
    #     return self.username

class FriendShip(models.Model):
    from_user = models.ForeignKey(Client, related_name='friendships_initiated', on_delete=models.CASCADE)
    to_user = models.ForeignKey(Client, related_name='friendships_received', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)





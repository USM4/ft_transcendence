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
    from_user = models.ForeignKey(Client, related_name='sent_requests', on_delete=models.CASCADE)
    to_user = models.ForeignKey(Client, related_name='received_requests', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    PENDING = 'pending'
    ACCEPTED = 'accepted'
    DECLINED = 'declined'
    STATUS_CHOICES = [
        (PENDING , 'Pending'),
        (ACCEPTED , 'Accepted'),
        (DECLINED , 'Declined'),
    ]
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)

class Notification(models.Model):
    user = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='notifications')
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

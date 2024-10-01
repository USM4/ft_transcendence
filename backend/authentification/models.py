from django.db import models
from django.contrib.auth.models import AbstractUser

class Client(AbstractUser):
    username = models.CharField(max_length=255, unique=True, default='hhhh')
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # def __str__(self):
    #     return self.username

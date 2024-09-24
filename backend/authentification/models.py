from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Client(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    # def __str__(self):
    #     return self.username

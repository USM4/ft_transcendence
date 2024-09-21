from django.db import models
from django.contrib.auth.models import AbstractBaseUser

class Client(AbstractBaseUser):
    username = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    # def __str__(self): ps :to print the object client
    #     return self.username

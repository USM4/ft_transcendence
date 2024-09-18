from django.db import models

class Authentification(models.Model):
    username = models.CharField(max_length=250)
    password = models.CharField(max_length=9)
from django.db import models

# Create your models here.

class client(models.Model):
    name = models.CharField(max_length=200)
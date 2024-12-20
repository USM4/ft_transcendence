from django.db import models
from authentification.models import Client

class Game(models.Model):
    # Player fields
    player1_id = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='player1')
    player2_id = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='player2')
    winner = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='winner')
    
    # Score tracking
    score_player1 = models.IntegerField(default=0)
    score_player2 = models.IntegerField(default=0)
    xp_gained_player1 = models.IntegerField(default=0)
    xp_gained_player2 = models.IntegerField(default=0)
    
    # Time tracking
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.shortcuts import render

from django.http import JsonResponse

from django.http import HttpResponse


# def home(request):
#     return HttpResponse("Welcome to the Game!")


# def home(request):
#     return HttpResponse("Welcome to the Game!")

# def game_state(request):
#     # Votre logique pour obtenir l'état du jeu
#     state = {"score": 0, "players": []}
#     return JsonResponse(state)

# from django.views.generic import TemplateView

# class HomeView(TemplateView):
#     template_name = '../../frontend/src/App.jsx'


# def game_move(request):
    
#     return JsonResponse({'status': 'success', 'message': 'Move received'})



# @api_view(['GET'])
# def get_game_state(request):
#     game_state = {
#         "player1": "Player1_Name",
#         "player2": "Player2_Name",
#         "score": [3, 5]
#     }
#     return Response(game_state)


# def home(request):
#     return HttpResponse("Bienvenue sur la page d'accueil de votre jeu !")


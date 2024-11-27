from django.shortcuts import render
from .models import Room_Name
from rest_framework.views import APIView


class ChatView(APIView):
    def get(self, request):
        rooms = Room_Name.objects.get.all()
        serializer = RoomNameSerializer(rooms, many=True)
        return Response(serializer.data)
    
    
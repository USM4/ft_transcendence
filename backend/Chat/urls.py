from chat.views import ChatView
from django.urls import path, include

urlpatterns = [
    path("/chat", ChatView.as_view(), name='chat'),
    
]
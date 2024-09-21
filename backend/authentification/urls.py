from django.contrib import admin
from django.urls import path
from authentification.views import SignUpView

urlpatterns = [
    path("signup/",SignUpView.as_view(), name='signUp'),
]

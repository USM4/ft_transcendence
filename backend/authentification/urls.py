from django.contrib import admin
from django.urls import path
from authentification.views import SignUpView
from authentification.views import SignInView

urlpatterns = [
    path("signin/",SignInView.as_view(), name='signIn'),
    path("signup/",SignUpView.as_view(), name='signUp'),
]

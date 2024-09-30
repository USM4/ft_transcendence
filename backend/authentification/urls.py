from django.contrib import admin
from django.urls import path, include
from authentification.views import SignUpView
from authentification.views import SignInView
from authentification.views import SomeView

urlpatterns = [
    path("signin/",SignInView.as_view(), name='signIn'),
    path("signup/",SignUpView.as_view(), name='signUp'),
    path("some_view/",SomeView.as_view(), name='some_view'),   
]

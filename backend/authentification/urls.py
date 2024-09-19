from django.contrib import admin
from django.urls import path
from authentification.views import simple_view

urlpatterns = [
    path("simple_view", simple_view, name="simple_view"),
]

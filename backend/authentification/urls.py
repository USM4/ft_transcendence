from django.contrib import admin
from django.urls import path, include
from authentification.views import SignUpView
from authentification.views import SignInView
from authentification.views import ExtractCodeFromIntraUrl
from authentification.views import VerifyTokenView
from authentification.views import LogoutView
from authentification.views import ProfileView

urlpatterns = [
    path("signin/",SignInView.as_view(), name='signIn'),
    path("signup/",SignUpView.as_view(), name='signUp'),
    path('42school/login/callback/', ExtractCodeFromIntraUrl.as_view(), name='intra_callback'),
    path("verify_token/", VerifyTokenView.as_view(), name='verify_token'),
    path("logout/", LogoutView.as_view(), name='logout'),
    path("profile/", ProfileView.as_view(), name='profile'),
]

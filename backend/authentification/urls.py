from django.contrib import admin
from django.urls import path, include
from authentification.views import SignUpView
from authentification.views import SignInView
from authentification.views import ExtractCodeFromIntraUrl
from authentification.views import VerifyTokenView
from authentification.views import LogoutView
from authentification.views import DashboardView
from authentification.views import SendFriendRequest
from authentification.views import NotificationList
from authentification.views import AcceptFriendRequest

urlpatterns = [
    path("signin/",SignInView.as_view(), name='signIn'),
    path("signup/",SignUpView.as_view(), name='signUp'),
    path('42school/login/callback/', ExtractCodeFromIntraUrl.as_view(), name='intra_callback'),
    path("verify_token/", VerifyTokenView.as_view(), name='verify_token'),
    path("logout/", LogoutView.as_view(), name='logout'),
    path("dashboard/", DashboardView.as_view(), name='dashboard'),
    path("send_friend_request/", SendFriendRequest.as_view(), name='send_friend_request'),
    path("notifications/", NotificationList.as_view(), name='notifications'),
    path("accept_friend_request/", AcceptFriendRequest.as_view(), name='accept_friend_request'),
]
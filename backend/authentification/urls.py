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
from authentification.views import FriendsList
from authentification.views import Activate2FA
# from authentification.views import Search
from authentification.views import Profile
from authentification.views import QrCode
from authentification.views import CheckOtp
# from authentification.views import checkForDesabling
from django.conf.urls.static import static
from django.conf import settings

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
    path("friends/", FriendsList.as_view(), name='friends'),
    path("profile/<str:username>/", Profile.as_view(), name='profile'),
    path("2fa/", QrCode.as_view(), name='2fa'),
    path("activate2fa/", Activate2FA.as_view(), name='activate2fa'),
    path("check_otp/", CheckOtp.as_view(), name='check_otp/'),
    # path("check_for_desabling/", checkForDesabling.as_view(), name='check_for_desabling/'),
]
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate , logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Client
from .models import FriendShip
from .models import Notification
from .models import Friend
from .serializers import ClientSignUpSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
import requests
import os
from dotenv import load_dotenv
from django.shortcuts import redirect

class SignUpView(APIView):
    def post(self, request):
        serializer = ClientSignUpSerializer(data=request.data)
        username = request.data.get('username', '')
        email = request.data.get('email', '')
        password = request.data.get('password', '')
        newpassword = request.data.get('newpassword', '')
        if password != newpassword:
            return Response({"error": "Passwords do not match "}, status=status.HTTP_400_BAD_REQUEST)
        if not username:
            return Response({"error": "Invalid username format "}, status=status.HTTP_400_BAD_REQUEST)
        if '@' not in email or '.' not in email.split('@')[-1]:
            return Response({"error": "Invalid email format "}, status=status.HTTP_400_BAD_REQUEST)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "User created successfully "}, status=status.HTTP_201_CREATED)
        return Response({"error": "User Already signed up"}, status=status.HTTP_400_BAD_REQUEST)


class SignInView(APIView):
    def post(self, request):
        parse_login = request.data.get('login')
        password = request.data.get('password')
        print(f"\nparse login : {parse_login}\n")
        print(f"\npassword : {password}\n")
        if '@' in parse_login and '.' in parse_login:
            try:
                client = Client.objects.get(email=parse_login)
                username = client.username
            except Client.DoesNotExist:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            username = parse_login
        client = authenticate(username=username, password=password)
        if client :
            refresh = RefreshToken.for_user(client)
            access = str(refresh.access_token)
            response = Response({"success":"Logged in successfully !"}, status=status.HTTP_200_OK)
            response.set_cookie(
                'client',
                access,
                httponly=True,
                samesite='None',
                secure=True,
            )
            return response
        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

class ExtractCodeFromIntraUrl(APIView):
    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return Response({'error':  "Faced a code problem in the url"}, status=400)
        # daba nprepariw request l intra bach exchangiw l code b access token
        token_url = 'https://api.intra.42.fr/oauth/token'
        load_dotenv()
        CLIENT_ID = os.getenv('CLIENT_ID', 'default-client-id')
        SECRET_ID = os.getenv('SECRET_ID')
        print("SECRET ID :", SECRET_ID)
        client_id = CLIENT_ID
        client_secret = SECRET_ID
        redirect_uri = 'http://localhost:8000/accounts/42school/login/callback/'
        # json li aytseft f request
        json_data = {
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri
        }

        headers = {'Content-Type': 'application/json'}
        # nsefto request l intra w n extractiw l user info b dak l access token li ayjina
        response = requests.post(token_url,json=json_data, headers=headers)
        if response.status_code != 200:
            return Response({'error':  "exchanging token problem with intra"}, status=400)
        data = response.json()
        access_token = data.get('access_token')
        # nakhod l user info bl  access token li jebt mn 3end intra
        user_url_intra = 'https://api.intra.42.fr/v2/me'
        user_info_response = requests.get(user_url_intra, headers={
            'Authorization': f'Bearer {access_token}'
        })
        user_data = user_info_response.json()

        user_email = user_data.get('email')
        user = Client.objects.filter(email=user_email).first()
        username = user_data.get('login')
        #ila makanch had l user ghaycreeyih bl infos d inta
        avatar = user_data.get('image', {}).get('versions', {}).get('large')
        if user is None:
            user = Client(email=user_email, username=username, avatar=avatar)
            user.save()
        #ila kan bnefs l infos ghay redirectih nichan l dashboard
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        response = redirect('http://localhost:5173/dashboard')
        response.set_cookie(
            'client',
            access,
            httponly=True,
            samesite='None',
            secure=True,
        )
        return response

class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        # print("User:", request.user)
        if request.user.is_authenticated:
            return Response({'authenticated': True}, status=200)
        return Response({'error': 'Unauthorized'}, status=401)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        response = Response({'Logged out successfull': True}, status=200)
        response.delete_cookie('client')
        return response

class DashboardView(APIView):
    def get(self, request):
        user  = request.user
        if user is None:
            return Response({'error': 'Unauthorized'}, status=401)
        return Response({
            'id': user.id,
            'email': user.email,
            'username': user.username,
            'avatar': user.avatar if user.avatar else '/player1.jpeg',
        })

class SendFriendRequest(APIView):
    def post(self, request):
        from_user = request.user
        # print("data", request.data)
        to_user = request.data.get('to_user')
        # print('to_id_user', to_user)
        if not to_user:
            return Response({'error': 'Recipient user ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            to_user = Client.objects.get(id=to_user)
        except Client.DoesNotExist:
            return Response({'error': 'Recipient user not found'}, status=status.HTTP_404_NOT_FOUND)

        if FriendShip.objects.filter(from_user=from_user, to_user=to_user).exists():
            return Response({'error': 'request already sent'}, status=400)

        # Create the friend request
        FriendShip.objects.create(from_user=from_user, to_user=to_user)
        # Check if a notification for this friend request already exists
        if not Notification.objects.filter(user=to_user, message=f"{from_user.username} sent you a friend request ").exists():
            Notification.objects.create(user=to_user, message=f"{from_user.username} sent you a friend request ")
        return Response({'success': 'friend request sent successfully'})

class NotificationList(APIView):
    def get(self, request):
        notifications = Notification.objects.filter(user=request.user, is_read=False)
        data = [{'id': n.id, 'message': n.message, 'created_at': n.created_at} for n in notifications]
        return Response(data)


class AcceptFriendRequest(APIView):
    def post(self, request):
        request_id = request.data.get('request_id')
        try:
            friend_request = FriendShip.objects.get(id=request_id, status='pending')
            friend_request.status = 'accepted'
            friend_request.save()
            sender = friend_request.to_user
            receiver = friend_request.from_user
            Friend.objects.create(user=sender, friend=receiver)
            Friend.objects.create(user=receiver, friend=sender)
            Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
            return Response({"message": "Friend request accepted "}, status=200)
        except FriendShip.DoesNotExist:
            return Response({"error": "Friend request not found "}, status=404)

class FriendsList(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        friends = Friend.objects.filter(user=user).select_related('friend')
        data = [
            {
                'id': friend.friend.id,
                'username': friend.friend.username,
                'avatar': friend.friend.avatar if friend.friend.avatar else '/player1.jpeg'
            }
            for friend in friends
        ]
        return Response({"data": data})
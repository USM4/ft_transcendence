from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate , login
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Client
from .serializers import ClientSignUpSerializer
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
        SECRET_ID = os.getenv('SECRET_ID', 'default-secret-id')
        client_id = CLIENT_ID
        client_secret = SECRET_ID
        redirect_uri = 'http://localhost:8000/accounts/42school/login/callback/'
        # json li aytseft f request
        # print("client_id:", client_id)
        # print("client_secret:", client_secret)
        json_data = {
            'grant_type': 'authorization_code',
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri
        }
        headers = {'Content-Type': 'application/json'}
        # nsefto request l intra w n extractiw l user info b dak l access token li ayjina
        # print("Request payload:", json_data)
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
        # print("##################################################")
        # print(user.username)
        # print("##################################################")
        username = user_data.get('login')
        #ila makanch had l user ghaycreeyih bl infos d inta
        if user is None:
            user = Client(email=user_email, username=username)
            user.save()
        #ila kan bnefs l infos ghay redirectih nichan l dashboard
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)
        response = redirect('http://localhost:5173/dashboard')
        response.set_cookie(
            'user',
            access,
            httponly=True,
            samesite='None',
            secure=True,
        )
        return  response
    
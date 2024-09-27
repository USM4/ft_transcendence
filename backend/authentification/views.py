from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from .models import Client
from .serializers import ClientSignUpSerializer

class SignUpView(APIView):
    def post(self, request):
        # print(request.data)
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
        if '@' in parse_login and '.' in parse_login:
            try:
                client = Client.objects.get(email=parse_login)
                username = client.username
            except Client.DoesNotExist:
                return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            username = parse_login
        client = authenticate(username=username, password=password)
        if client is not None:
            response = Response()
            refresh = RefreshToken.for_user(client)
            access = str(refresh.access_token)
            response.set_cookie('access', access,httponly=True, samesite=None, secure=True)
            response.data = {"valid" : "hmed"}
            return response
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

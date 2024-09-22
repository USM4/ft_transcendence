from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ClientSerializer

class SignUpView(APIView):
    def post(self, request):
        # print(request.data)
        serializer = ClientSerializer(data=request.data)
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
    
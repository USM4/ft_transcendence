from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ClientSerializer

class SignUpView(APIView):
    def post(self, request):
        # print(request.data)
        serializer = ClientSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": "User created successfully"}, status=status.HTTP_201_CREATED)
        # print('ssssssssssssssssssssssssssss')
        # print(serializer.data)
        return Response({"error": "User Already in dabatayz"}, status=status.HTTP_400_BAD_REQUEST)

class SignInView(APIView)
    
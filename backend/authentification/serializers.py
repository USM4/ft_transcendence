# serializers.py
from rest_framework import serializers
from .models import Client

class ClientSignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ['username', 'email' , 'password']

    def create(self, validated_data):
        client = Client(username=validated_data['username'], email=validated_data['email']) 
        client.set_password(validated_data['password'])
        client.save()
        return client
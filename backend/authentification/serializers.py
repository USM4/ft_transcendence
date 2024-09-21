# serializers.py
from rest_framework import serializers
from .models import Client

class ClientSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Client
        fields = ['username', 'password']

    def create(self, validated_data):
        client = Client(username=validated_data['username'])
        client.set_password(validated_data['password'])
        client.save()
        return client

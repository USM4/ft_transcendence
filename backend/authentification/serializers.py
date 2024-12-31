# serializers.py
from rest_framework import serializers
from .models import Client

class ClientSignUpSerializer(serializers.ModelSerializer):

    class Meta:
        model = Client
        fields = ['username', 'email' , 'password', 'avatar']
        extra_kwargs = {
            'password': {'write_only': True},
            'username': {'required': True,
                'min_length': 9,
                'max_length': 20,
            },
        }

    def create(self, validated_data):
        client = Client(username=validated_data['username'], email=validated_data['email'])
        client.set_password(validated_data['password'])
        avatar = validated_data.get('avatar', None)
        if avatar:
            client.avatar = avatar
        client.save()
        return client

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'username']
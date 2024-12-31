import os
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from dotenv import load_dotenv


class JWTAuthFromCookieMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('client')
        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'

class RefreshTokenMiddleware(MiddlewareMixin):
    def process_request(self, request):
        access_token = request.COOKIES.get('client')
        refresh_token = request.COOKIES.get('refresh')
        # If there's no access token, skip (could be an anonymous user)
        if not access_token or not refresh_token:
            return
      
        try:
            AccessToken(access_token)
        except TokenError:
            try:
                refresh = RefreshToken(refresh_token)
                new_access_token = str(refresh.access_token)
                request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'
                request.refresh_cookie_data = new_access_token
            except TokenError:
                request.clear_tokens = True


    def process_response(self, request, response):
        if hasattr(request, 'refresh_cookie_data'):
            response.set_cookie('client', request.refresh_cookie_data, 
                              httponly=True, samesite='None', secure=True)

        # Clear tokens if refresh failed
        if getattr(request, 'clear_tokens', False):
            response.delete_cookie('client')
            response.delete_cookie('refresh')

        return response
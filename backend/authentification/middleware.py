import os
from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken
from dotenv import load_dotenv
# middleware.py
from django.shortcuts import redirect
from django.urls import resolve
from functools import wraps



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

class TwoFactorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # Routes that don't require 2FA verification
        self.public_paths = [
            '/signup/',
            '/signin/',
            '/2fa/',
            '/auth/check_otp/'
        ]

    def __call__(self, request):
        # Skip middleware for public paths
        if any(request.path.startswith(path) for path in self.public_paths):
            return self.get_response(request)

        # Check if user needs 2FA verification
        needs_2fa = request.COOKIES.get('2fa_pending')
        if needs_2fa:
            current_url = resolve(request.path_info).url_name
            if current_url != '/2fa/':
                return redirect('/2fa/')

        return self.get_response(request)

# # views.py
# from django.shortcuts import redirect
# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt


# @csrf_exempt
# def verify_2fa(request):
#     if request.method == 'POST':
#         otp = request.POST.get('otp')
#         if verify_otp(request.user, otp):
#             response = JsonResponse({'message': 'Success'})
#             response.delete_cookie('2fa_pending')
#             # Set final authentication cookie/session
#             return response
#     return JsonResponse({'error': 'Invalid OTP'}, status=400)
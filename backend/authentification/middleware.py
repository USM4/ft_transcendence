from django.utils.deprecation import MiddlewareMixin
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
import requests
from django.conf import settings
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import AccessToken

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
        if not access_token:
            return
        try:
            # check if access token is valid
            AccessToken(access_token)
        except Exception:
            # Access token is expired or invalid ghanrefreshih
            if refresh_token:
                refresh_url = 'https://localhost:443/auth/refresh/'
                headers = {'Content-Type': 'application/json'}
                refresh_data = {'refresh': refresh_token}
                # get a new access token from the refresh token
                response = requests.post(refresh_url, json=refresh_data, headers=headers)
                if response.status_code == 200:
                    new_access_token = response.json().get('access')
                    # set the new access token in the cookies
                    request.META['HTTP_AUTHORIZATION'] = f'Bearer {new_access_token}'
                    # update the cookies
                    request.refresh_cookie_data = new_access_token
                else:
                    # Refresh token is invalid
                    request.clear_tokens = True

    def process_response(self, request, response):
        new_access_token = getattr(request, 'refresh_cookie_data', None)
        if new_access_token:
            response.set_cookie('client', new_access_token, httponly=True, samesite='None', secure=True)

        # Clear tokens if refresh failed
        if getattr(request, 'clear_tokens', False):
            response.delete_cookie('client')
            response.delete_cookie('refresh')

        return response

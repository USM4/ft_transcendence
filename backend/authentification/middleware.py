from django.utils.deprecation import MiddlewareMixin

class JWTAuthFromCookieMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('client')
        if token:
            # Set the Authorization header to mimic the Bearer token format
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
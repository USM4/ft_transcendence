from django.utils.deprecation import MiddlewareMixin

class JWTAuthFromCookieMiddleware(MiddlewareMixin):
    def process_request(self, request):
        token = request.COOKIES.get('client')
        if token:
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {token}'
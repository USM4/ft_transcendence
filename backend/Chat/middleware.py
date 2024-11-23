from channels.db import database_sync_to_async

@database_sync_to_async
def get_user(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

class QueryAuthMiddleware:
    """
    Custom middleware (insecure) that takes user IDs from the query string.
    """

    def __init__(self, app):
        # Store the ASGI application we were passed
        self.app = app

    async def __call__(self, scope, receive, send):
        # Look up user from query string (you should also do things like
        # checking if it is a valid user ID, or if scope["user"] is already
        # populated).
        scope['user'] = await get_user(int(scope["query_string"]))

        return await self.app(scope, receive, send)


from urllib.parse import parse_qs

from channels.db import database_sync_to_async
from channels.middleware import BaseMiddleware
from rest_framework.exceptions import ValidationError

from backend.utils import decode_token
from users.models import User


class WebSocketJWTAuthenticationMiddleware(BaseMiddleware):
    def __init__(self, inner):
        super().__init__(inner)

    async def __call__(self, scope, receive, send):
        try:
            access_token = self.get_access_token(scope['query_string'])
            user = await self.get_user(access_token)
            scope['user'] = user
        except Exception:
            await send({'type': 'websocket.close'})
            return
        return await super().__call__(scope, receive, send)

    @staticmethod
    def get_access_token(query_string):
        query_string = parse_qs(query_string.strip().decode())
        token = query_string.get('token')
        if token is None:
            raise ValidationError
        return token[0]

    @staticmethod
    @database_sync_to_async
    def get_user(access_token):
        user_id = decode_token(access_token)
        user = User.objects.get(id=user_id)
        return user
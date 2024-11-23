from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
import jwt
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


@database_sync_to_async
def get_user_from_token(user_id):
    try:
        return User.objects.get(id=user_id)
    except User.DoesNotExist:
        return AnonymousUser()

class QueryAuthMiddleware:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        cookies = scope.get('cookies', {})
        token = cookies.get('client')  # Assuming 'client' cookie contains the JWT

        if token:
            try:
                # Decode the JWT
                decoded_data = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_data.get("user_id")

                if user_id:
                    # Fetch the user from the database
                    scope['user'] = await get_user_from_token(user_id)
                else:
                    scope['user'] = AnonymousUser()
            except jwt.ExpiredSignatureError:
                print("Token has expired.")
                scope['user'] = AnonymousUser()
            except jwt.InvalidTokenError:
                print("Invalid token.")
                scope['user'] = AnonymousUser()
        else:
            scope['user'] = AnonymousUser()
        return await self.app(scope, receive, send)
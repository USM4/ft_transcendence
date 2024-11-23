"""
ASGI config for ft_transcendence project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ft_transcendence.settings')
django_asgi_app = get_asgi_application()

from channels.security.websocket import AllowedHostsOriginValidator
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import authentification.routing
import chat.routing
from chat.middleware import QueryAuthMiddleware

 
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            QueryAuthMiddleware(
                URLRouter(
                    authentification.routing.websocket_urlpatterns 
                    + chat.routing.websocket_urlpatterns
                )
            )
        )
    ), 
})

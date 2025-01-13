#!/bin/bash

mkdir -p /etc/nginx/ssl

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/nginx/ssl/nginx.key \
    -out /etc/nginx/ssl/nginx.crt \
    -subj "/CN=ft_transcendence.mrejla"

chmod 644 /etc/nginx/ssl/nginx.crt
chmod 600 /etc/nginx/ssl/nginx.key

nginx -g "daemon off;"
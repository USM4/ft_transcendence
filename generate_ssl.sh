#!/bin/bash

# Create SSL directory
mkdir -p nginx/ssl

# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout nginx/ssl/nginx.key \
    -out nginx/ssl/nginx.crt \
    -subj "/CN=transcendence.local"

# Set proper permissions
chmod 644 nginx/ssl/nginx.crt
chmod 600 nginx/ssl/nginx.key
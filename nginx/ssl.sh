#!/bin/bash

# Create ssl directory if not exists
mkdir -p nginx/ssl

# Generate certificate only if files don't exist
if [ ! -f nginx/ssl/ssl.crt ] || [ ! -f nginx/ssl/ssl.key ]; then
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
        -keyout nginx/ssl/ssl.key \
        -out nginx/ssl/ssl.crt \
        -subj "/CN=localhost"
    
    echo "SSL certificates generated"
else
    echo "SSL certificates already exist"
fi
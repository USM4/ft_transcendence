FROM python:3.11-slim-bullseye

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

COPY . .

RUN pip install -r requirements.txt
    
RUN chmod +x tool.sh

# Create requirements file with these packages:
# Django
# djangorestframework
# django-cors-headers
# djangorestframework-simplejwt
# requests
# python-dotenv
# Pillow
# channels
# daphne
# pyotp
# qrcode
# PyJWT

EXPOSE 8000

CMD ["./tool.sh"]
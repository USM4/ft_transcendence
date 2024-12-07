FROM python:3.11-slim-bullseye

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    && rm -rf /var/lib/apt/lists/*

# Copy only necessary files
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY backend/ .

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

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
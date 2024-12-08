#!/bin/bash

pip install Django

pip install djangorestframework

pip install django-cors-headers

pip install djangorestframework-simplejwt

pip install requests

pip install python-dotenv

python -m pip install Pillow

pip install channels

pip install daphne

pip install pyotp

pip install qrcode

pip install PyJWT

python manage.py makemigrations authentication chat

python manage.py migrate

python manage.py runserver 0.0.0.0:8000

echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"

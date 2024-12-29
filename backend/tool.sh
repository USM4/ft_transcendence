#!/bin/bash
# python3 -m venv env
# source ./env/bin/activate
pip install Django

pip install djangorestframework

pip install django-cors-headers

pip install djangorestframework-simplejwt

pip install requests

pip install python-dotenv

python3 -m pip install Pillow

pip install channels

pip install daphne

pip install pyotp

pip install qrcode

pip install PyJWT

pip install psycopg2-binary

echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"
python manage.py makemigrations authentification chat
echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"

python manage.py migrate
echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"

python manage.py runserver 0.0.0.0:8000
echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"


echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"

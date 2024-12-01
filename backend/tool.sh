!/bin/bash
python3 -m venv env
source ./env/bin/activate
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

echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"

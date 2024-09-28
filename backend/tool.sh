!/bin/bash
python3 -m venv env
source ./env/bin/activate
pip install Django
pip install djangorestframework
pip install django-cors-headers
pip install djangorestframework-simplejwt
echo "###############################----------------Setup complete. The environment is ready!---------------#######################################"

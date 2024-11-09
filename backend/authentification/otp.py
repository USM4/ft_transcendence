import pyotp
import qrcode
import os

def generate_otp(username):
    key = pyotp.random_base32()
    print("keeeeeey:", key)
    url = pyotp.totp.TOTP(key).provisioning_uri(name="username", issuer_name="ft_transcendence")
    qrcode_directory = "media/qr_codes/"
    if not os.path.exists(qrcode_directory):
        print("directory not found")
        os.makedirs(qrcode_directory)
    path = qrcode_directory + username + ".png"
    qrcode.make(url).save(path)
    
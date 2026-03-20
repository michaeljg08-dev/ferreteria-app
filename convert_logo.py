import base64
import os

file_path = r'c:\Users\Usuario\Downloads\Recurso 8@1080x.png'
with open(file_path, 'rb') as image_file:
    encoded_string = base64.b64encode(image_file.read())
    print(encoded_string.decode('utf-8'))


import os

path = r"c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"

with open(path, 'rb') as f:
    content = f.read()

# Mappings (Hex representation of corrupted bytes to correct bytes)
# 'âš™ï¸' in UTF-8 is often \xe2\x9a\x99\xef\xb8\x8f but if corrupted it might be different.
# Let's use the strings as seen by Python if read as latin1
replacements = [
    (b'\xe2\x9a\x99\xef\xb8\x8f', '⚙️'.encode('utf8')),
    (b'\xe2\x80\xa2', '═'.encode('utf8')), # '•' to '═'
    (b'\xc3\xa2\xe2\x80\xa2', '═'.encode('utf8')), # 'â•' to '═'
    (b'\xe2\x80\x94', '—'.encode('utf8')),
    (b'\xc3\x83\x20', 'Á'.encode('utf8')),  # 'Ã ' to 'Á'
    (b'\xc3\x83\xc2\xa1', 'á'.encode('utf8')),
    (b'\xc3\x83\xc2\xa9', 'é'.encode('utf8')),
    (b'\xc3\x83\xc2\xad', 'í'.encode('utf8')),
    (b'\xc3\x83\xc2\xb3', 'ó'.encode('utf8')),
    (b'\xc3\x83\xc2\xba', 'ú'.encode('utf8')),
    (b'\xc3\x83\xc2\xb1', 'ñ'.encode('utf8')),
    (b'\xc3\x83\xc2\x8d', 'Í'.encode('utf8')),
    (b'\xc3\x83\xc2\x81', 'Á'.encode('utf8')),
    (b'\xc3\x83\xc2\x93', 'Ó'.encode('utf8')),
    (b'\xc3\x83\xc2\x9a', 'Ú'.encode('utf8')),
    (b'\xc3\x83\xc2\x91', 'Ñ'.encode('utf8')),
]

# Specifically for the separators which have spaces between them often:
# 'â•  â•' often shows up as \xc3\xa2\xe2\x80\xa2\x20\x20\xc3\xa2\xe2\x80\xa2
content = content.replace(b'\xc3\xa2\xe2\x80\xa2  \xc3\xa2\xe2\x80\xa2', '══'.encode('utf8'))
content = content.replace(b'\xc3\xa2\xe2\x80\xa2 \xc3\xa2\xe2\x80\xa2', '══'.encode('utf8'))
content = content.replace(b'\xc3\xa2\xe2\x80\xa2', '═'.encode('utf8'))

# Fallback for the gear emoji if it was different
content = content.replace('âš™ï¸'.encode('latin1'), '⚙️'.encode('utf8'))

for old, new in replacements:
    content = content.replace(old, new)

# One more for CATÃ LOGO specifically
content = content.replace('CATÃ LOGO'.encode('latin1'), 'CATÁLOGO'.encode('utf8'))

with open(path, 'wb') as f:
    f.write(content)

print("Python cleanup completed successfully.")

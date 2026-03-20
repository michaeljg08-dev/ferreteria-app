
import os

file_path = r'c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html'
temp_path = file_path + '.temp'

# We'll try to find the binary sequences for the Mojibake
# Based on the view_file output, we see â•.
# Let's try to match the UTF-8 bytes for what we see.

with open(file_path, 'rb') as f:
    content = f.read()

# "â•" in UTF-8 is b'\xc3\xa2\xe2\x80\xa2' usually if it's literal.
# However, if it's a direct misinterpretation of UTF-8 as CP1252:
# ═ (U+2550) is b'\xe2\x95\x90'.
#   \xe2 = â
#   \x95 = •
#   \x90 = (hidden or different)
# If the file IS UTF-8 but contains these "visual" Mojibake:
# "â•" = b'\xc3\xa2\xe2\x80\xa2' (or similar)

# Let's try a few common patterns.
replacements = [
    # Separators
    (b'\xe2\x95\x90', b'\xe2\x95\x90'), # This doesn't change anything if it's correct
    # But wait, maybe it's b'\xe2\x95\x90' and we want it to stay b'\xe2\x95\x90' but the header was wrong?
    # No, the meta tag is already UTF-8.
    
    # If we see â• in the output, it means the bytes \xe2\x95 are in the file.
    # Let's try to find these specific bytes.
]

# Mapping based on visual Mojibake
# âš™ï¸ = Gear emoji (U+2699 U+FE0F) = \xe2\x9a\x99\xef\xb8\x8f
# If it shows as âš™ï¸:
# \xe2 = â
# \x9a = š
# \x99 = ™
# \xef = ï
# \xb8 = ¸
# \x8f = (hidden)

# So if we see âš™ï¸, the bytes are \xe2\x9a\x99\xef\xb8\x8f which IS UTF-8 for ⚙️.
# This means the file MIGHT be correct and only my "view" or the browser is failing?
# But the user says "restaurar los iconos", implying they are broken.

# Wait! If the file is UTF-8 and contains \xe2\x9a\x99\xef\xb8\x8f, it SHOULD show as ⚙️.
# If it shows as âš™ï¸, it means the bytes \xc3\xa2\xc5\xa1\xe2\x84\xa2\xc3\xaf\xc2\xb8\xc2\x8f are in the file!
# (That's double encoding)

def fix_mojibake(data):
    # Try to fix double-encoded UTF-8
    try:
        # If it was double encoded: UTF-8 -> Latin1 -> UTF-8
        # Recover: data -> decode('utf-8') -> encode('latin1') -> decode('utf-8')
        text = data.decode('utf-8')
        recovered = text.encode('latin-1').decode('utf-8')
        print("Detected and fixed double encoding.")
        return recovered.encode('utf-8')
    except (UnicodeDecodeError, UnicodeEncodeError):
        return data

fixed_content = fix_mojibake(content)

with open(temp_path, 'wb') as f:
    f.write(fixed_content)

print(f"Original size: {len(content)}")
print(f"Fixed size: {len(fixed_content)}")

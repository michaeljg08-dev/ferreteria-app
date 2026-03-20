import sys

file_path = r'c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html'

try:
    with open(file_path, 'rb') as f:
        content = f.read()
    
    # Try decoding as UTF-8 and catch errors
    try:
        content.decode('utf-8')
        print("File is valid UTF-8.")
    except UnicodeDecodeError as e:
        print(f"File is NOT valid UTF-8. Error at position {e.start}: {e.reason}")
    
    # Analyze lines for Mojibake-like patterns
    lines = content.split(b'\n')
    for i, line in enumerate(lines):
        # Look for sequences like \xc3\xa1 (á), \xc3\xb3 (ó), etc.
        # or characters that look like â (0xe2)
        if b'\xe2' in line or b'\xc3' in line:
            try:
                decoded_line = line.decode('utf-8')
            except UnicodeDecodeError:
                # If it doesn't decode, it's definitely an issue
                print(f"Line {i+1} has invalid UTF-8: {line}")
                continue
            
            # If it decodes but contains â (U+00E2) or other common Mojibake indicators
            if 'Ã' in decoded_line or 'â' in decoded_line:
                # Clean up for display
                display_line = decoded_line.strip()
                if len(display_line) > 100:
                    display_line = display_line[:100] + "..."
                print(f"Line {i+1} potentially corrupted: {display_line}")

except Exception as e:
    print(f"Error: {e}")

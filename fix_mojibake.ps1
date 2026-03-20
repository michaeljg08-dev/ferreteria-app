
$path = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Function to get UTF8 string from bytes
function Get-Utf8([byte[]]$bytes) {
    return [System.Text.Encoding]::UTF8.GetString($bytes)
}

# Function to get Latin1 string from bytes (simulating how Mojibake looks)
function Get-Latin1([byte[]]$bytes) {
    return [System.Text.Encoding]::GetEncoding("iso-8859-1").GetString($bytes)
}

# Define replacements using hex bytes to avoid script encoding issues
# ═ (U+2550) = \xe2\x95\x90
$search_sep_bytes = [byte[]](0xC3, 0xA2, 0xE2, 0x95, 0x90) # This is a guess for "â•"
# Let's try to match what we actually see.
# If "â•" is b'\xe2\x95\x90' misread as CP1252 but THEN encoded back to UTF-8:
# â = \xe2 -> UTF8: \xc3\xa2
# • = \x95 -> UTF8: \xe2\x80\xa2 (Wait, check this)

# Let's use the actual characters but defined via hex to be safe.
$mojibake_gear = Get-Utf8 @(0xC3, 0xA2, 0xC5, 0xA1, 0xE2, 0x84, 0xA2, 0xC3, 0xAF, 0xC2, 0xB8, 0xC2, 0x8F) # Potential for âš™ï¸
$clean_gear = [char]0x2699 + [char]0xFE0F # ⚙️

# Actually, let's just use the most basic replacement: 
# Replace the SPECIFIC lines using their line numbers if possible, 
# OR just use a simpler replacement of the individual Mojibake components.

$content = $content.Replace([char]0x00E2 + [char]0x2022, "═") # â• -> ═
$content = $content.Replace([char]0x00E2 + [char]0x2122, "⚙️") # âš™ -> ⚙️ (Rough match)

# Let's try the common Spanish ones
$content = $content.Replace([char]0x00C3 + [char]0x00B3, "ó")
$content = $content.Replace([char]0x00C3 + [char]0x00A1, "á")
$content = $content.Replace([char]0x00C3 + [char]0x00A9, "é")
$content = $content.Replace([char]0x00C3 + [char]0x00AD, "í")
$content = $content.Replace([char]0x00C3 + [char]0x00BA, "ú")
$content = $content.Replace([char]0x00C3 + [char]0x00B1, "ñ")

# Write back
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)

Write-Host "Hex-safe replacement completed."

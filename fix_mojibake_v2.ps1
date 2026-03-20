
$path = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Fix separators with spaces
$content = $content.Replace("â•  â• ", "══")
$content = $content.Replace("â•  â•", "══")
$content = $content.Replace("â• ", "═")

# Fix CATÃ LOGO
$content = $content.Replace("CATÃ LOGO", "CATÁLOGO")

# Fix any other remaining Ã
$content = $content.Replace("Ã³", "ó")
$content = $content.Replace("Ã¡", "á")
$content = $content.Replace("Ã©", "é")
$content = $content.Replace("Ã­", "í")
$content = $content.Replace("Ãº", "ú")
$content = $content.Replace("Ã±", "ñ")
$content = $content.Replace("Ã ", "Á") # Space version if any

# Just in case, literal CATÃ LOGO with possible hidden chars
$content = $content.Replace("CATÃ" + [char]0x00A0 + "LOGO", "CATÁLOGO") # Non-breaking space?

# Brute force for separators
for($i=0; $i -lt 10; $i++) {
    $content = $content.Replace("â•  ", "══")
}

# Write back
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBom)

Write-Host "Refined replacement completed."

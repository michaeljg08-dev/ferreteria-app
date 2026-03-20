
$htmlPath = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"
$logoPath = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\logo_base64.txt"
$logoBase64 = Get-Content $logoPath -Raw
$logoBase64 = $logoBase64.Trim()
$logoBase64 = $logoBase64 -replace "\s+", ""
# Prefix for PNG base64 if needed
if (-not $logoBase64.StartsWith("data:image")) {
    $logoBase64 = "data:image/png;base64," + $logoBase64
}

$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Fix Brand Names and Encoding
$content = $content -replace "HR FerreterÃ­a", "HR FERRETERÍA"
$content = $content -replace "ferreterÃ­a", "FERRETERÍA"
$content = $content -replace "GarantÃ­a", "Garantía"
$content = $content -replace "PedÃ­", "Pedí"
$content = $content -replace "recibÃ­", "recibí"
$content = $content -replace "rÃ¡pidas", "rápidas"
$content = $content -replace "EnvÃ­o", "Envío"
$content = $content -replace "paÃ­s", "país"
$content = $content -replace "ConstrucciÃ³n", "Construcción"
$content = $content -replace "ElÃ©ctricas", "Eléctricas"
$content = $content -replace "FontanerÃ­a", "Fontanería"
$content = $content -replace "TuberÃ­a", "Tubería"
$content = $content -replace "AsesorÃ­a", "Asesoría"
$content = $content -replace "TÃ©cnica", "Técnica"
$content = $content -replace "lÃ­nea", "línea"
$content = $content -replace "aquÃ­", "aquí"
$content = $content -replace "CÃ³mo", "Cómo"
$content = $content -replace "rÃ¡pidas", "rápidas"
$content = $content -replace "mÃ¡s", "más"
$content = $content -replace "mÃ¡xima", "máxima"
$content = $content -replace "pÃ¡gina", "página"
$content = $content -replace "ferreteria", "FERRETERÍA"

# Update Logo Base64
# Look for the logo image source and replace it
# There are two main logo patterns: .loader-logo-img and .logo-img
$content = $content -replace '(<img[^>]+class="loader-logo-img"[^>]+src=")[^"]*(")', "`${1}$logoBase64`${2}"
$content = $content -replace '(<img[^>]+class="logo-img"[^>]+src=")[^"]*(")', "`${1}$logoBase64`${2}"
$content = $content -replace '(<img[^>]+class="footer-logo-img"[^>]+src=")[^"]*(")', "`${1}$logoBase64`${2}"

# Remove conflicting transitions in JS
$content = $content -replace "bar.style.transition = 'width 0.1s linear';", "// Transición eliminada para evitar oscilación"
$content = $content -replace "pBar.style.transition = 'width 0.1s linear';", "// Transición eliminada para evitar oscilación"

[System.IO.File]::WriteAllText($htmlPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "HTML updated successfully."

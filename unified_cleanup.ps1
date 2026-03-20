
$htmlPath = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"

# Ensure we read as UTF8
$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Group 1: Separators
$content = $content.Replace("â•", "═")

# Group 2: Accented characters
$content = $content.Replace("Ã³", "ó")
$content = $content.Replace("Ã¡", "á")
$content = $content.Replace("Ã©", "é")
$content = $content.Replace("Ã­", "í")
$content = $content.Replace("Ãº", "ú")
$content = $content.Replace("Ã±", "ñ")
$content = $content.Replace("Ã ", "Á ")
$content = $content.Replace("FERRETERÃA", "FERRETERÍA")
$content = $content.Replace("CATÃ LOGO", "CATÁLOGO")

# Group 3: Icons/Emojis
$content = $content.Replace("âš™ï¸", "⚙️")
$content = $content.Replace("â† ", "← ")
$content = $content.Replace("â†’", "→")
$content = $content.Replace("ðŸ“ ", "📍")
$content = $content.Replace("ðŸ“¦", "📦")
$content = $content.Replace("ðŸ” ", "🔍")
$content = $content.Replace("ðŸšš", "🚚")
$content = $content.Replace("ðŸ”¨", "🔨")
$content = $content.Replace("âš¡", "⚡")
$content = $content.Replace("ðŸªš", "🪚")
$content = $content.Replace("ðŸ’¡", "💡")
$content = $content.Replace("ðŸ”Œ", "🔌")
$content = $content.Replace("ðŸŽ¨", "🎨")
$content = $content.Replace("ðŸ”§", "🔧")
$content = $content.Replace("ðŸ¦º", "🦺")
$content = $content.Replace("âœ ", "✓ ")
$content = $content.Replace("â€”", "—")

# Fix specific broken alt tag
$content = $content -replace 'alt="HR Ferreter\?\?\?\?a Santa Clara"', 'alt="HR FERRETERÍA"'

# Write back as UTF8 (No BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($htmlPath, $content, $utf8NoBom)

Write-Host "Unified cleanup completed with safer syntax."

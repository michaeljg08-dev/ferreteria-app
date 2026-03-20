
$htmlPath = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"

# Read as UTF8
$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# 1. Fix Branding in Footer Logo alt
$content = $content -replace 'alt="HR Ferreter\?\?\?\?a Santa Clara"', 'alt="HR FERRETERÍA"'

# 2. Fix specific UTF8 glitches
$content = $content -replace "ðŸ“ ", "📍"
$content = $content -replace "ðŸ“¦", "📦"
$content = $content -replace "Ã­", "í"
$content = $content -replace "Ã©", "é"
$content = $content -replace "Ã¡", "á"
$content = $content -replace "Ã³", "ó"
$content = $content -replace "Ãº", "ú"
$content = $content -replace "Ã±", "ñ"
$content = $content -replace "Â·", "·"
$content = $content -replace "ðŸ” ", "🔍"
$content = $content -replace "ðŸšš", "🚚"
$content = $content -replace "âš™ï¸ ", "⚙️"
$content = $content -replace "â† ", "←"
$content = $content -replace "â†’", "→"
$content = $content -replace "ðŸ”¨", "🔨"
$content = $content -replace "âš¡", "⚡"
$content = $content -replace "ðŸªš", "🪚"
$content = $content -replace "ðŸ’¡", "💡"
$content = $content -replace "ðŸ”Œ", "🔌"
$content = $content -replace "ðŸŽ¨", "🎨"
$content = $content -replace "ðŸ”§", "🔧"
$content = $content -replace "ðŸ¦º", "🦺"
$content = $content -replace "âœ", "✓"

# 3. Final Branding Normalization
$content = $content -replace "HR Ferretería", "HR FERRETERÍA"
$content = $content -replace "Santa Clara · Florencia", "Santa Clara · Florencia" # Encoding fix only

# Write back as UTF8 (No BOM)
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($htmlPath, $content, $utf8NoBom)

Write-Host "Cleanup completed successfully."

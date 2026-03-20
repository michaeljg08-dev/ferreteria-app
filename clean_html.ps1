
$htmlPath = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"
$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Map of corrupted UTF-8 sequences to correct characters/emojis
$replacements = @{
    "ðŸ“¦" = "📦";
    "ðŸ” " = "🔍";
    "ðŸšš" = "🚚";
    "ðŸ —ï¸ " = "🏗️";
    "ðŸ”©" = "🔨";
    "âš™ï¸ " = "⚙️";
    "â† " = "←";
    "â†’" = "→";
    "ðŸ”¨" = "🔨";
    "âš¡" = "⚡";
    "ðŸªš" = "🪚";
    "ðŸª£" = "🧱";
    "ðŸ“ " = "📏";
    "ðŸ§±" = "🧱";
    "ðŸ’¡" = "💡";
    "ðŸ”Œ" = "🔌";
    "ðŸŽ¨" = "🎨";
    "ðŸ”§" = "🔧";
    "ðŸ¦º" = "🦺";
    "ðŸ‘·" = "👷";
    "ðŸª›" = "🪛";
    "ðŸ”©" = "🔨";
    "âš" = "⚡"; # Special case for broken thunder
    "âœ…" = "✅";
    "ðŸ’¬" = "💬";
    "âœ" = "✓";
    "â€”" = "—";
    "Ã­" = "í";
    "Ã©" = "é";
    "Ã¡" = "á";
    "Ã³" = "ó";
    "Ãº" = "ú";
    "Ã±" = "ñ";
    "Ã" = "Á"; # Just in case
    "Â¿" = "¿";
}

foreach ($key in $replacements.Keys) {
    if ($content.Contains($key)) {
        $content = $content.Replace($key, $replacements[$key])
    }
}

# Ensure Brand name is capitalized and accented
$content = $content -replace "FERRETERIA", "FERRETERÍA"
$content = $content -replace "Ferretería", "FERRETERÍA"
$content = $content -replace "HR FERRETERÍA", "HR FERRETERÍA"

[System.IO.File]::WriteAllText($htmlPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "HTML cleaned successfully."

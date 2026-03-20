
$htmlPath = "c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html"
$content = [System.IO.File]::ReadAllText($htmlPath, [System.Text.Encoding]::UTF8)

# Use hex-based regex or specific byte-patterns for known corrupt sequences if possible, 
# but for now let's try a direct string replacement with Unicode character literals.

function SafeReplace($text, $corrupt, $clean) {
    return $text.Replace($corrupt, $clean)
}

$content = SafeReplace $content "ðŸ“¦" "📦"
$content = SafeReplace $content "ðŸ” " "🔍"
$content = SafeReplace $content "ðŸšš" "🚚"
$content = SafeReplace $content "ðŸ —ï¸ " "🏗️"
$content = SafeReplace $content "ðŸ”©" "🔨"
$content = SafeReplace $content "âš™ï¸ " "⚙️"
$content = SafeReplace $content "â† " "←"
$content = SafeReplace $content "â†’" "→"
$content = SafeReplace $content "ðŸ”¨" "🔨"
$content = SafeReplace $content "âš¡" "⚡"
$content = SafeReplace $content "ðŸªš" "🪚"
$content = SafeReplace $content "ðŸª£" "🧱"
$content = SafeReplace $content "ðŸ“ " "📏"
$content = SafeReplace $content "ðŸ§±" "🧱"
$content = SafeReplace $content "ðŸ’¡" "💡"
$content = SafeReplace $content "ðŸ”Œ" "🔌"
$content = SafeReplace $content "ðŸŽ¨" "🎨"
$content = SafeReplace $content "ðŸ”§" "🔧"
$content = SafeReplace $content "ðŸ¦º" "🦺"
$content = SafeReplace $content "ðŸ‘·" "👷"
$content = SafeReplace $content "ðŸª›" "🪛"
$content = SafeReplace $content "âœ…" "✅"
$content = SafeReplace $content "ðŸ’¬" "💬"
$content = SafeReplace $content "âœ" "✓"
$content = SafeReplace $content "â€”" "—"
$content = SafeReplace $content "Ã­" "í"
$content = SafeReplace $content "Ã©" "é"
$content = SafeReplace $content "Ã¡" "á"
$content = SafeReplace $content "Ã³" "ó"
$content = SafeReplace $content "Ãº" "ú"
$content = SafeReplace $content "Ã±" "ñ"
$content = SafeReplace $content "Â·" "·"
$content = SafeReplace $content "Ã" "Á"
$content = SafeReplace $content "Â¿" "¿"

[System.IO.File]::WriteAllText($htmlPath, $content, [System.Text.Encoding]::UTF8)
Write-Host "HTML cleaned successfully with SafeReplace."

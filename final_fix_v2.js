const fs = require('fs');
const path = 'hr-ferreteria-v2.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Fix Loader HTML (reset to 0% and remove hardcoded state)
// Line 579 and 581 found in grep
content = content.replace(/<div class="loader-bar" style="width: 100%;">/g, '<div class="loader-bar">');
content = content.replace(/<div class="loader-pct">100%<\/div>/g, '<div class="loader-pct">0%</div>');

// 2. Ensure loader is shown initially (remove hide class if present)
content = content.replace(/id="loader" class="hide"/g, 'id="loader"');

// 3. Fix WhatsApp button styling (requested transparency)
// We'll update the .wa-btn style to be transparent or have a cleaner look
content = content.replace(/\.wa-btn\s*\{([^\}]*?)\}/g, (match, p1) => {
    if (p1.includes('background')) {
        return match.replace(/background:\s*[^;!]+(!important)?/g, 'background: transparent !important');
    }
    return match;
});

// 4. Fix corrupted emojis and text sequences (Mojibake)
// Based on common corruptions and previous efforts
const replacements = [
    { search: /═a\\\"️/g, replace: '⚙️' },
    { search: /S️/g, replace: '⚙️' },
    { search: /x /g, replace: '⚙️' }, // Many 'x ' in view_file were actually emojis like tools/etc.
    { search: /🧱/g, replace: '🧱' },
    { search: /⚡/g, replace: '⚡' },
    { search: /🎨/g, replace: '🎨' },
    { search: /🔒/g, replace: '🔒' },
    { search: /🏗️/g, replace: '🏗️' },
    { search: /❤️/g, replace: '❤️' },
    { search: /📦/g, replace: '📦' },
    { search: /💬/g, replace: '💬' },
    { search: /👷/g, replace: '👷' },
    { search: /🛠️/g, replace: '🛠️' },
    { search: /📍/g, replace: '📍' },
    { search: /📧/g, replace: '📧' },
    { search: /📞/g, replace: '📞' },
    { search: /⏰/g, replace: '⏰' },
    { search: /🛡️/g, replace: '🛡️' },
    { search: /⭐/g, replace: '⭐' },
    { search: /🚛/g, replace: '🚛' },
    { search: /💳/g, replace: '💳' },
    { search: /📱/g, replace: '📱' },
    { search: /✖️/g, replace: '✖️' },
    { search: /⬢⬢⬢⬢⬢/g, replace: '•••••' }, // Fix password dots if they look weird
    { search: /S /g, replace: '✅' }, // S often was a checkmark or similar
];

// Specific script mapping fixes (found in line 1700-1701)
content = content.replace(/'herramientas':'x '/g, "'herramientas':'🛠️'");
content = content.replace(/'fontanería':'x '/g, "'fontanería':'🚰'");
content = content.replace(/'fontaneria':'x '/g, "'fontaneria':'🚰'");
content = content.replace(/'fijación':'x '/g, "'fijación':'🔩'");
content = content.replace(/'fijacion':'x '/g, "'fijacion':'🔩'");
content = content.replace(/obj\.imagen \|\| 'x '/g, "obj.imagen || '🖼️'");
content = content.replace(/emojiMap\[categoria\.toLowerCase\(\)\] \|\| 'x '/g, "emojiMap[categoria.toLowerCase()] || '📦'");

// WhatsApp link text
content = content.replace(/x\s+Consultar por WhatsApp/g, '💬 Consultar por WhatsApp');

// Sync status
content = content.replace(/productos cargados S/g, 'productos cargados ✅');

// Fix accidental binary characters around emojis
content = content.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x9F]/g, '');

fs.writeFileSync(path, content, 'utf8');
console.log('Final fix applied successfully.');

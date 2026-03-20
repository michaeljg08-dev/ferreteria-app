const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hr-ferreteria-v2.html');

try {
    let txt = fs.readFileSync(filePath, 'utf-8');
    
    // Replace visual mojibake patterns remaining after binary recovery
    // Em dash â€” -> —
    txt = txt.replace(/â€”/g, '—');
    
    // Gears âš™ï¸ -> ⚙️
    txt = txt.replace(/âš™ï¸/g, '⚙️');
    
    // Double lines â• -> ═
    txt = txt.replace(/â• /g, '═ ');
    txt = txt.replace(/â•/g, '═');
    
    // Quotes â€œ -> “ and â€ -> ”
    txt = txt.replace(/â€œ/g, '“');
    txt = txt.replace(/â€/g, '”');

    // FerreterÃ­a -> Ferretería (in case it wasn't caught locally)
    txt = txt.replace(/FerreterÃ­a/g, 'Ferretería');
    txt = txt.replace(/FERRETERÃ A/g, 'FERRETERÍA');

    fs.writeFileSync(filePath, txt, 'utf-8');
    console.log('Specific replacements applied successfully.');

} catch (err) {
    console.error('Error during processing:', err);
}

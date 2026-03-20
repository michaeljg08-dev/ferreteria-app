const fs = require('fs');
const path = 'hr-ferreteria-v2.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Navigation User Icon
content = content.replace(/<button onclick="toggleLogin\(true\)"[^>]*>\s*x\s*<\/button>/g, (match) => {
    return match.replace(/>\s*x\s*</, '>👤<');
});

// 2. Service Icons
content = content.replace(/<span class="srv-icon">x<\/span>/g, '<span class="srv-icon">🚰</span>'); // This specific one was for Fontaneria
// Generic srv-icon fix for others if any
content = content.replace(/<span class="srv-icon">x<\/span>/g, '<span class="srv-icon">⚙️</span>');

// 3. Admin Headers and Connect Sheets
content = content.replace(/<h4>x Conectar Google Sheets<\/h4>/g, '<h4>🔗 Conectar Google Sheets</h4>');
content = content.replace(/<h4>x Inventario &amp; Catálogo<\/h4>/g, '<h4>📦 Inventario & Catálogo</h4>');
content = content.replace(/<h4>x️ Mantenimiento de Slides \(Hero\)<\/h4>/g, '<h4>🖼️ Mantenimiento de Slides (Hero)</h4>');

// 4. Product Emojis (in script) - specifically looking for 'x'
content = content.replace(/'herramientas':'x'/g, "'herramientas':'🛠️'");
content = content.replace(/'fontanería':'x'/g, "'fontanería':'🚰'");
content = content.replace(/'fontaneria':'x'/g, "'fontaneria':'🚰'");
content = content.replace(/'fijación':'x'/g, "'fijación':'🔩'");
content = content.replace(/'fijacion':'x'/g, "'fijacion':'🔩'");
content = content.replace(/\|\| 'x'/g, "|| '📦'");

// 5. Hardcoded Product Card Placeholders (Grid)
content = content.replace(/<div class="emoji-placeholder">x<\/div>/g, (match, offset) => {
    // We need to look at context, but simple replace with relevant ones if possible
    return '<div class="emoji-placeholder">🛠️</div>'; 
});
content = content.replace(/<div class="emoji-placeholder">xa<\/div>/g, '<div class="emoji-placeholder">🛠️</div>');
content = content.replace(/<div class="emoji-placeholder">x <\/div>/g, '<div class="emoji-placeholder">🧱</div>');
content = content.replace(/<div class="emoji-placeholder">xR<\/div>/g, '<div class="emoji-placeholder">⚡</div>');

// 6. Branch Information Icons (i-item)
// Dirección
content = content.replace(/<div class="i-ico">x<\/div>\s*<div>\s*<div class="i-label">Dirección<\/div>/g, (match) => {
    return match.replace(/>x</, '>📍<');
});
// Teléfono
content = content.replace(/<div class="i-ico">x~<\/div>\s*<div>\s*<div class="i-label">Teléfono<\/div>/g, (match) => {
    return match.replace(/>x~</, '>📞<');
});
// WhatsApp
content = content.replace(/<div class="i-ico">x<\/div>\s*<div>\s*<div class="i-label">WhatsApp<\/div>/g, (match) => {
    return match.replace(/>x</, '>💬<');
});
// Horario
content = content.replace(/<div class="i-ico">x"<\/div>\s*<div>\s*<div class="i-label">Horario<\/div>/g, (match) => {
    return match.replace(/>x"</, '>⏰<');
});

// 7. Branch WhatsApp link
content = content.replace(/<a class="wa-link"[^>]*>\s*x Escribir por WhatsApp\s*<\/a>/g, (match) => {
    return match.replace(/>\s*x/, '>💬');
});

// 8. Map Pins
content = content.replace(/<div class="mapa-pin-ico">x<\/div>/g, '<div class="mapa-pin-ico">📍</div>');

// 9. Form Submit Buttons with weird chars
content = content.replace(/Enviar a Santa Clara ~/g, 'Enviar a Santa Clara 🚀');
content = content.replace(/Enviar a Valle Azul ~/g, 'Enviar a Valle Azul 🚀');

// 10. Cat Empty Icon
content = content.replace(/<div class="cat-empty-icon">x<\/div>/g, '<div class="cat-empty-icon">📦</div>');

// 11. Modal Detail WhatsApp Button
content = content.replace(/class="m-btn-wa">x Consultar por WhatsApp<\/a>/g, 'class="m-btn-wa">💬 Consultar por WhatsApp</a>');

// 12. Placeholder for generic icons or remaining 'x' in common places
content = content.replace(/<div class="vis-icon">x<\/div>/g, '<div class="vis-icon">👁️</div>');
content = content.replace(/<div class="nos-img-box">x<\/div>/g, '<div class="nos-img-box">🏠</div>');

// Cleanup any leftover 'x' patterns that look like icons
content = content.replace(/>x</g, '>⚙️<'); // Last resort fallback for invisible icons

fs.writeFileSync(path, content, 'utf8');
console.log('Icons restored successfully.');

const fs = require('fs');
let s = fs.readFileSync('hr-ferreteria-v2.html', 'utf8');

const rChar = String.fromCharCode(65533);
s = s.replace(new RegExp(rChar + 'a\"️', 'g'), '⚙️');
s = s.replace(new RegExp(rChar + 'ltima', 'g'), 'Última');
s = s.replace(new RegExp(rChar + 'S  Mensaje', 'g'), '✅ Mensaje');
s = s.replace(new RegExp('width=\"480px\" height=\"480px\"', 'g'), 'width=\"100%\" height=\"100%\"');
s = s.replace(new RegExp('Hecho con ' + rChar + 'x ' + rChar + ' en', 'g'), 'Hecho con ❤️ en');
s = s.replace(new RegExp(rChar + 'x ' + rChar + '️ Mantenimiento', 'g'), '🖼️ Mantenimiento');
s = s.replace(new RegExp(rChar + 'x ' + rChar + ' Inventario', 'g'), '📦 Inventario');
s = s.replace(new RegExp('icon: \'' + rChar + 'x' + rChar + rChar + '\'', 'g'), 'icon: \'🏗️\'');
s = s.replace(new RegExp('Ej: ' + rChar + 'x' + rChar + rChar, 'g'), 'Ej: 🏗️');
s = s.replace(new RegExp('<span>' + rChar + ' © 2025 HR Ferretería', 'g'), '<span>© 2025 HR Ferretería');

fs.writeFileSync('hr-ferreteria-v2.html', s);
console.log('Fixed file');

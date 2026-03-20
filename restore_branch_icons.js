const fs = require('fs');
const path = 'hr-ferreteria-v2.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Restore Branch Tab Icons
content = content.replace(/<div class="tab-dot"><\/div>\s*x Santa Clara/g, '<div class="tab-dot"></div> 🏠 Santa Clara');
content = content.replace(/<div class="tab-dot"><\/div>\s*x Valle Azul/g, '<div class="tab-dot"></div> 🏠 Valle Azul');

fs.writeFileSync(path, content, 'utf8');
console.log('Branch tab icons restored successfully.');

const fs = require('fs');
const path = 'hr-ferreteria-v2.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Footer Heart Icon
content = content.replace(/<span>Hecho con x en Costa Rica<\/span>/g, '<span>Hecho con ❤️ en Costa Rica</span>');

// 2. Hardcoded Catalog Emoji for Item 5 (Construcción)
content = content.replace(/id:5,nombre:'Varilla 3\/8" x 6m',categoria:'Construcción',precio:' 5.200',imagenes:\[\],emoji:'x '/g, "id:5,nombre:'Varilla 3/8\" x 6m',categoria:'Construcción',precio:' 5.200',imagenes:[],emoji:'🧱'");

fs.writeFileSync(path, content, 'utf8');
console.log('Final footer and catalog fixes applied.');

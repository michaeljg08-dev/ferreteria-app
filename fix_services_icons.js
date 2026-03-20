const fs = require('fs');
const path = 'hr-ferreteria-v2.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Service Section Icons Fix
content = content.replace(/<span class="srv-icon">x️<\/span><div class="srv-name">Materiales de Construcción<\/div>/g, '<span class="srv-icon">🏗️</span><div class="srv-name">Materiales de Construcción</div>');
content = content.replace(/<span class="srv-icon">xaa<\/span><div class="srv-name">Entrega a Domicilio<\/div>/g, '<span class="srv-icon">🚛</span><div class="srv-name">Entrega a Domicilio</div>');
content = content.replace(/<span class="srv-icon">🚰<\/span><div class="srv-name">Asesoría Técnica<\/div>/g, '<span class="srv-icon">🤝</span><div class="srv-name">Asesoría Técnica</div>');

fs.writeFileSync(path, content, 'utf8');
console.log('Service icons restored successfully.');

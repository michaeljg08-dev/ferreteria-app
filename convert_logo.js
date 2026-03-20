const fs = require('fs');
const path = 'c:\\Users\\Usuario\\Downloads\\Recurso 8@1080x.png';
const buffer = fs.readFileSync(path);
const base64 = buffer.toString('base64');
fs.writeFileSync('logo_base64.txt', base64, 'utf8');
console.log('Done');

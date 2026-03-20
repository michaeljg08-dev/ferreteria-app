const fs = require('fs');

let s = fs.readFileSync('hr-ferreteria-v2.html', 'utf8');

// The sequence of the replacement character
const c = String.fromCharCode(65533); 

s = s.replace(new RegExp(c + 'a"️', 'g'), '⚙️');
s = s.replace(new RegExp(c + 'x}'+ c, 'g'), '🎨');
s = s.replace(new RegExp(c + 'a' + c, 'g'), '⚡');
s = s.replace(new RegExp(c + 'x' + c + c + '️', 'g'), '✨');

s = s.replace(new RegExp('PRECISI' + c + ' N', 'g'), 'PRECISIÓN');
s = s.replace(new RegExp(c + 'Última', 'g'), 'Última');
s = s.replace(new RegExp(c + 'x ' + c + '️ Mantenimiento', 'g'), '🖼️ Mantenimiento');

s = s.replace(new RegExp(c + ' ' + c, 'g'), '◀');
s = s.replace(new RegExp(c + '  ', 'g'), '▶');
s = s.replace(new RegExp(c + ' ' + c + ' 0.00', 'g'), '₡ 0.00');
s = s.replace(new RegExp(c + ' ' + c + ' \\$\\{precio\\}', 'g'), '₡ ${precio}');
s = s.replace(new RegExp(c + ' ' + c + ' ', 'g'), '₡ ');

s = s.replace(new RegExp(c + 'S ', 'g'), '✅');
s = s.replace(new RegExp(c + 'x ' + c, 'g'), '📦'); 
s = s.replace(new RegExp(c + '   ' + c, 'g'), '---');

// Finally, clear any stray ones if we don't care, but better to target them
// Let's do a fast global map for specific ones left over from the file
let lines = s.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('t3: \'PRECISI')) {
    lines[i] = lines[i].replace(/t3: 'PRECISI N'/, "t3: 'PRECISIÓN'");
  }
  if (lines[i].includes('mWaBtn')) {
    lines[i] = lines[i].replace(/x  Consultar/, "💬 Consultar");
  }
}
s = lines.join('\n');

// Clean all remaining replacement chars if there are any comments
s = s.replace(new RegExp('/\\* ' + c + ' ' + c + c + ' ' + c + c + ' ' + c + ' ', 'g'), '/* --- ');
s = s.replace(new RegExp(' ' + c + ' ' + c + c + ' ' + c + c + ' ' + c + ' \\*/', 'g'), ' --- */');

// Just remove all remaining replacement characters to make it clean
while(s.includes(c)) {
   s = s.replace(c, '');
}

fs.writeFileSync('hr-ferreteria-v2.html', s);
console.log('Finished secondary replace');

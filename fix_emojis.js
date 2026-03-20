const fs = require('fs');

let s = fs.readFileSync('hr-ferreteria-v2.html', 'utf8');
const rChar = String.fromCharCode(65533);

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

// Empezamos con los del loader y la ventana de carga
s = replaceAll(s, '<div id="loader" class="hide" style="display: flex;">', '<div id="loader">');
s = replaceAll(s, rChar + 'a"️', '⚙️');

// Emojis según context
s = replaceAll(s, "icon: '" + rChar + "a" + rChar + "'", "icon: '⚡'");
s = replaceAll(s, "icon: '" + rChar + "x}" + rChar + "'", "icon: '🎨'");
s = replaceAll(s, "icon || '" + rChar + "x:" + rChar + "️'", "icon || '✨'");
s = replaceAll(s, "'configuración guardada y sincronizada " + rChar + "S '", "'Configuración guardada y sincronizada ✅'");
s = replaceAll(s, "value = '" + rChar + "x " + rChar + "'", "value = '🔧'");
s = replaceAll(s, "value || '" + rChar + "x:" + rChar + "️'", "value || '✨'");
s = replaceAll(s, "icon: document.getElementById('sIcon').value || '✨'", "icon: document.getElementById('sIcon').value || '✨'");

// Mapa de emojis
s = s.replace(new RegExp("'herramientas':'" + rChar + "x " + rChar + "'", 'g'), "'herramientas':'🔧'");
s = s.replace(new RegExp("'construcción':'" + rChar + "x" + rChar + rChar + "'", 'g'), "'construcción':'🧱'");
s = s.replace(new RegExp("'construccion':'" + rChar + "x" + rChar + rChar + "'", 'g'), "'construccion':'🧱'");
s = s.replace(new RegExp("'eléctrico':'" + rChar + "a" + rChar + "'", 'g'), "'eléctrico':'⚡'");
s = s.replace(new RegExp("'electrico':'" + rChar + "a" + rChar + "'", 'g'), "'electrico':'⚡'");
s = s.replace(new RegExp("'fontanería':'" + rChar + "x " + rChar + "'", 'g'), "'fontanería':'🚰'");
s = s.replace(new RegExp("'fontaneria':'" + rChar + "x " + rChar + "'", 'g'), "'fontaneria':'🚰'");
s = s.replace(new RegExp("'pintura':'" + rChar + "x}" + rChar + "'", 'g'), "'pintura':'🎨'");
s = s.replace(new RegExp("'fijación':'" + rChar + "x " + rChar + "'", 'g'), "'fijación':'🔩'");
s = s.replace(new RegExp("'fijacion':'" + rChar + "x " + rChar + "'", 'g'), "'fijacion':'🔩'");
s = s.replace(new RegExp("'seguridad':'" + rChar + "x" + rChar + rChar + "'", 'g'), "'seguridad':'🔒'");

s = replaceAll(s, "|| '" + rChar + "x " + rChar + "'", "|| '📦'");
s = replaceAll(s, "? `" + rChar + " " + rChar + " ${precio}`", "? `₡ ${precio}`");
s = replaceAll(s, "productos cargados " + rChar + "S `", "productos cargados ✅`");
s = replaceAll(s, ">" + rChar + 'S"<', ">✖️<");
s = replaceAll(s, rChar + " " + rChar + " 0.00", "₡ 0.00");
s = replaceAll(s, ">" + rChar + "x " + rChar + " Consultar por WhatsApp<", ">💬 Consultar por WhatsApp<");

s = replaceAll(s, "PRECISI" + rChar + " N", "PRECISIÓN");
s = replaceAll(s, "Última sincronización", "Última sincronización");
s = replaceAll(s, "altima", "Última");

// Limpiar comentarios de JS, solo quitar los caracteres raros (s="/*     Slider     */")
s = s.replace(new RegExp('/\\* ' + rChar + ' ' + rChar + rChar + ' ' + rChar + rChar + ' ' + rChar + ' ', 'g'), '/* --- ');
s = s.replace(new RegExp(' ' + rChar + ' ' + rChar + rChar + ' ' + rChar + rChar + ' ' + rChar + ' \\*/', 'g'), ' --- */');

fs.writeFileSync('hr-ferreteria-v2.html', s);
console.log('Fixed additional emojis and loader');

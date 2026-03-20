const fs = require('fs');

let s = fs.readFileSync('hr-ferreteria-v2.html', 'utf8');
const lines = s.split('\n');

const targetContent = lines.slice(0, 7).join('\n');
const replacementContent = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>HR Ferretería — Herramientas & Soluciones</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;900&family=Barlow:wght@300;400;500&display=swap" rel="stylesheet">`;

if (s.includes(targetContent)) {
  s = s.replace(targetContent, replacementContent);
  fs.writeFileSync('hr-ferreteria-v2.html', s);
  console.log('Successfully replaced meta tags and google fonts!');
} else {
  console.log('Target content not found. Here is the first 7 lines:');
  console.log(targetContent);
}

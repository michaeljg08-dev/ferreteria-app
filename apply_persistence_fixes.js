const fs = require('fs');
const path = 'c:\\Users\\Usuario\\.gemini\\antigravity\\scratch\\ferreteria-app\\hr-ferreteria-v2.html';

let content = fs.readFileSync(path, 'utf8');

// 1. Add missing .modal CSS to hide it on load
const modalCss = `
  .modal {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.9);
    z-index: 3000;
    align-items: center;
    justify-content: center;
  }
  .modal.show { display: flex; }
`;

if (!content.includes('.modal {')) {
    // Inject before .login-modal
    content = content.replace('.login-modal {', modalCss + '\n  .login-modal {');
    console.log('Added .modal CSS');
}

// 2. Remove redundant "Acceso Administrativo" in footer
const redundantLinkRegex = /<br><a href="javascript:void\(0\)"\s+class="admin-trigger" onclick="toggleLogin\(true\)">\s+Acceso Administrativo<\/a>/;
if (redundantLinkRegex.test(content)) {
    content = content.replace(redundantLinkRegex, '');
    console.log('Removed redundant footer admin link');
}

// 3. Update saveCatalogConfig to use localStorage and trigger real sync
const oldSaveFunc = `function saveCatalogConfig() {
    const url = document.getElementById('dashSheetUrl').value;
    if (!url) return alert('Por favor ingresá la URL del Google Sheet');
    const dot = document.getElementById('sheetsDot');
    const txt = document.getElementById('sheetsStatusTxt');
    if(dot) dot.classList.add('loading');
    if(txt) txt.textContent = 'Sincronizando...';
    setTimeout(() => {
        if(dot) dot.classList.remove('loading');
        if(txt) txt.textContent = 'Catálogo conectado ✓';
        document.getElementById('syncDate').textContent = new Date().toLocaleString();
        document.getElementById('syncCount').textContent = allProductos.length;
        alert('Configuración guardada exitosamente');
    }, 2000);
}`;

const newSaveFunc = `function saveCatalogConfig() {
    const raw = document.getElementById('dashSheetUrl').value.trim();
    if (!raw) return alert('Por favor ingresá la URL del Google Sheet');
    
    // Guardar en localStorage
    localStorage.setItem('hr_sheet_url', raw);
    
    // Usar la lógica de conexión existente
    const idMatch = raw.match(/\\/d\\/([a-zA-Z0-9-_]+)/);
    let csvUrl = raw;
    if(idMatch){
        csvUrl = \`https://docs.google.com/spreadsheets/d/\${idMatch[1]}/export?format=csv&gid=0\`;
    }
    
    setStatus('loading','Sincronizando...');
    fetch(csvUrl)
        .then(r => r.text())
        .then(csv => {
            parsearCSV(csv);
            document.getElementById('syncDate').textContent = new Date().toLocaleString();
            document.getElementById('syncCount').textContent = allProductos.length;
            alert('Configuración guardada y sincronizada ✓');
        })
        .catch(err => {
            console.error(err);
            alert('Error al sincronizar. Verificá que la URL sea pública.');
        });
}`;

if (content.includes('function saveCatalogConfig()')) {
    content = content.replace(oldSaveFunc, newSaveFunc);
    console.log('Updated saveCatalogConfig with persistence');
}

// 4. Update initApp to load from localStorage
const oldInitFunc = `function initApp(){
  renderFiltros(allProductos);
  renderProductos();
  const dot = document.getElementById('sheetsDot');
  const txt = document.getElementById('sheetsStatusTxt');
  if(dot) dot.classList.remove('loading');
  if(txt) txt.textContent = 'Catálogo local';
  initSlider();
  initNav();
}`;

const newInitFunc = `function initApp(){
  const savedUrl = localStorage.getItem('hr_sheet_url');
  if (savedUrl) {
      document.getElementById('dashSheetUrl').value = savedUrl;
      // if we have a connectSheet elsewhere, we can reuse it or trigger sync
      const idMatch = savedUrl.match(/\\/d\\/([a-zA-Z0-9-_]+)/);
      let csvUrl = savedUrl;
      if(idMatch) csvUrl = \`https://docs.google.com/spreadsheets/d/\${idMatch[1]}/export?format=csv&gid=0\`;
      fetchSheetData(csvUrl);
  } else {
      renderFiltros(allProductos);
      renderProductos();
  }
  
  const dot = document.getElementById('sheetsDot');
  const txt = document.getElementById('sheetsStatusTxt');
  if(dot) dot.classList.remove('loading');
  if(txt) txt.textContent = savedUrl ? 'Catálogo en línea' : 'Catálogo local';
  
  initSlider();
  initNav();
}`;

if (content.includes('function initApp()')) {
    content = content.replace(oldInitFunc, newInitFunc);
    console.log('Updated initApp with persistence check');
}

fs.writeFileSync(path, content, 'utf8');
console.log('Final fixes applied successfully');

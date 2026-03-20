const fs = require('fs');

try {
  let content = fs.readFileSync('hr-ferreteria-v2.html', 'utf8');

  // 1. Insert CSS for .user-icon and .login-modal before the responsive media queries
  const cssSearch = "::-webkit-scrollbar-thumb:hover { background:var(--amarillo); }";
  const cssReplace = `::-webkit-scrollbar-thumb:hover { background:var(--amarillo); }

  .user-icon {
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.2s, filter 0.2s;
  }
  .user-icon:hover {
    transform: scale(1.1);
    filter: drop-shadow(0 0 5px var(--amarillo));
  }
  .login-modal {
    display: none;
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(5px);
    z-index: 2000;
    align-items: center;
    justify-content: center;
  }
  .login-modal.show { display: flex; }`;

  if (content.includes(cssSearch) && !content.includes('.login-modal { display: none')) {
    content = content.replace(cssSearch, cssReplace);
    console.log("CSS replaced successfully.");
  } else {
    console.log("CSS replacement not needed or target not found.");
  }

  // 2. Insert Navbar right after <body>
  const navSearch = "<body>\n\n<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   LOADER ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   -->";
  const navSearch2 = "<body>\r\n\r\n<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   LOADER ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   -->";

  const navReplace = `<body>

<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   NAVIGATION ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   -->
<nav>
  <a href="#" class="logo">
    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" class="logo-img" alt="Logo" onerror="this.style.display='none'">
    <span>HR Ferretería</span>
  </a>
  <ul class="nav-links">
    <li><a href="#hero">Inicio</a></li>
    <li><a href="#servicios">Servicios</a></li>
    <li><a href="#catalogo">Catálogo</a></li>
    <li><a href="#nosotros">Nosotros</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ul>
  <div style="display:flex; gap:1.5rem; align-items:center;">
    <div class="user-icon" onclick="toggleLogin(true)" title="Acceso Administrativo">👤</div>
    <a href="https://wa.me/50685841660" id="navWa" class="nav-cta">WhatsApp</a>
  </div>
</nav>

<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   LOADER ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   -->`;

  if (content.includes("<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   NAVIGATION") || content.includes('<ul class="nav-links">')) {
     console.log("Navbar already exists.");
  } else {
     if (content.includes(navSearch)) {
        content = content.replace(navSearch, navReplace);
        console.log("Navbar inserted successfully (LF).");
     } else if (content.includes(navSearch2)) {
        content = content.replace(navSearch2, navReplace.replace(/\\n/g, "\\r\\n"));
        console.log("Navbar inserted successfully (CRLF).");
     } else {
        console.log("Navbar insertion target not found.");
     }
  }


  // 3. Fix bottom of the file (truncate logic and rebuild)
  const truncateAnchor = "document.getElementById('sheetsConfig').classList.remove('show');";
  const index = content.indexOf(truncateAnchor);

  if (index !== -1) {
    const startOfAnchor = index + truncateAnchor.length;
    // Look for the next closing brace
    const endBraceIndex = content.indexOf('}', startOfAnchor);

    if (endBraceIndex !== -1) {
       // Keep up to the end brace
       let cleanContent = content.substring(0, endBraceIndex + 1);

       // Append DOMContentLoaded event listener, close script, add Modals, and close body/html
       cleanContent += `
  document.addEventListener('DOMContentLoaded', initApp);
</script>

  <!-- Modal Detalle -->
  <div id="prodModal" class="modal" onclick="if(event.target===this) closeModal()">
    <div class="modal-content">
      <div class="modal-close" onclick="closeModal()">✕</div>
      <div class="m-gallery" id="mGallery"></div>
      <div class="m-info">
        <div class="m-cat" id="mCat">Categoría</div>
        <h2 class="m-title" id="mTitle">Producto</h2>
        <div class="m-price" id="mPrice">₡ 0.00</div>
        <p class="m-desc" id="mDesc">Descripción...</p>
        <div class="m-actions">
          <a href="#" id="mWaBtn" target="_blank" class="m-btn-wa">💬 Consultar por WhatsApp</a>
        </div>
      </div>
    </div>
  </div>

  <!-- Sistema Admin -->
  <div id="loginModal" class="login-modal" onclick="if(event.target===this) toggleLogin(false)">
    <div class="login-box">
      <h3>Acceso Admin</h3>
      <div class="dash-input-group">
        <label>Usuario</label>
        <input type="text" id="adminUser" placeholder="admin">
      </div>
      <div class="dash-input-group">
        <label>Contraseña</label>
        <input type="password" id="adminPass" placeholder="•••••">
      </div>
      <button class="f-submit" onclick="doLogin()">Entrar al Panel</button>
    </div>
  </div>

  <div id="adminDash" class="admin-dash">
    <div class="dash-header">
      <div class="dash-title">Panel de Control <span>Administrativo</span></div>
      <div style="display:flex; gap:1rem; align-items:center;">
        <span id="adminSessionName" style="color:var(--gris-texto); font-size:0.8rem;">Admin @ HR</span>
        <button class="dash-close" onclick="closeDash()">Cerrar Panel</button>
      </div>
    </div>
    <div class="dash-grid">
      <!-- Columna 1: Catálogo -->
      <div class="dash-card">
        <h4>📦 Inventario & Catálogo</h4>
        <div class="dash-input-group">
          <label>URL de Google Sheets (CSV)</label>
          <input type="text" id="dashSheetUrl" class="sheets-input" placeholder="Pegá el link CSV aquí">
        </div>
        <button class="sheets-save-btn" onclick="saveCatalogConfig()">Guardar y Sincronizar</button>
        <p class="sheets-hint" style="margin-top:1rem">
          Última sincronización: <span id="syncDate">-</span><br>
          Productos activos: <span id="syncCount">0</span>
        </p>
      </div>

      <!-- Columna 2: Hero Slider -->
      <div class="dash-card">
        <h4>🖼️ Mantenimiento de Slides (Hero)</h4>
        <div id="dashSlidesList">
          <!-- Slides rendering here -->
        </div>
        <button class="btn-dash primary" style="width:100%; padding:0.8rem; margin-top:1rem;" onclick="openSlideEditor()">+ Agregar Nuevo Slide</button>
      </div>
    </div>
  </div>

  <!-- Editor de Slide (Sub-modal) -->
  <div id="slideEditor" class="login-modal" style="z-index:3000;">
    <div class="login-box" style="max-width:500px;">
        <h3 id="slideEditTitle">Editar Slide</h3>
        <div class="dash-input-group">
            <label>Título Principal</label>
            <input type="text" id="sTitle" placeholder="Ej: Herramientas Pro">
        </div>
        <div class="dash-input-group">
            <label>Subtítulo / Promo</label>
            <input type="text" id="sSub" placeholder="Ej: 20% de Descuento">
        </div>
        <div id="sBadges" style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; margin-bottom:1rem;">
             <div><label>Tag 1 (Emoji/Texto)</label><input type="text" id="sTag1"></div>
             <div><label>Tag 2 (Emoji/Texto)</label><input type="text" id="sTag2"></div>
        </div>
        <button class="f-submit" onclick="saveSlide()">Guardar Cambios</button>
        <button class="btn-dash" style="width:100%; margin-top:0.5rem;" onclick="closeSlideEditor()">Cancelar</button>
    </div>
  </div>

</body>
</html>
`;
       // write back
       fs.writeFileSync('hr-ferreteria-v2.html', cleanContent, 'utf8');
       console.log("Bottom text truncated and rebuilt successfully.");
    } else {
       console.log("End brace not found after truncation anchor.");
    }
  } else {
    console.log("Truncation anchor not found.");
  }


} catch(err) {
  console.error("Error modifying file:", err);
}

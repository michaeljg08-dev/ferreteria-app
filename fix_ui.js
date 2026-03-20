const fs = require('fs');

try {
    let content = fs.readFileSync('hr-ferreteria-v2.html', 'utf8');

    // 1. Reconstruct Hero Slides
    const slidesHTML = `
    <div class="slide slide-1 active">
      <div class="slide-content">
        <div class="slide-badge">Calidad Garantizada</div>
        <h1><span class="y">Materiales</span> <span class="o">de Construcción</span></h1>
        <p class="slide-desc">Todo para tus proyectos desde los cimientos hasta los acabados finales con la mejor calidad.</p>
        <div class="slide-btns">
            <a href="#catalogo" class="btn-p">Ver Materiales</a>
            <a href="#contacto" class="btn-s">Contáctanos</a>
        </div>
        <div class="slide-stats">
            <div class="stat"><div class="stat-n">20+</div><div class="stat-l">Años de Exp.</div></div>
            <div class="stat"><div class="stat-n">5k+</div><div class="stat-l">Productos</div></div>
        </div>
      </div>
      <div class="slide-visual">
          <div class="vis-box">
              <div class="vis-ring"></div><div class="vis-ring"></div><div class="vis-ring"></div>
              <div class="vis-icon">🏗️</div>
              <div class="vis-tag tr">Cemento & Varilla</div>
              <div class="vis-tag bl">Venta por Mayor</div>
          </div>
          <div class="ft ft1">🧱</div><div class="ft ft2">🏗️</div><div class="ft ft3">🏢</div><div class="ft ft4">⚒️</div>
      </div>
    </div>
    <div class="slide slide-2">
      <div class="slide-content">
        <div class="slide-badge">Potencia Máxima</div>
        <h1><span class="y">Herramientas</span> <span class="o">Profesionales</span></h1>
        <p class="slide-desc">Taladros, amoladoras y equipos de alto rendimiento para los trabajos más exigentes.</p>
        <div class="slide-btns">
            <a href="#catalogo" class="btn-p">Catálogo Eléctrico</a>
            <a href="#servicios" class="btn-s">Servicios</a>
        </div>
        <div class="slide-stats">
            <div class="stat"><div class="stat-n">100%</div><div class="stat-l">Garantizado</div></div>
            <div class="stat"><div class="stat-n">TOP</div><div class="stat-l">Marcas Elite</div></div>
        </div>
      </div>
      <div class="slide-visual">
          <div class="vis-box">
              <div class="vis-ring"></div><div class="vis-ring"></div><div class="vis-ring"></div>
              <div class="vis-icon">⚡</div>
              <div class="vis-tag tr">DeWalt • Makita</div>
              <div class="vis-tag bl">Servicio Técnico</div>
          </div>
          <div class="ft ft1">🔌</div><div class="ft ft2">⚙️</div><div class="ft ft3">🔩</div><div class="ft ft4">🪚</div>
      </div>
    </div>
    <div class="slide slide-3">
      <div class="slide-content">
        <div class="slide-badge">Diseño & Estilo</div>
        <h1><span class="y">Acabados</span> <span class="o">Toda la Vida</span></h1>
        <p class="slide-desc">Pinturas, barnices y accesorios para darle ese toque especial a cada espacio de tu hogar.</p>
        <div class="slide-btns">
            <a href="#catalogo" class="btn-p">Ver Pinturas</a>
            <a href="#nosotros" class="btn-s">Nosotros</a>
        </div>
        <div class="slide-stats">
            <div class="stat"><div class="stat-n">1k+</div><div class="stat-l">Colores</div></div>
            <div class="stat"><div class="stat-n">FREE</div><div class="stat-l">Asesoría</div></div>
        </div>
      </div>
      <div class="slide-visual">
          <div class="vis-box">
              <div class="vis-ring"></div><div class="vis-ring"></div><div class="vis-ring"></div>
              <div class="vis-icon">🎨</div>
              <div class="vis-tag tr">Mix de Color</div>
              <div class="vis-tag bl">Protección UV</div>
          </div>
          <div class="ft ft1">🖌️</div><div class="ft ft2">🏠</div><div class="ft ft3">✨</div><div class="ft ft4">🌿</div>
      </div>
    </div>
    `;

    content = content.replace('<div id="heroSlides" class="slides-container"></div>', `<div id="heroSlides" class="slides-container">${slidesHTML}</div>`);

    // 2. Fix Services (Wrap in servicios-grid)
    const servicesSearch = '<div class="srv-card">';
    const servicesHeader = `
<section id="servicios">
  <div class="section-label">Nuestras Áreas</div>
  <h2 class="section-title">Servicios <span class="o">Integrales</span></h2>
  <div class="servicios-grid">
`;
    // We need to find the start of the srv-cards and replace carefully.
    // They start after the slider controls.
    const sliderEndTag = '</div><!-- /slides-container -->';
    const splitContent = content.split(sliderEndTag);
    if (splitContent.length > 1) {
        let afterSlider = splitContent[1];
        // The srv-cards are inside the slider-controls block or right after?
        // Wait, I saw them at line 597. The slider controls end at 596.
        // Let's replace the whole section starting from where the srv-cards appear.
        
        let parts = afterSlider.split('<div class="srv-card">');
        let headerAndControls = parts[0];
        let cards = parts.slice(1).map(p => '<div class="srv-card">' + p);
        
        // The last card needs its closing section tag.
        // Looking at the code, I saw 6 cards.
        if (cards.length >= 6) {
           let lastCardPart = cards[cards.length - 1];
           // Find where the next section starts if any, or just close the grid.
           // In the original, the catalog starts after.
           cards[cards.length - 1] = lastCardPart.replace('</div>\n    <div id="catalogo"', '</div>\n  </div><!-- /servicios-grid -->\n</section>\n\n<section id="catalogo"');
           // Wait, I saw in line 582 that #hero starts. It should end before #servicios.
           
           content = splitContent[0] + sliderEndTag + 
                     '\n</section><!-- /hero -->\n\n' + 
                     servicesHeader + 
                     cards.join('\n') + 
                     splitContent[1].substring(afterSlider.indexOf('<div id="catalogo"'));
        }
    }

    // 3. Fix User Icon Visibility
    content = content.replace('.user-icon {', '.user-icon {\n    color: var(--amarillo);');

    fs.writeFileSync('hr-ferreteria-v2.html', content, 'utf8');
    console.log("Slider, Services and User Icon fixed successfully.");

} catch(err) {
    console.error("Error modifying file:", err);
}

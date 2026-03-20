import sys

filepath = r'c:\Users\Usuario\.gemini\antigravity\scratch\ferreteria-app\hr-ferreteria-v2.html'
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

if lines[118].strip() == '}':
    lines[118] = '\n'

new_html = """  </div>
  <div class="loader-pct">0%</div>
</div><!-- /loader -->

<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   NAV ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   -->
<nav>
  <div class="logo">
    <span style="font-family:'Barlow Condensed',sans-serif; font-weight: 900; font-size: 1.8rem; letter-spacing: 1px; color: var(--blanco);">HR <span style="color: var(--amarillo);">FERRETERÍA</span></span>
  </div>
  <ul class="nav-links">
    <li><a href="#hero">Inicio</a></li>
    <li><a href="#servicios">Servicios</a></li>
    <li><a href="#catalogo">Catálogo</a></li>
    <li><a href="#nosotros">Nosotros</a></li>
    <li><a href="#contacto">Sucursales</a></li>
  </ul>
  <div class="nav-actions">
    <a href="https://wa.me/50699999999" class="wa-nav" target="_blank"><i class="fa fa-whatsapp"></i> WhatsApp</a>
    <a href="#catalogo" class="nav-cta">Cotizar</a>
  </div>
</nav>

<!-- ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   HERO SLIDER ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═  ═   -->
<section id="hero">
  <div class="slides-container" id="slides-container">
    <!-- Se inyecta por JS -->
  </div>

  <div class="hero-nav">
    <div class="hero-dots slider-dots"></div>
    <div class="hero-counter slide-counter">
      <span class="curr">1</span>
      <div class="total">/ <strong>3</strong></div>
    </div>
  </div>
  
  <div class="slider-progress" style="position: absolute; bottom: 0; left: 0; height: 3px; background: rgba(255,255,255,0.1); width: 100%; z-index: 20;">
    <div class="slider-progress-bar" style="height: 100%; background: var(--amarillo); width: 0%;"></div>
  </div>
</section><!-- /hero -->
"""

new_lines = [line + '\n' for line in new_html.split('\n')]
lines[579:627] = new_lines

content = ''.join(lines)
content = content.replace('.h-dot', '.dot')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Done!')

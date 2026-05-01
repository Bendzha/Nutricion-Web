/* =============================================
   GABRIELA TOLEDO · NUTRICIONISTA
   JavaScript principal — script.js v2
   ============================================= */

/* --- Navbar: efecto scroll y menú móvil overlay --- */
(function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.querySelector('.nav-toggle');
  const overlay  = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-close');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  function abrirMenu() {
    toggle.classList.add('abierto');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('abierto');
    document.body.classList.add('menu-abierto');
  }

  function cerrarMenu() {
    toggle.classList.remove('abierto');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('abierto');
    document.body.classList.remove('menu-abierto');
  }

  if (toggle && overlay) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.classList.contains('abierto') ? cerrarMenu() : abrirMenu();
    });

    if (closeBtn) closeBtn.addEventListener('click', cerrarMenu);

    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', cerrarMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarMenu();
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) cerrarMenu();
    });
  }

  // Marcar enlace activo
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .overlay-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      link.classList.add('activo');
    }
  });
})();

/* --- Animaciones al hacer scroll --- */
(function initScrollAnimations() {
  const elementos = document.querySelectorAll('.animar');
  if (!elementos.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elementos.forEach(el => observer.observe(el));
})();

/* --- Contador animado --- */
(function initContadores() {
  const contadores = document.querySelectorAll('[data-count]');
  if (!contadores.length) return;
  const animarContador = (el) => {
    const objetivo = parseInt(el.getAttribute('data-count'), 10);
    const duracion = 1800;
    const inicio   = performance.now();
    const actualizar = (t) => {
      const ease = 1 - Math.pow(1 - Math.min((t - inicio) / duracion, 1), 3);
      el.textContent = Math.floor(ease * objetivo) + '+';
      if (ease < 1) requestAnimationFrame(actualizar);
      else el.textContent = objetivo + '+';
    };
    requestAnimationFrame(actualizar);
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animarContador(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  contadores.forEach(el => observer.observe(el));
})();

/* --- Formulario de contacto --- */
(function initFormulario() {
  const form = document.getElementById('formulario-contacto');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn   = form.querySelector('.btn-submit');
    const exito = document.getElementById('mensaje-exito');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    btn.disabled  = true;
    btn.style.opacity = '0.75';
    setTimeout(() => {
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Enviado!';
      btn.style.background = '#2D5016';
      if (exito) exito.style.display = 'block';
      setTimeout(() => {
        form.reset();
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensaje';
        btn.disabled  = false;
        btn.style.opacity = '';
        btn.style.background = '';
        if (exito) exito.style.display = 'none';
      }, 4000);
    }, 1500);
  });
  form.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('blur', () => {
      if (input.required && !input.value.trim()) input.style.borderColor = '#E57373';
      else input.style.borderColor = '';
    });
    input.addEventListener('input', () => {
      if (input.value.trim()) input.style.borderColor = '#7BAD52';
    });
  });
})();

/* --- Smooth scroll --- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
      }
    });
  });
})();

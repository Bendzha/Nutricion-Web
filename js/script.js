/* =============================================
   GABRIELA TOLEDO · NUTRICIONISTA
   JavaScript principal — script.js v3
   ============================================= */

/* --- Navbar: scroll + menú móvil overlay --- */
(function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.querySelector('.nav-toggle');
  const overlay  = document.querySelector('.nav-overlay');
  const closeBtn = document.querySelector('.nav-close');

  /* Efecto sombra al hacer scroll */
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Funciones abrir / cerrar ── */
  function abrirMenu() {
    overlay.classList.add('abierto');
    toggle.classList.add('abierto');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-abierto');
  }

  function cerrarMenu() {
    overlay.classList.remove('abierto');
    toggle.classList.remove('abierto');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-abierto');
  }

  /* ── Eventos ── */
  if (toggle && overlay) {

    /* Click en hamburguesa */
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      if (overlay.classList.contains('abierto')) {
        cerrarMenu();
      } else {
        abrirMenu();
      }
    });

    /* Botón X dentro del panel */
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        cerrarMenu();
      });
    }

    /* Click en cualquier enlace del overlay → cerrar y navegar */
    var overlayLinks = overlay.querySelectorAll('a');
    overlayLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        cerrarMenu();
      });
    });

    /* Click en el fondo oscuro (fuera del panel) */
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        cerrarMenu();
      }
    });

    /* Tecla Escape */
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && overlay.classList.contains('abierto')) {
        cerrarMenu();
      }
    });
  }

  /* Marcar enlace activo según página actual */
  var pagina = window.location.pathname.split('/').pop() || 'index.html';
  var todosLinks = document.querySelectorAll('.nav-links a, .overlay-links a');
  todosLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      link.classList.add('activo');
    }
  });

})();


/* --- Animaciones al hacer scroll --- */
(function initScrollAnimations() {
  var elementos = document.querySelectorAll('.animar');
  if (!elementos.length) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elementos.forEach(function(el) { observer.observe(el); });
})();


/* --- Contador animado --- */
(function initContadores() {
  var contadores = document.querySelectorAll('[data-count]');
  if (!contadores.length) return;

  function animarContador(el) {
    var objetivo = parseInt(el.getAttribute('data-count'), 10);
    var duracion = 1800;
    var inicio   = performance.now();

    function actualizar(t) {
      var progreso = Math.min((t - inicio) / duracion, 1);
      var ease     = 1 - Math.pow(1 - progreso, 3);
      el.textContent = Math.floor(ease * objetivo) + '+';
      if (progreso < 1) {
        requestAnimationFrame(actualizar);
      } else {
        el.textContent = objetivo + '+';
      }
    }
    requestAnimationFrame(actualizar);
  }

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animarContador(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  contadores.forEach(function(el) { observer.observe(el); });
})();


/* --- Formulario de contacto --- */
(function initFormulario() {
  var form = document.getElementById('formulario-contacto');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var btn   = form.querySelector('.btn-submit');
    var exito = document.getElementById('mensaje-exito');

    btn.innerHTML  = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';
    btn.disabled   = true;
    btn.style.opacity = '0.75';

    setTimeout(function() {
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> ¡Enviado!';
      btn.style.background = '#2D5016';
      if (exito) exito.style.display = 'block';

      setTimeout(function() {
        form.reset();
        btn.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar mensaje';
        btn.disabled  = false;
        btn.style.opacity  = '';
        btn.style.background = '';
        if (exito) exito.style.display = 'none';
      }, 4000);
    }, 1500);
  });

  form.querySelectorAll('input, textarea, select').forEach(function(input) {
    input.addEventListener('blur', function() {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#E57373';
      } else {
        input.style.borderColor = '';
      }
    });
    input.addEventListener('input', function() {
      if (input.value.trim()) input.style.borderColor = '#7BAD52';
    });
  });
})();


/* --- Smooth scroll para anclas internas --- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();

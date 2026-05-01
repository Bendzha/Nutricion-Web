/* =============================================
   GABRIELA TOLEDO · NUTRICIONISTA
   JavaScript principal — script.js
   ============================================= */

/* --- Navbar: efecto scroll y menú móvil --- */
(function initNavbar() {
  const navbar  = document.querySelector('.navbar');
  const toggle  = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Efecto sombra al hacer scroll
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // Toggle menú móvil
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const abierto = toggle.classList.toggle('abierto');
      navLinks.classList.toggle('abierto', abierto);
      document.body.style.overflow = abierto ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('abierto');
        navLinks.classList.remove('abierto');
        document.body.style.overflow = '';
      });
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        toggle.classList.remove('abierto');
        navLinks.classList.remove('abierto');
        document.body.style.overflow = '';
      }
    });
  }

  // Marcar enlace activo según la página actual
  const pagina = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === pagina || (pagina === '' && href === 'index.html')) {
      link.classList.add('activo');
    }
  });
})();

/* --- Animaciones al hacer scroll (Intersection Observer) --- */
(function initScrollAnimations() {
  const elementos = document.querySelectorAll('.animar');
  if (!elementos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animar solo una vez
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elementos.forEach(el => observer.observe(el));
})();

/* --- Contador animado (para indicadores del hero) --- */
(function initContadores() {
  const contadores = document.querySelectorAll('[data-count]');
  if (!contadores.length) return;

  const animarContador = (el) => {
    const objetivo = parseInt(el.getAttribute('data-count'), 10);
    const duracion = 1800;
    const inicio   = performance.now();

    const actualizar = (tiempoActual) => {
      const transcurrido = tiempoActual - inicio;
      const progreso     = Math.min(transcurrido / duracion, 1);
      // Easing: ease-out cuadrático
      const ease = 1 - Math.pow(1 - progreso, 3);
      el.textContent = Math.floor(ease * objetivo) + '+';
      if (progreso < 1) requestAnimationFrame(actualizar);
      else el.textContent = objetivo + '+';
    };

    requestAnimationFrame(actualizar);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animarContador(entry.target);
        observer.unobserve(entry.target);
      }
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

    const btn    = form.querySelector('.btn-submit');
    const exito  = document.getElementById('mensaje-exito');

    // Estado de carga
    btn.textContent = 'Enviando...';
    btn.disabled    = true;
    btn.style.opacity = '0.7';

    // Simular envío (en producción se reemplaza por fetch a un backend o FormSubmit)
    setTimeout(() => {
      btn.textContent = '¡Enviado!';
      btn.style.background = '#4A7C2F';

      if (exito) {
        exito.style.display = 'block';
        exito.style.animation = 'fadeInUp 0.5s ease';
      }

      // Resetear formulario
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Enviar mensaje';
        btn.disabled    = false;
        btn.style.opacity = '';
        if (exito) exito.style.display = 'none';
      }, 4000);
    }, 1500);
  });

  // Validación visual en tiempo real
  const inputs = form.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('blur', () => {
      if (input.required && !input.value.trim()) {
        input.style.borderColor = '#E57373';
      } else {
        input.style.borderColor = '';
      }
    });
    input.addEventListener('input', () => {
      if (input.value.trim()) {
        input.style.borderColor = '#7BAD52';
      }
    });
  });
})();

/* --- Smooth scroll para anclas internas --- */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
})();

/* --- Efecto parallax sutil en el hero --- */
(function initParallax() {
  const heroBefore = document.querySelector('.hero');
  if (!heroBefore) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const elemento = document.querySelector('.hero::before');
    // Parallax sutil en la imagen hero
    const heroImg = document.querySelector('.hero-imagen-marco');
    if (heroImg) {
      heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  }, { passive: true });
})();

/* --- Tooltips sencillos en tarjetas de servicio --- */
(function initHoverCards() {
  const cards = document.querySelectorAll('.servicio-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.willChange = 'transform';
    });
    card.addEventListener('mouseleave', function() {
      this.style.willChange = '';
    });
  });
})();

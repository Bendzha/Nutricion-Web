# Sitio Web — Gabriela Toledo · Nutricionista

## Estructura del proyecto

```
nutricionista/
├── index.html          → Página de inicio (Hero, Beneficios, Proceso, Testimonios)
├── sobre.html          → Sobre mí (Perfil, Formación, Experiencia, Filosofía)
├── servicios.html      → Servicios (6 tarjetas + FAQ)
├── contacto.html       → Contacto (Formulario + WhatsApp + Mapa)
├── css/
│   └── estilos.css     → Todos los estilos (variables, componentes, responsive)
├── js/
│   └── script.js       → Navbar, animaciones, contador, formulario
└── img/
    └── (carpeta para tus imágenes)
```

## Cómo usar

1. Abre `index.html` en tu navegador para ver el sitio completo.
2. Navega entre páginas usando el menú superior.

## Personalización

### Agregar fotos
- **Hero (Inicio):** Reemplaza el bloque `.hero-imagen-placeholder` por:
  ```html
  <img src="img/gabriela-hero.jpg" alt="Gabriela Toledo, Nutricionista" />
  ```
- **Sobre mí:** Reemplaza el bloque `.sobre-imagen-placeholder` por:
  ```html
  <img src="img/gabriela-sobre.jpg" alt="Gabriela Toledo" />
  ```

### Actualizar datos de contacto
Busca en todos los archivos HTML:
- `+56 9 1234 5678` → reemplazar con número real
- `gabriela@nutricionista.cl` → reemplazar con email real
- `56912345678` en los enlaces de WhatsApp → reemplazar con número real (sin espacios ni +)
- `Av. Providencia 1234, Of. 502` → reemplazar con dirección real

### Google Maps
En `contacto.html`, reemplaza el div del mapa placeholder por el iframe de Google Maps:
```html
<iframe
  src="https://www.google.com/maps/embed?pb=TU_URL"
  width="100%" height="320" style="border:0; border-radius:24px;"
  allowfullscreen="" loading="lazy">
</iframe>
```

### Formulario funcional
Para conectar el formulario a un backend real, en `js/script.js` reemplaza el `setTimeout` por un `fetch` a tu endpoint preferido (FormSubmit, Netlify Forms, EmailJS, etc.).

## Tecnologías usadas
- HTML5 semántico
- CSS3 (Flexbox, Grid, Variables, Animaciones)
- JavaScript vanilla (ES6+)
- Google Fonts: Playfair Display + DM Sans
- Font Awesome 6.5

## Paleta de colores
- Verde oscuro: `#2D5016`
- Verde medio: `#4A7C2F`
- Verde claro: `#7BAD52`
- Crema: `#FAF7F0`
- Tierra: `#8B6914`

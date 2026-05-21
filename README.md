# BarnaCloud — Landing

Landing page con secciones de precios, contacto y páginas legales.

## Cómo desplegar

### 1. Dominio
El dominio configurado es `https://www.barnacloud.com/`. Si cambia, actualiza:
- `index.html`: etiquetas `<link rel="canonical">`, `<meta property="og:url">`, `og:image`, JSON-LD y enlace de compartir.
- `robots.txt` y `sitemap.xml`.

### 2. Cookies / Analítica
Actualmente no hay analítica ni banner de cookies. El formulario de alta usa reCAPTCHA de Netlify/Google. Si activas Google Analytics (GA4) o Matomo:
- Añade el script de analítica en `index.html`.
- Declara las cookies usadas en `cookies.html` (nombre, proveedor, finalidad, duración).
- Ajusta la **Content Security Policy** en `_headers` para permitir conexiones a sus dominios.

### 3. Despliegue
Puedes usar:
- **Netlify**: sube el repo y detecta `index.html`. Usa `_headers` para cabeceras de seguridad.
- **Vercel**: sube repo y migra las cabeceras de `_headers` a `vercel.json`.
- **GitHub Pages**: sube a rama `gh-pages`.

### 4. Archivos incluidos
- `index.html` — landing principal.
- `/legal/aviso-legal.html`, `/legal/privacidad.html`, `/legal/cookies.html`.
- `/404.html` — página de error.
- `robots.txt` y `sitemap.xml` básicos.
- `_headers` — cabeceras CSP y seguridad para Netlify.
- `/assets/main.js` — JS compartido sin inline scripts.

### 5. TODO
- Sustituir datos fiscales pendientes (NIF/CIF, domicilio y teléfono legal si aplica).
- Personalizar OG image si se quiere una imagen social distinta al logo.
- Revisar precios/planes según negocio real.

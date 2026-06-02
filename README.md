# Backups Online Barcelona — Landing

Landing page con secciones de precios, contacto y páginas legales.

## Cómo desplegar

### 1. Dominio
De momento usa `backupsbarcelona.example`. Cuando tengas dominio propio cámbialo en:
- `index.html`: etiquetas `<link rel=\"canonical\">` y `<meta property=\"og:url\">`.
- `robots.txt` y `sitemap.xml`.

### 2. Cookies / Analítica
Actualmente solo se guarda `cookieConsent` en `localStorage` para el banner. Si activas Google Analytics (GA4) o Matomo:
- Añade el script de analítica en `index.html`.
- Declara las cookies usadas en `cookies.html` (nombre, proveedor, finalidad, duración).
- Ajusta la **Content Security Policy** en `netlify.toml` o `vercel.json` para permitir conexiones a sus dominios.

### 3. Despliegue
Puedes usar:
- **Netlify**: sube el repo y detecta `index.html`. Usa `netlify.toml` para redirecciones y cabeceras.
- **Vercel**: sube repo y añade `vercel.json` para cabeceras de seguridad.
- **GitHub Pages**: sube a rama `gh-pages`.

### 4. Archivos incluidos
- `index.html` — landing principal.
- `/legal/aviso-legal.html`, `/legal/privacidad.html`, `/legal/cookies.html`.
- `/404.html` — página de error.
- `robots.txt` y `sitemap.xml` básicos.
- `netlify.toml` y `vercel.json` con cabeceras CSP de ejemplo.

### 5. TODO
- Sustituir datos ficticios (NIF/CIF, emails, dominio real).
- Personalizar OG image (`/assets/og-cover.jpg`).
- Revisar precios/planes según negocio real.

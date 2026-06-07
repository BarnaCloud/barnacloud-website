# BarnaCloud Website

Web estática de BarnaCloud, orientada a presentar el servicio de nube privada y copias de seguridad para profesionales y pequeñas empresas en Barcelona.

El sitio no tiene proceso de build: usa HTML, CSS, JavaScript ligero y Tailwind CSS cargado desde CDN.

## Contenido principal

- `index.html`: landing principal con funcionalidades, precios, FAQ, información del servicio y contacto.
- `alta-clientes.html`: formulario de alta para la prueba gratuita de nube privada Sync de 200 GB.
- `area-clientes.html`: redirección al portal privado en `https://portal.barnacloud.com/`.
- `gracias.html`: página de confirmación tras enviar el formulario.
- `404.html`: página de error.
- `legal/aviso-legal.html`, `legal/privacidad.html`, `legal/cookies.html`: páginas legales.
- `assets/main.js`: navegación móvil, selector de planes, estado activo de navegación y banner de cookies.
- `assets/cookie-banner.css`: estilos del aviso de cookies.
- `logos/`: recursos gráficos de BarnaCloud.
- `robots.txt` y `sitemap.xml`: archivos SEO básicos.
- `_headers`: cabeceras de seguridad para Netlify.
- `update-web.sh`: helper para crear rama, commitear y subir cambios.

## Ver en local

Puedes abrir `index.html` directamente en el navegador, aunque es preferible servir la carpeta para probar rutas relativas, formularios y páginas legales:

```bash
python3 -m http.server 8080
```

Luego abre:

```text
http://localhost:8080
```

## Formularios

El alta de clientes está preparada para Netlify Forms:

- Formulario: `alta-clientes`
- Redirección tras envío: `/gracias.html`
- Protección antispam: honeypot y `data-netlify-recaptcha`.

El reCAPTCHA de Netlify se renderiza en producción cuando el sitio está desplegado en Netlify. En local puede no verse ni comportarse igual.

## Cookies y analítica

Actualmente el sitio muestra un banner de cookies y guarda la preferencia en `localStorage` con la clave `barnacloudCookieConsent`.

No hay analítica activa. Si se añade GA4, Matomo u otra herramienta:

- Añadir el script correspondiente en las páginas necesarias.
- Actualizar `legal/cookies.html` con nombre, proveedor, finalidad y duración de cada cookie.
- Revisar `legal/privacidad.html` si cambia el tratamiento de datos.
- Actualizar `_headers` si la herramienta necesita dominios externos adicionales.

## Dominio y SEO

El dominio canónico configurado es:

```text
https://barnacloud.com/
```

Si cambia el dominio, revisar:

- `index.html`: canonical, `og:url`, `og:image` y JSON-LD.
- `robots.txt`.
- `sitemap.xml`.
- Enlaces absolutos que apunten a `barnacloud.com`.

## Despliegue

### Netlify

Opción recomendada para este proyecto.

1. Conectar el repositorio.
2. Publicar la raíz del proyecto.
3. Dejar el comando de build vacío.
4. Confirmar que Netlify detecta el formulario `alta-clientes`.
5. Revisar que `_headers` se aplica correctamente.

### Vercel

También puede desplegarse como sitio estático, pero las cabeceras de `_headers` deben migrarse a `vercel.json` y los formularios de Netlify no funcionarán sin cambiar la integración.

### GitHub Pages

Puede servir la web estática, pero no soporta Netlify Forms ni `_headers`.

## Flujo de cambios

El script `update-web.sh` crea una rama, añade todos los cambios, hace commit y sube la rama al remoto:

```bash
./update-web.sh
```

Antes de usarlo, revisa siempre el estado del repo:

```bash
git status --short
```

## Checklist antes de publicar

- Revisar textos, precios y planes activos.
- Comprobar enlaces de navegación en desktop y móvil.
- Probar envío del formulario en Netlify.
- Validar páginas legales y datos fiscales.
- Revisar `robots.txt` y `sitemap.xml`.
- Probar la página `404.html`.
- Confirmar que logos e imagen Open Graph cargan correctamente.

## Pendiente

- Sustituir o completar datos fiscales definitivos en páginas legales.
- Decidir si las páginas legales deben pasar de `noindex` a `index` cuando estén completas.
- Crear una imagen social específica si se quiere algo distinto al logo.
- Mantener el enlace del área de clientes apuntando al portal privado de producción.

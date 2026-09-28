# Eligreg López - Portfolio & Blog

Sitio personal con diseño tipo "magazine cover" y blog en Markdown. Hecho con Angular 18 y desplegado en Vercel.

## Desarrollo local

```bash
npm install
npm start          # http://localhost:4200
npm run build      # genera dist/eligreg-portfolio/browser
```

## Estructura

```
/
├── public/                 # Se copia tal cual al build
│   ├── images/
│   └── posts/
│       ├── posts.json      # Índice de posts
│       └── *.md            # Un archivo por post
├── src/
│   ├── index.html          # Incluye la etiqueta de GA4
│   ├── styles.css          # Estilos globales
│   └── app/
│       ├── app.routes.ts   # Rutas
│       ├── components/     # nav, footer
│       ├── pages/          # home, sobre-mi, trabajo, blog, post
│       ├── services/       # blog.service.ts: lee posts.json y los .md
│       └── models/
├── angular.json
└── vercel.json
```

## Rutas

| Ruta               | Página          |
|--------------------|-----------------|
| `/`                | Portada         |
| `/sobre-mi`        | Sobre mí        |
| `/trabajo`         | Portafolio      |
| `/escritura`       | Lista de posts  |
| `/escritura/:slug` | Post individual |

Cualquier otra ruta redirige a `/`.

## Cómo publicar un post

1. Crea `public/posts/<slug>.md`.
2. Agrega la entrada en `public/posts/posts.json`:

   ```json
   {
     "slug": "<slug>",
     "title": "Título del post",
     "date": "2026-09-28",
     "summary": "Resumen breve",
     "image": ""
   }
   ```

3. Haz commit y push a `master`. Vercel despliega solo.

No hay que tocar nada más: antes de cada build, `scripts/generar-rutas.mjs` lee `posts.json`, agrega el post a la lista de páginas que se prerenderizan y actualiza `sitemap.xml`.

El blog ordena los posts por `date`, del más reciente al más antiguo. El `slug` tiene que coincidir con el nombre del archivo, sin `.md`.

### Formato del Markdown

El Markdown se renderiza con [marked](https://marked.js.org/). El post empieza con la introducción, sin encabezado: el título sale de `posts.json`.

```markdown
Tu intro va aquí.

## Sección

Texto con **negritas**, *cursivas* y [enlaces](https://ejemplo.com).

> Cita
```

## Imágenes

Van en `public/images/` y se referencian como `images/archivo.jpg`. Redimensiona antes de subirlas: 2400 px en el lado largo alcanza para una imagen a pantalla completa.

## Prerender y SEO

`npm run build` genera un HTML estático por ruta (`/`, `/sobre-mi`, `/trabajo`, `/escritura` y cada post). Así Google, LinkedIn y WhatsApp leen el texto y las etiquetas sin ejecutar JavaScript. En el navegador, Angular hidrata ese HTML y sigue funcionando como SPA.

- `src/main.server.ts` y `src/app/app.config.server.ts`: configuración del prerender.
- `src/app/services/blog.service.server.ts`: durante el build lee los posts desde `public/posts` en disco.
- `src/app/services/seo.service.ts`: escribe título, descripción, URL canónica y etiquetas Open Graph.
- Los textos de SEO de las páginas fijas están en `src/app/app.routes.ts`. Los de cada post salen de `posts.json` (`title` y `summary`).

## Analítica

GA4 (`G-M1RMBY9PDW`) se carga en `src/index.html`. `app.component.ts` envía un `page_path` en cada cambio de ruta.

## Deployment

Vercel usa `vercel.json`:

- Build: `npm run build`
- Output: `dist/eligreg-portfolio/browser`
- Todas las rutas se reescriben a `index.html` para que el router de Angular las resuelva.

## Contacto

Eligreg López
- Email: eligregl@gmail.com
- LinkedIn: linkedin.com/in/eligreglopez/
- GitHub: github.com/eligregl

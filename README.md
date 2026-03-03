# Eligreg López - Portfolio & Blog

Sitio web personal con diseño tipo "magazine cover" y sistema de blog en Markdown.

## Estructura de archivos

```
/
├── index.html          # Página principal
├── blog.html           # Lista de posts
├── post.html           # Vista individual de posts
├── sobre-mi.html       # Sobre mí
├── trabajo.html        # Portfolio
├── styles.css          # Estilos globales
├── add-post.sh         # Script para agregar posts
├── js/
│   └── blog.js         # Sistema de blog
└── blog/
    ├── posts.json      # Índice de posts
    └── posts/
        ├── piromanos.md
        ├── trabajo-freelance.md
        └── causa-scribendi.md
```

## Cómo agregar un nuevo post

### Método 1: Usar el script (recomendado)

```bash
./add-post.sh nombre-post "Título del Post" "Resumen breve"
```

Esto:
1. Crea el archivo `blog/posts/nombre-post.md`
2. Lo agrega al índice en `blog/posts.json`
3. Te muestra la URL del post

### Método 2: Manual

1. Crea un archivo `.md` en `blog/posts/`
2. Escribe tu contenido en Markdown
3. Agrega una entrada en `blog/posts.json`:

```json
{
  "slug": "nombre-post",
  "title": "Título del Post",
  "date": "2024-11-20",
  "summary": "Resumen breve del post",
  "image": ""
}
```

## Formato de posts

Los posts usan Markdown básico:

```markdown
Tu intro va aquí sin ningún header.

## Sección principal

Párrafo con texto. Puedes usar **negritas**, *cursivas*, y [enlaces](https://ejemplo.com).

### Subsección

* Lista de elementos
* Otro elemento

> Cita en blockquote

## Otra sección

Más contenido...
```

## Deployment

### GitHub Pages

1. Sube todos los archivos a tu repositorio
2. Activa GitHub Pages en Settings
3. Listo

### Netlify

1. Arrastra la carpeta completa a Netlify
2. Configura:
   - Build command: (vacío)
   - Publish directory: `/`
3. Listo

### Hosting tradicional

1. Sube todos los archivos vía FTP
2. Asegúrate de mantener la estructura de carpetas
3. Verifica que `blog/posts.json` y los `.md` estén accesibles

## Consideraciones importantes

### Encoding

Todos los archivos HTML deben tener:
```html
<meta charset="UTF-8">
```

Los archivos deben guardarse en UTF-8 (sin BOM).

### Rutas

El sistema usa rutas relativas. Si tu sitio NO está en el root del dominio (ej: `usuario.github.io/portfolio/`), ajusta las rutas en:
- `blog.js` (líneas 52-53)
- Links en los HTML

### Browser local

Para probar localmente, necesitas un servidor HTTP simple:

```bash
# Python 3
python3 -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

NO funciona abriendo los archivos directamente en el navegador (las rutas relativas fallan).

## Personalización

### Colores

Edita las variables CSS en `styles.css` (líneas 15-24):

```css
--color-primary: #00d9ff;      /* Cyan neón */
--color-secondary: #ff006e;    /* Rosa neón */
--color-accent: #8b5cf6;       /* Morado */
```

### Tipografía

Cambia las fuentes en `styles.css` (líneas 26-29):

```css
--font-serif: 'Lora', serif;
--font-sans: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

### Layout del magazine cover

Los elementos de la portada se posicionan en `index.html` con estilos inline (líneas 40-95). Ajusta las posiciones modificando los valores de `top`, `bottom`, `left`, `right`.

## Solución de problemas

**Los acentos se ven mal:**
- Verifica que todos los archivos estén en UTF-8
- Asegúrate de tener `<meta charset="UTF-8">` en todos los HTML

**Los posts no cargan:**
- Verifica que `blog/posts.json` sea válido (usa un validador JSON)
- Confirma que los archivos `.md` existan en `blog/posts/`
- Revisa la consola del navegador para errores

**El CSS no se aplica:**
- Verifica la ruta relativa en el `<link>` del HTML
- Limpia el caché del navegador

**El blog.js no funciona:**
- Abre la consola del navegador (F12)
- Verifica errores de carga o sintaxis
- Confirma que las rutas a `posts.json` y los `.md` sean correctas

## Contacto

Eligreg López
- Email: eligregl@gmail.com
- LinkedIn: linkedin.com/in/eligreglopez/
- GitHub: github.com/eligregl

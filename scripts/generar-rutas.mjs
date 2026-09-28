// Se ejecuta solo antes de cada build (npm run build -> prebuild).
// Lee public/posts/posts.json y genera:
//   - routes.txt: las páginas que Angular convierte en HTML estático.
//   - public/sitemap.xml: el mapa del sitio para Google.
// No hay que editar nada aquí para publicar un post nuevo.
import { readFileSync, writeFileSync } from 'node:fs';

const SITIO = 'https://eligreg.com';
const fijas = ['/', '/sobre-mi', '/trabajo', '/escritura'];

const posts = JSON.parse(readFileSync('public/posts/posts.json', 'utf-8'));
const rutasPosts = posts.map(p => `/escritura/${p.slug}`);
const rutas = [...fijas, ...rutasPosts];

writeFileSync('routes.txt', rutas.join('\n') + '\n');

const hoy = new Date().toISOString().slice(0, 10);
const fechaDe = ruta => posts.find(p => `/escritura/${p.slug}` === ruta)?.date ?? hoy;
const urls = rutas.map(ruta => [
  '  <url>',
  `    <loc>${SITIO}${ruta === '/' ? '' : ruta}</loc>`,
  `    <lastmod>${fechaDe(ruta)}</lastmod>`,
  '  </url>',
].join('\n'));

writeFileSync('public/sitemap.xml', [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  '</urlset>',
  '',
].join('\n'));

console.log(`Prerender: ${rutas.length} rutas (${rutasPosts.length} posts).`);

import { Routes } from '@angular/router';
import { DatosSeo } from './services/seo.service';

/**
 * Título y descripción de cada página fija. Son los textos que aparecen
 * en Google y en la vista previa al compartir un enlace. Los posts toman
 * los suyos de public/posts/posts.json.
 */
const seo: Record<string, DatosSeo> = {
  inicio: {
    titulo: 'Eligreg López — Consultoría, talleres y escritura',
    descripcion: 'Estudié literatura en Maracaibo cuando todavía era posible. Hoy ayudo a equipos de tecnología a escribir para personas y máquinas sin perder el criterio.',
    ruta: '/',
  },
  sobreMi: {
    titulo: 'Sobre mí',
    descripcion: 'Venezolana en Medellín. Estudié Letras y Lingüística en Maracaibo, documenté software en Globant y Wizeline, y hoy asesoro, doy talleres y escribo ensayos.',
    ruta: '/sobre-mi',
  },
  trabajo: {
    titulo: 'Trabajo',
    descripcion: 'Consultoría en documentación y contenido para lectores humanos y sistemas de IA, y talleres para equipos de tecnología que usan IA sin perder profundidad de análisis.',
    ruta: '/trabajo',
  },
  escritura: {
    titulo: 'Escritura',
    descripcion: 'Ensayos sobre datos, poder, autoritarismo y lenguaje, escritos desde la diáspora venezolana.',
    ruta: '/escritura',
  },
};


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    data: { seo: seo['inicio'] },
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'sobre-mi',
    data: { seo: seo['sobreMi'] },
    loadComponent: () =>
      import('./pages/sobre-mi/sobre-mi.component').then(m => m.SobreMiComponent),
  },
  {
    path: 'trabajo',
    data: { seo: seo['trabajo'] },
    loadComponent: () =>
      import('./pages/trabajo/trabajo.component').then(m => m.TrabajoComponent),
  },
  {
    path: 'escritura',
    data: { seo: seo['escritura'] },
    loadComponent: () =>
      import('./pages/blog/blog.component').then(m => m.BlogComponent),
  },
  {
    path: 'escritura/:slug',
    loadComponent: () =>
      import('./pages/post/post.component').then(m => m.PostComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

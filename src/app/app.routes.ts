import { Routes } from '@angular/router';
import { DatosSeo } from './services/seo.service';

/**
 * Título y descripción de cada página fija. Son los textos que aparecen
 * en Google y en la vista previa al compartir un enlace. Los posts toman
 * los suyos de public/posts/posts.json.
 */
const seo: Record<string, DatosSeo> = {
  inicio: {
    titulo: 'Eligreg López — Technical Writer & Escritora',
    descripcion: 'Estudié literatura cuando Venezuela aún respiraba. Ahora documento APIs en Medellín. Entre ambos mundos: el código que funciona y las palabras que significan.',
    ruta: '/',
  },
  sobreMi: {
    titulo: 'Sobre mí',
    descripcion: 'Venezolana en Medellín. Estudié Letras y Lingüística en Maracaibo, aprendí desarrollo web para sobrevivir y hoy escribo documentación técnica y ensayos.',
    ruta: '/sobre-mi',
  },
  trabajo: {
    titulo: 'Trabajo',
    descripcion: 'Documentación técnica, contenido web y desarrollo: proyectos para Código Facilito, Clearfork Academy y Mañana El Espacio.',
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

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'sobre-mi',
    loadComponent: () =>
      import('./pages/sobre-mi/sobre-mi.component').then(m => m.SobreMiComponent),
  },
  {
    path: 'trabajo',
    loadComponent: () =>
      import('./pages/trabajo/trabajo.component').then(m => m.TrabajoComponent),
  },
  {
    path: 'escritura',
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

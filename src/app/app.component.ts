import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { SeoService, DatosSeo } from './services/seo.service';
import { filter } from 'rxjs/operators';

declare const gtag: Function;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavComponent, FooterComponent],
  template: `
    <app-nav />
    <router-outlet />
    <app-footer />
  `,
  styles: []
})
export class AppComponent {
  constructor() {
    const router = inject(Router);
    const route = inject(ActivatedRoute);
    const seo = inject(SeoService);
    const enNavegador = isPlatformBrowser(inject(PLATFORM_ID));

    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      // Metadatos de las páginas fijas. Los posts escriben los suyos.
      let actual = route.snapshot;
      while (actual.firstChild) actual = actual.firstChild;
      const datos = actual.data['seo'] as DatosSeo | undefined;
      if (datos) seo.actualizar(datos);

      // GA4 solo existe en el navegador, no durante el prerender.
      if (enNavegador && typeof gtag === 'function') {
        gtag('config', 'G-M1RMBY9PDW', { page_path: e.urlAfterRedirects });
      }
    });
  }
}

import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
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
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe((e: NavigationEnd) => {
      gtag('config', 'G-M1RMBY9PDW', { page_path: e.urlAfterRedirects });
    });
  }
}

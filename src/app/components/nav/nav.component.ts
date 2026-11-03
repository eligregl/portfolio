import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-nav',
    imports: [RouterLink, RouterLinkActive],
    template: `
    <nav class="magazine-nav-minimal">
      <a routerLink="/" routerLinkActive="nav-active" [routerLinkActiveOptions]="{ exact: true }">inicio</a>
      <a routerLink="/sobre-mi" routerLinkActive="nav-active">sobre mí</a>
      <a routerLink="/trabajo" routerLinkActive="nav-active">trabajo</a>
      <a routerLink="/talleres" routerLinkActive="nav-active">talleres</a>
      <a routerLink="/escritura" routerLinkActive="nav-active">escritura</a>
    </nav>
  `,
    changeDetection: ChangeDetectionStrategy.Eager,
    styles: [`
    .magazine-nav-minimal {
      position: fixed;
      top: var(--space-sm);
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: var(--space-md);
      z-index: 100;
      background: rgba(26, 26, 46, 0.7);
      padding: var(--space-xs) var(--space-md);
      backdrop-filter: blur(10px);
    }

    .magazine-nav-minimal a {
      font-family: var(--font-mono);
      font-size: 0.75rem;
      color: var(--color-text-light);
      text-transform: lowercase;
      letter-spacing: 0.1em;
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: var(--transition);
    }

    .magazine-nav-minimal a:hover,
    .magazine-nav-minimal a.nav-active {
      color: var(--color-primary);
      border-bottom-color: var(--color-primary);
    }

    @media (max-width: 600px) {
      .magazine-nav-minimal {
        position: relative;
        top: auto;
        left: auto;
        transform: none;
        width: 100%;
        justify-content: center;
        flex-wrap: wrap;
        gap: var(--space-xs) var(--space-sm);
      }

      .magazine-nav-minimal a {
        white-space: nowrap;
      }
    }
  `]
})
export class NavComponent {}

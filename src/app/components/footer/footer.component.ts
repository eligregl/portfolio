import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <h3>Conéctate</h3>
      <div class="social-links">
        <a href="https://www.linkedin.com/in/eligreglopez/" target="_blank" rel="noopener">
          <span>→</span> LinkedIn
        </a>
        <a href="https://github.com/eligregl" target="_blank" rel="noopener">
          <span>→</span> GitHub
        </a>
        <a href="https://twitter.com/Eligregl" target="_blank" rel="noopener">
          <span>→</span> Twitter
        </a>
      </div>
    </footer>
  `
})
export class FooterComponent {}

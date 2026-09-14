import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface RedesSociales {
  facebook: string;
  instagram: string;
  x: string;
}

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="py-10 px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-line">
      <p class="text-muted text-sm">© 2026 Movimiento. Todos los derechos reservados.</p>
      <div class="flex gap-4" *ngIf="redes">
        <a
          *ngIf="redes.facebook"
          [href]="redes.facebook"
          target="_blank"
          rel="noopener"
          aria-label="Facebook del movimiento"
          class="w-9 h-9 flex items-center justify-center rounded-full text-muted border border-line hover:text-white hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94Z"/></svg>
        </a>
        <a
          *ngIf="redes.instagram"
          [href]="redes.instagram"
          target="_blank"
          rel="noopener"
          aria-label="Instagram del movimiento"
          class="w-9 h-9 flex items-center justify-center rounded-full text-muted border border-line hover:text-white hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.5"/><circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none"/></svg>
        </a>
        <a
          *ngIf="redes.x"
          [href]="redes.x"
          target="_blank"
          rel="noopener"
          aria-label="X del movimiento"
          class="w-9 h-9 flex items-center justify-center rounded-full text-muted border border-line hover:text-white hover:bg-accent hover:border-accent hover:scale-110 transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8.1-9.3L1 2h7.2l5 6.6L18.9 2Zm-1.2 18h1.7L7.4 4H5.6l12.1 16Z"/></svg>
        </a>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  @Input() redes: RedesSociales | null = null;
}

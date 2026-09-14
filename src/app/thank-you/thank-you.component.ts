import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FirmasService } from '../shared/services/firmas.service';
import { ContenidoService } from '../shared/services/contenido.service';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, SiteFooterComponent, FondoPublicoComponent],
  templateUrl: './thank-you.component.html',
})
export class ThankYouComponent {
  private firmasService = inject(FirmasService);
  private contenidoService = inject(ContenidoService);
  totalFirmas$ = this.firmasService.contarFirmas();
  contenido$ = this.contenidoService.contenidoPublico$;
}

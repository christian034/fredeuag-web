import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContenidoService } from '../shared/services/contenido.service';
import { SiteNavComponent } from '../shared/site-nav.component';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';

@Component({
  selector: 'app-noticias',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, SiteNavComponent, SiteFooterComponent, FondoPublicoComponent],
  templateUrl: './noticias.component.html',
})
export class NoticiasComponent {
  private contenidoService = inject(ContenidoService);
  contenido$ = this.contenidoService.contenidoPublico$;
}

import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ContenidoService } from '../shared/services/contenido.service';
import { SiteNavComponent } from '../shared/site-nav.component';
import { TemaService } from '../shared/services/tema.service';
import { PuntosConectadosComponent } from '../shared/puntos-conectados/puntos-conectados.component';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, AsyncPipe, SiteNavComponent, PuntosConectadosComponent],
  templateUrl: './contacto.component.html',
})
export class ContactoComponent {
  private contenidoService = inject(ContenidoService);
  contenido$ = this.contenidoService.contenido$;
  tema = inject(TemaService);
}

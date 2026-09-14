import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { SeccionesService, tipoEfectivo } from '../shared/services/secciones.service';
import { ContenidoService } from '../shared/services/contenido.service';
import { SiteNavComponent } from '../shared/site-nav.component';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { EncuestaPublicaComponent } from '../shared/encuesta-publica/encuesta-publica.component';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';

@Component({
  selector: 'app-encuestas',
  standalone: true,
  imports: [CommonModule, AsyncPipe, SiteNavComponent, SiteFooterComponent, EncuestaPublicaComponent, FondoPublicoComponent],
  templateUrl: './encuestas.component.html',
})
export class EncuestasComponent {
  private seccionesService = inject(SeccionesService);
  private contenidoService = inject(ContenidoService);

  contenido$ = this.contenidoService.contenidoPublico$;

  encuestas$ = this.seccionesService.seccionesPublicas$.pipe(
    map((secciones) => secciones.filter((s) => tipoEfectivo(s) === 'encuesta'))
  );
}

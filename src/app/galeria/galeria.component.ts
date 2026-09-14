import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { map } from 'rxjs/operators';
import { ContenidoService, FotoGaleria } from '../shared/services/contenido.service';
import { SiteNavComponent } from '../shared/site-nav.component';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { TemaService } from '../shared/services/tema.service';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';

@Component({
  selector: 'app-galeria',
  standalone: true,
  imports: [CommonModule, AsyncPipe, SiteNavComponent, SiteFooterComponent, FondoPublicoComponent],
  templateUrl: './galeria.component.html',
})
export class GaleriaComponent {
  private contenidoService = inject(ContenidoService);
  contenido$ = this.contenidoService.contenidoPublico$;
  tema = inject(TemaService);

  /**
   * Todo calculado en un solo flujo, a partir del mismo arreglo — así la foto
   * destacada, el resto de la cuadrícula, y la lista completa (para el
   * lightbox) siempre comparten exactamente los mismos objetos. Si se
   * calculan por separado (varias subscripciones distintas), Firestore puede
   * entregar copias distintas con los mismos datos, y comparar por
   * referencia (===) falla en silencio — eso causaba que el lightbox nunca
   * se abriera.
   */
  vista$ = this.contenido$.pipe(
    map((c) => {
      const destacada = c.galeria.find((f) => f.destacada) ?? c.galeria[0] ?? null;
      const resto = c.galeria.filter((f) => f !== destacada);
      const todas = destacada ? [destacada, ...resto] : resto;
      return { destacada, resto, todas, hayFotos: c.galeria.length > 0 };
    })
  );

  indiceAbierto: number | null = null;

  abrirLightbox(todas: FotoGaleria[], foto: FotoGaleria): void {
    this.indiceAbierto = todas.indexOf(foto);
  }

  cerrarLightbox(): void {
    this.indiceAbierto = null;
  }

  siguiente(todas: FotoGaleria[]): void {
    if (this.indiceAbierto === null) return;
    this.indiceAbierto = (this.indiceAbierto + 1) % todas.length;
  }

  anterior(todas: FotoGaleria[]): void {
    if (this.indiceAbierto === null) return;
    this.indiceAbierto = (this.indiceAbierto - 1 + todas.length) % todas.length;
  }
}

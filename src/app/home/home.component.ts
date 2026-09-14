import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContenidoService } from '../shared/services/contenido.service';
import { SeccionesService, SeccionPagina, tipoEfectivo } from '../shared/services/secciones.service';
import { SiteNavComponent } from '../shared/site-nav.component';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { PortadaFredeuagComponent } from '../shared/portada-fredeuag/portada-fredeuag.component';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';
import { RevelarAlScrollDirective } from '../shared/directivas/revelar-al-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, AsyncPipe, RouterLink, SiteNavComponent, SiteFooterComponent,
    PortadaFredeuagComponent, FondoPublicoComponent, RevelarAlScrollDirective,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  private contenidoService = inject(ContenidoService);
  private seccionesService = inject(SeccionesService);
  contenido$ = this.contenidoService.contenidoPublico$;
  noticiasCarrusel$ = this.contenidoService.noticiasParaCarrusel$;

  /** Solo las secciones informativas — las encuestas viven en su propia página (/encuestas). */
  seccionesInformativas$ = this.seccionesService.seccionesPublicas$.pipe(
    map((secciones) => secciones.filter((s) => tipoEfectivo(s) === 'informativa'))
  );

  indiceActual = 0;
  private totalNoticias = 0;
  private intervalId?: ReturnType<typeof setInterval>;
  private suscripcion?: Subscription;

  ngOnInit(): void {
    this.suscripcion = this.noticiasCarrusel$.subscribe((noticias) => {
      this.totalNoticias = noticias.length;
    });
    this.intervalId = setInterval(() => this.siguiente(), 6000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
    this.suscripcion?.unsubscribe();
  }

  siguiente(): void {
    if (!this.totalNoticias) return;
    this.indiceActual = (this.indiceActual + 1) % this.totalNoticias;
  }

  anterior(): void {
    if (!this.totalNoticias) return;
    this.indiceActual = (this.indiceActual - 1 + this.totalNoticias) % this.totalNoticias;
  }

  irA(indice: number): void {
    this.indiceActual = indice;
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemaService } from '../services/tema.service';
import { PuntosConectadosComponent } from '../puntos-conectados/puntos-conectados.component';

/**
 * Fondo estándar para las páginas públicas: degradado de marca (azul marino
 * en oscuro, claro en claro) + la constelación de puntos conectados. Se
 * coloca como primer elemento dentro de un contenedor con
 * `position: relative` (y suficiente altura) y cubre todo ese contenedor.
 *
 * Uso: <app-fondo-publico></app-fondo-publico>
 */
@Component({
  selector: 'app-fondo-publico',
  standalone: true,
  imports: [CommonModule, PuntosConectadosComponent],
  template: `
    <div
      class="absolute inset-0 pointer-events-none -z-10"
      [style.background]="tema.oscuroActivo()
        ? 'linear-gradient(135deg, #0d0d2e 0%, #161642 55%, #202054 100%)'
        : 'linear-gradient(135deg, #eef0f5 0%, #f8f9fb 55%, #eef0f5 100%)'"
    ></div>
    <app-puntos-conectados></app-puntos-conectados>
  `,
})
export class FondoPublicoComponent {
  tema = inject(TemaService);
}

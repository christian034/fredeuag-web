import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemaService } from '../services/tema.service';

/**
 * Portada (primera sección de Inicio, antes del carrusel). Todo lo
 * decorativo vive aquí adentro:
 * - Degradado de fondo (según tema).
 * - Franjas rojas diagonales en las esquinas — hechas con SVG (líneas +
 *   recorte triangular), no con imágenes ni con degradados CSS, para que la
 *   dirección y el color queden exactos y no dependan de assets.
 * - Textura de puntos, oculta por defecto — aparece en gris al pasar el
 *   cursor sobre la sección, igual en ambos temas.
 * - Efecto de aparición al cargar la página.
 */
@Component({
  selector: 'app-portada-fredeuag',
  standalone: true,
  imports: [CommonModule],
  styles: [`
    @keyframes aparecer {
      from { opacity: 0; transform: translateY(2rem); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-aparecer {
      animation: aparecer 1s ease-out both;
    }
  `],
  template: `
    <section
      class="relative overflow-hidden"
      (mousemove)="onMouseMove($event)"
      (mouseleave)="onMouseLeave()"
    >
      <!-- Degradado de fondo -->
      <div
        class="absolute inset-0"
        [style.background]="tema.oscuroActivo()
          ? 'linear-gradient(135deg, #0d0d2e 0%, #161642 55%, #202054 100%)'
          : 'linear-gradient(135deg, #eef0f5 0%, #f8f9fb 55%, #eef0f5 100%)'"
      ></div>

      <!-- Textura de puntos: un "foco" gris que sigue al cursor -->
      <div
        class="absolute inset-0 transition-opacity duration-300"
        [style.opacity]="mostrarPuntos ? 1 : 0"
        [style.mask-image]="'radial-gradient(circle 160px at ' + mouseX + 'px ' + mouseY + 'px, black, transparent)'"
        [style.-webkit-mask-image]="'radial-gradient(circle 160px at ' + mouseX + 'px ' + mouseY + 'px, black, transparent)'"
        style="background-image: radial-gradient(circle, #9ca3af 1.5px, transparent 1.5px); background-size: 22px 22px;"
      ></div>

      <!-- Franja diagonal roja: esquina superior izquierda -->
      <svg viewBox="0 0 220 220" class="absolute top-0 left-0 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 pointer-events-none">
        <defs>
          <clipPath id="recorteSupIzq">
            <polygon points="0,0 150,0 0,150" />
          </clipPath>
          <linearGradient id="rojoFranja1" gradientUnits="userSpaceOnUse" x1="0" y1="220" x2="220" y2="0">
            <stop offset="0%" stop-color="#7a0a1e" />
            <stop offset="100%" stop-color="#e0293f" />
          </linearGradient>
        </defs>
        <g clip-path="url(#recorteSupIzq)">
          <line *ngFor="let x of franjas" [attr.x1]="x" y1="220" [attr.x2]="x + 220" y2="0"
                stroke="url(#rojoFranja1)" stroke-width="16" />
        </g>
      </svg>

      <!-- Franja diagonal roja: esquina inferior derecha (misma forma, rotada 180°) -->
      <svg viewBox="0 0 220 220" class="absolute bottom-0 right-0 w-40 sm:w-56 md:w-64 h-40 sm:h-56 md:h-64 pointer-events-none" style="transform: rotate(180deg);">
        <defs>
          <clipPath id="recorteInfDer">
            <polygon points="0,0 150,0 0,150" />
          </clipPath>
          <linearGradient id="rojoFranja2" gradientUnits="userSpaceOnUse" x1="0" y1="220" x2="220" y2="0">
            <stop offset="0%" stop-color="#7a0a1e" />
            <stop offset="100%" stop-color="#e0293f" />
          </linearGradient>
        </defs>
        <g clip-path="url(#recorteInfDer)">
          <line *ngFor="let x of franjas" [attr.x1]="x" y1="220" [attr.x2]="x + 220" y2="0"
                stroke="url(#rojoFranja2)" stroke-width="16" />
        </g>
      </svg>

      <!-- Contenido: aparece con una animación pura de CSS (no depende de JavaScript ni de la detección de cambios de Angular, para que siempre se vea al cargar) -->
      <div class="relative flex flex-col items-center justify-center text-center py-20 sm:py-28 px-6 animate-aparecer">
        <img src="assets/marca/isotipo.png" alt="" class="w-24 h-24 sm:w-32 sm:h-32 mb-6" />
        <h1
          class="font-display text-4xl sm:text-6xl font-extrabold tracking-wide"
          [class.text-white]="tema.oscuroActivo()"
          [style.color]="tema.oscuroActivo() ? null : '#202054'"
        >FREDEUAG</h1>
        <p
          class="text-sm sm:text-base mt-3 max-w-xl"
          [class.text-muted]="!tema.oscuroActivo()"
          [style.color]="tema.oscuroActivo() ? 'rgba(255,255,255,0.85)' : null"
        >
          Frente por la Reforma Democrática de la Universidad Autónoma de Guerrero
        </p>
        <p
          class="mt-6 text-2xl sm:text-4xl"
          [class.text-white]="tema.oscuroActivo()"
          [style.color]="tema.oscuroActivo() ? null : '#202054'"
          style="font-family: 'Dancing Script', cursive;"
        >
          ¡Academia y Democracia!
        </p>
      </div>
    </section>
  `,
})
export class PortadaFredeuagComponent {
  tema = inject(TemaService);

  mouseX = 0;
  mouseY = 0;
  mostrarPuntos = false;

  onMouseMove(evento: MouseEvent): void {
    const rect = (evento.currentTarget as HTMLElement).getBoundingClientRect();
    this.mouseX = evento.clientX - rect.left;
    this.mouseY = evento.clientY - rect.top;
    this.mostrarPuntos = true;
  }

  onMouseLeave(): void {
    this.mostrarPuntos = false;
  }

  /**
   * Posiciones x de cada línea diagonal. Las líneas van en la misma
   * dirección que el borde del recorte triangular (pendiente -1), así que
   * cada una queda COMPLETAMENTE dentro o COMPLETAMENTE fuera del triángulo
   * — no hay recorte parcial. Para 4 líneas totalmente visibles dentro de un
   * recorte "0,0 150,0 0,150" en un viewBox de 220, el rango válido de x es
   * [-220, -70]; elegimos 4 valores parejos dentro de ese rango.
   */
  franjas = [-205, -165, -125, -85];
}

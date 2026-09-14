import { Component, ElementRef, OnDestroy, AfterViewInit, ViewChild, ViewEncapsulation, inject } from '@angular/core';

interface Punto {
  x: number;
  y: number;
}

/**
 * Efecto de "constelación": una distribución de puntos grises tipo panal
 * (para que las conexiones formen triángulos), que se iluminan como
 * pequeñas esferas y se conectan con líneas cuando el cursor pasa cerca.
 *
 * Se posiciona a sí mismo con CSS (position: absolute; inset: 0) en vez de
 * medir manualmente a su elemento padre — así funciona igual sin importar
 * si se usa directo o anidado dentro de otro componente envoltorio (como
 * FondoPublicoComponent). Solo necesita que algún ancestro tenga
 * `position: relative` (o similar) para saber qué área llenar.
 */
@Component({
  selector: 'app-puntos-conectados',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    app-puntos-conectados {
      position: absolute;
      inset: 0;
      display: block;
      pointer-events: none;
      z-index: -10;
    }
  `],
  template: `<canvas #lienzo class="w-full h-full block"></canvas>`,
})
export class PuntosConectadosComponent implements AfterViewInit, OnDestroy {
  @ViewChild('lienzo') lienzoRef!: ElementRef<HTMLCanvasElement>;

  private contexto?: CanvasRenderingContext2D;
  private puntos: Punto[] = [];
  private mouseX = -9999;
  private mouseY = -9999;
  private observadorResize?: ResizeObserver;

  private readonly RADIO_ACTIVACION = 150;
  private readonly DISTANCIA_CONEXION = 62;
  private readonly ESPACIADO = 46;

  ngAfterViewInit(): void {
    this.contexto = this.lienzoRef.nativeElement.getContext('2d') ?? undefined;
    this.ajustarTamano();
    this.generarPuntos();
    this.dibujar();

    // Eventos globales: no dependemos de cuál sea el elemento padre inmediato
    // en el DOM (puede cambiar si este componente se anida dentro de otro).
    window.addEventListener('mousemove', this.alMoverMouse);
    window.addEventListener('mouseout', this.alSalirMouse);

    this.observadorResize = new ResizeObserver(() => {
      this.ajustarTamano();
      this.generarPuntos();
      this.dibujar();
    });
    this.observadorResize.observe(this.lienzoRef.nativeElement);
  }

  ngOnDestroy(): void {
    window.removeEventListener('mousemove', this.alMoverMouse);
    window.removeEventListener('mouseout', this.alSalirMouse);
    this.observadorResize?.disconnect();
  }

  private alMoverMouse = (evento: MouseEvent): void => {
    const rect = this.lienzoRef.nativeElement.getBoundingClientRect();
    this.mouseX = evento.clientX - rect.left;
    this.mouseY = evento.clientY - rect.top;
    this.dibujar();
  };

  private alSalirMouse = (evento: MouseEvent): void => {
    if (evento.relatedTarget) return; // el cursor solo pasó a otro elemento, no salió de la ventana
    this.mouseX = -9999;
    this.mouseY = -9999;
    this.dibujar();
  };

  private ajustarTamano(): void {
    const canvas = this.lienzoRef.nativeElement;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  private generarPuntos(): void {
    const canvas = this.lienzoRef.nativeElement;
    this.puntos = [];
    const alturaFila = this.ESPACIADO * 0.87; // altura de un triángulo equilátero de lado ESPACIADO
    let fila = 0;
    for (let y = alturaFila / 2; y < canvas.height; y += alturaFila) {
      // Cada fila se desplaza medio espacio, como un panal — esto es lo que
      // hace que al conectar vecinos cercanos se formen triángulos en vez de
      // cuadrados (que es lo que da una cuadrícula normal).
      const desplazamiento = fila % 2 === 0 ? 0 : this.ESPACIADO / 2;
      for (let x = this.ESPACIADO / 2 + desplazamiento; x < canvas.width; x += this.ESPACIADO) {
        const jitter = this.ESPACIADO * 0.18;
        this.puntos.push({
          x: x + (Math.random() - 0.5) * jitter,
          y: y + (Math.random() - 0.5) * jitter,
        });
      }
      fila++;
    }
  }

  private dibujar(): void {
    if (!this.contexto) return;
    const canvas = this.lienzoRef.nativeElement;
    const ctx = this.contexto;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const activos = this.puntos
      .map((p) => ({ punto: p, distancia: Math.hypot(p.x - this.mouseX, p.y - this.mouseY) }))
      .filter((p) => p.distancia < this.RADIO_ACTIVACION);

    // Líneas entre puntos activos cercanos entre sí
    ctx.lineWidth = 0.8;
    for (let i = 0; i < activos.length; i++) {
      for (let j = i + 1; j < activos.length; j++) {
        const a = activos[i].punto;
        const b = activos[j].punto;
        const distancia = Math.hypot(a.x - b.x, a.y - b.y);
        if (distancia < this.DISTANCIA_CONEXION) {
          const cercaniaCursor = 1 - Math.min(activos[i].distancia, activos[j].distancia) / this.RADIO_ACTIVACION;
          const opacidad = (1 - distancia / this.DISTANCIA_CONEXION) * cercaniaCursor;
          ctx.strokeStyle = `rgba(148,163,184,${opacidad * 0.5})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Puntos: casi imperceptibles en reposo, se iluminan como pequeñas esferas con brillo cerca del cursor
    for (const punto of this.puntos) {
      const distancia = Math.hypot(punto.x - this.mouseX, punto.y - this.mouseY);
      const cercania = Math.max(0, 1 - distancia / this.RADIO_ACTIVACION);
      const radio = 1.3 + cercania * 2.4;

      const degradado = ctx.createRadialGradient(punto.x, punto.y, 0, punto.x, punto.y, radio);
      degradado.addColorStop(0, `rgba(203,213,225,${0.25 + cercania * 0.75})`);
      degradado.addColorStop(0.6, `rgba(148,163,184,${0.15 + cercania * 0.55})`);
      degradado.addColorStop(1, 'rgba(148,163,184,0)');

      ctx.beginPath();
      ctx.arc(punto.x, punto.y, radio, 0, Math.PI * 2);
      ctx.fillStyle = degradado;
      ctx.fill();
    }
  }
}

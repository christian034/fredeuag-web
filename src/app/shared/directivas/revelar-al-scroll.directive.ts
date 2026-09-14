import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Efecto de aparición al hacer scroll: el elemento se revela suavemente
 * cada vez que entra en la pantalla (bajando O subiendo), y vuelve a
 * ocultarse cuando sale — se repite siempre, no es de una sola vez.
 *
 * Usa estilos en línea (element.style) en vez de clases de Tailwind: así no
 * choca con bindings de Angular como [class]="..." en el mismo elemento
 * (esos bindings reemplazan por completo la lista de clases en cada
 * detección de cambios, y eso borraba el efecto sin avisar).
 */
@Directive({
  selector: '[appRevelarAlScroll]',
  standalone: true,
})
export class RevelarAlScrollDirective implements OnInit, OnDestroy {
  private elementRef = inject(ElementRef<HTMLElement>);
  private observador?: IntersectionObserver;

  ngOnInit(): void {
    const elemento = this.elementRef.nativeElement;
    elemento.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    this.ocultar(elemento);

    this.observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          const el = entrada.target as HTMLElement;
          if (entrada.isIntersecting) {
            this.mostrar(el);
          } else {
            this.ocultar(el);
          }
        }
      },
      { threshold: 0.1 }
    );
    this.observador.observe(elemento);
  }

  ngOnDestroy(): void {
    this.observador?.disconnect();
  }

  private ocultar(elemento: HTMLElement): void {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(3rem)';
  }

  private mostrar(elemento: HTMLElement): void {
    elemento.style.opacity = '1';
    elemento.style.transform = 'translateY(0)';
  }
}

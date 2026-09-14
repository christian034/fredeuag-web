import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private mensajeSubject = new BehaviorSubject<string | null>(null);
  mensaje$ = this.mensajeSubject.asObservable();

  mostrar(mensaje: string, duracionMs = 2500): void {
    this.mensajeSubject.next(mensaje);
    setTimeout(() => {
      if (this.mensajeSubject.value === mensaje) {
        this.mensajeSubject.next(null);
      }
    }, duracionMs);
  }
}

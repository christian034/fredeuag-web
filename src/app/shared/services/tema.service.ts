import { Injectable, signal } from '@angular/core';

const CLAVE_ALMACENAMIENTO = 'fredeuag-tema';

@Injectable({ providedIn: 'root' })
export class TemaService {
  /** true = modo oscuro activo. Se puede leer reactivamente desde cualquier componente. */
  oscuroActivo = signal<boolean>(false);

  constructor() {
    const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO);
    const prefiereOscuroDelSistema = window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
    const inicial = guardado ? guardado === 'oscuro' : prefiereOscuroDelSistema;
    this.aplicar(inicial);
  }

  alternar(): void {
    this.aplicar(!this.oscuroActivo());
  }

  private aplicar(oscuro: boolean): void {
    this.oscuroActivo.set(oscuro);
    document.documentElement.classList.toggle('dark', oscuro);
    localStorage.setItem(CLAVE_ALMACENAMIENTO, oscuro ? 'oscuro' : 'claro');
  }
}

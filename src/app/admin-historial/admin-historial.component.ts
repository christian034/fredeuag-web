import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuditoriaService, CategoriaHistorial } from '../shared/services/auditoria.service';
import { AuthService } from '../shared/services/auth.service';
import { AdminNavComponent } from '../shared/admin-nav.component';

@Component({
  selector: 'app-admin-historial',
  standalone: true,
  imports: [CommonModule, AsyncPipe, AdminNavComponent],
  templateUrl: './admin-historial.component.html',
})
export class AdminHistorialComponent {
  private auditoriaService = inject(AuditoriaService);
  auth = inject(AuthService);

  pestanaActiva: CategoriaHistorial = 'publicaciones';

  /**
   * Si el usuario no tiene "verHistorialCompleto" (por ejemplo, un Editor),
   * solo ve las filas donde el correo coincide con el suyo — su propio
   * historial, no el de los demás.
   */
  private filtrarSegunPermiso(registros$: ReturnType<AuditoriaService['obtenerPorCategoria']>) {
    return combineLatest([registros$, this.auth.permisos$, this.auth.usuario$]).pipe(
      map(([registros, permisos, usuario]) =>
        permisos.verHistorialCompleto
          ? registros
          : registros.filter((r) => r.correo === usuario?.email)
      )
    );
  }

  publicaciones$ = this.filtrarSegunPermiso(this.auditoriaService.obtenerPorCategoria('publicaciones'));
  firmas$ = this.filtrarSegunPermiso(this.auditoriaService.obtenerPorCategoria('firmas'));
  usuarios$ = this.filtrarSegunPermiso(this.auditoriaService.obtenerPorCategoria('usuarios'));

  cambiarPestana(pestana: CategoriaHistorial): void {
    this.pestanaActiva = pestana;
  }
}
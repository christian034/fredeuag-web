import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AdminNavComponent } from '../shared/admin-nav.component';
import { AuthService } from '../shared/services/auth.service';
import { FirmasService } from '../shared/services/firmas.service';
import { ContenidoService } from '../shared/services/contenido.service';
import { SeccionesService, encuestaCerrada } from '../shared/services/secciones.service';
import { AuditoriaService } from '../shared/services/auditoria.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, AdminNavComponent],
  templateUrl: './admin-dashboard.component.html',
})
export class AdminDashboardComponent {
  auth = inject(AuthService);
  private firmasService = inject(FirmasService);
  private contenidoService = inject(ContenidoService);
  private seccionesService = inject(SeccionesService);
  private auditoria = inject(AuditoriaService);

  totalFirmas$ = this.firmasService.contarFirmas();

  encuestasActivas$ = this.seccionesService.secciones$.pipe(
    map((secciones) => secciones.filter((s) => s.tipo === 'encuesta' && !encuestaCerrada(s)))
  );

  encuestasCerradas$ = this.seccionesService.secciones$.pipe(
    map((secciones) => secciones.filter((s) => s.tipo === 'encuesta' && encuestaCerrada(s)))
  );

  /**
   * Quien no puede editar cualquier contenido (Editor) solo ve SUS PROPIAS
   * noticias aquí — igual que en la pantalla de Contenido de la página. Sin
   * este filtro, este resumen del Dashboard mostraba las noticias de
   * cualquier autor, aunque el propio editor no hubiera publicado ninguna.
   */
  ultimasNoticias$ = combineLatest([
    this.contenidoService.noticiasParaCarrusel$,
    this.auth.permisos$,
    this.auth.usuario$,
  ]).pipe(
    map(([noticias, permisos, usuario]) => {
      const correo = usuario?.email?.toLowerCase() ?? '';
      const visibles = permisos.editarCualquierContenido
        ? noticias
        : noticias.filter((n) => (n.autorCorreo ?? '').toLowerCase() === correo);
      return visibles.slice(0, 3);
    })
  );

  actividadReciente$ = this.auditoria.obtenerPorCategoria('publicaciones', 5);
}

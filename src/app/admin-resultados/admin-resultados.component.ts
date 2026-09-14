import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { FirmasService, Firma } from '../shared/services/firmas.service';
import { AdminNavComponent } from '../shared/admin-nav.component';
import { AuthService } from '../shared/services/auth.service';
import { AuditoriaService } from '../shared/services/auditoria.service';
import { ToastService } from '../shared/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-resultados',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule, AdminNavComponent],
  templateUrl: './admin-resultados.component.html',
})
export class AdminResultadosComponent {
  private firmasService = inject(FirmasService);
  private auditoria = inject(AuditoriaService);
  private toast = inject(ToastService);
  auth = inject(AuthService);

  alumnos$: Observable<Firma[]> = this.firmasService.obtenerFirmasPorTipo('alumno');
  trabajadores$: Observable<Firma[]> = this.firmasService.obtenerFirmasPorTipo('trabajador');

  // --- Estado de búsqueda y paginación, independiente por tabla ---
  busquedaAlumnos = '';
  paginaAlumnos = 1;
  tamanoPaginaAlumnos = 10;

  busquedaTrabajadores = '';
  paginaTrabajadores = 1;
  tamanoPaginaTrabajadores = 10;

  /** ID de la firma que se está editando actualmente (null = ninguna). */
  editandoId: string | null = null;
  borrador: Partial<Firma> = {};
  guardandoEdicion = false;

  filtrar(lista: Firma[], termino: string): Firma[] {
    if (!termino.trim()) return lista;
    const t = termino.trim().toLowerCase();
    return lista.filter((f) =>
      `${f.identificador} ${f.nombres} ${f.apellidoPaterno} ${f.apellidoMaterno} ${f.correo} ${f.unidad} ${f.categoria} ${f.region}`
        .toLowerCase()
        .includes(t)
    );
  }

  paginar(lista: Firma[], pagina: number, tamano: number): Firma[] {
    const inicio = (pagina - 1) * tamano;
    return lista.slice(inicio, inicio + tamano);
  }

  totalPaginas(lista: Firma[], tamano: number): number {
    return Math.max(1, Math.ceil(lista.length / tamano));
  }

  irAPagina(tabla: 'alumnos' | 'trabajadores', pagina: number, totalPaginas: number): void {
    const destino = Math.min(Math.max(1, pagina), totalPaginas);
    if (tabla === 'alumnos') this.paginaAlumnos = destino;
    else this.paginaTrabajadores = destino;
  }

  private aFilas(firmas: Firma[]) {
    return firmas.map((f) => ({
      Identificador: f.identificador,
      Nombres: f.nombres,
      'Apellido Paterno': f.apellidoPaterno,
      'Apellido Materno': f.apellidoMaterno,
      'Correo Electrónico': f.correo,
      Unidad: f.unidad,
      Categoría: f.categoria,
      'Región del Estado': f.region,
    }));
  }

  descargarExcelAlumnos(alumnos: Firma[]): void {
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(this.aFilas(alumnos));
    XLSX.utils.book_append_sheet(libro, hoja, 'Alumnos');
    XLSX.writeFile(libro, `firmas-alumnos-${new Date().toISOString().slice(0, 10)}.xlsx`);
    this.auditoria.registrar('Descargó Excel de alumnos', `${alumnos.length} registros`, 'firmas');
    this.toast.mostrar('Excel de alumnos descargado.');
  }

  descargarExcelTrabajadores(trabajadores: Firma[]): void {
    const libro = XLSX.utils.book_new();
    const hoja = XLSX.utils.json_to_sheet(this.aFilas(trabajadores));
    XLSX.utils.book_append_sheet(libro, hoja, 'Trabajadores');
    XLSX.writeFile(libro, `firmas-trabajadores-${new Date().toISOString().slice(0, 10)}.xlsx`);
    this.auditoria.registrar('Descargó Excel de trabajadores', `${trabajadores.length} registros`, 'firmas');
    this.toast.mostrar('Excel de trabajadores descargado.');
  }

  empezarEdicion(firma: Firma): void {
    this.editandoId = firma.id ?? null;
    this.borrador = { ...firma };
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.borrador = {};
  }

  async guardarEdicion(): Promise<void> {
    if (!this.editandoId) return;
    this.guardandoEdicion = true;
    try {
      const { id, tipo, creadoEn, ...cambios } = this.borrador as Firma;
      await this.firmasService.actualizarFirma(this.editandoId, cambios);
      await this.auditoria.registrar('Editó firma', `${this.editandoId}`, 'firmas');
      this.toast.mostrar('Firma actualizada correctamente.');
      this.cancelarEdicion();
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar. Intenta de nuevo.');
    } finally {
      this.guardandoEdicion = false;
    }
  }

  async eliminarFirma(firma: Firma): Promise<void> {
    if (!firma.id) return;
    const confirmado = confirm(`¿Eliminar la firma de ${firma.nombres} ${firma.apellidoPaterno}? Esta acción no se puede deshacer.`);
    if (!confirmado) return;

    try {
      await this.firmasService.eliminarFirma(firma.id);
      await this.auditoria.registrar('Eliminó firma', `${firma.identificador} — ${firma.nombres} ${firma.apellidoPaterno}`, 'firmas');
      this.toast.mostrar('Firma eliminada correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo eliminar. Intenta de nuevo.');
    }
  }
}

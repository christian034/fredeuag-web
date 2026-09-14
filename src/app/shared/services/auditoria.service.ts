import { Injectable, inject } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type CategoriaHistorial = 'publicaciones' | 'firmas' | 'usuarios';

export interface RegistroHistorial {
  correo: string;
  accion: string;
  detalle: string;
  categoria: CategoriaHistorial;
  fecha: string;
}

@Injectable({ providedIn: 'root' })
export class AuditoriaService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);
  private coleccion = collection(this.firestore, 'auditoria');

  /**
   * Nunca lanza un error hacia quien la llama: si el registro de auditoría
   * falla (por ejemplo, por reglas de seguridad desactualizadas en Firestore),
   * eso no debe hacer que la acción principal (guardar una noticia, aprobar
   * una foto, etc.) se reporte como fallida cuando en realidad sí funcionó.
   */
  async registrar(accion: string, detalle: string, categoria: CategoriaHistorial): Promise<void> {
    try {
      const correo = this.auth.currentUser?.email ?? 'anónimo';
      await addDoc(this.coleccion, {
        correo,
        accion,
        detalle,
        categoria,
        fecha: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('No se pudo registrar en el historial (revisa las reglas de Firestore para "auditoria"):', err);
    }
  }

  /**
   * Nota: se ordena en el cliente (no con `orderBy` de Firestore) a propósito —
   * combinar un filtro `where` con `orderBy` en un campo distinto requiere crear
   * un índice compuesto en Firestore; si ese índice no existe, la consulta falla
   * en silencio y el historial se ve vacío. Ordenando aquí evitamos depender de eso.
   */
  obtenerPorCategoria(categoria: CategoriaHistorial, cantidad = 200): Observable<RegistroHistorial[]> {
    const q = query(this.coleccion, where('categoria', '==', categoria));
    return (collectionData(q) as Observable<RegistroHistorial[]>).pipe(
      map((registros) =>
        [...registros]
          .sort((a, b) => (b.fecha ?? '').localeCompare(a.fecha ?? ''))
          .slice(0, cantidad)
      )
    );
  }
}

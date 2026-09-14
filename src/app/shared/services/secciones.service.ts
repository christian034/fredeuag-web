import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type TipoGrafico = 'barras' | 'circular' | 'lineas' | 'histograma' | 'dispersion';
export type TipoResultadoEncuesta = 'tabla' | 'grafico';
export type EstadoPublicacion = 'pendiente' | 'aprobado';

export interface PreguntaEncuesta {
  texto: string;
  opciones: string[];
}

export interface SeccionPagina {
  id?: string;
  tipo: 'informativa' | 'encuesta';
  titulo: string;
  orden: number;
  autorCorreo: string;
  estado: EstadoPublicacion;

  // Solo para tipo "informativa"
  contenido?: string;
  imagen?: string;
  enlaceUrl?: string;
  textoBoton?: string;

  // Solo para tipo "encuesta"
  preguntas?: PreguntaEncuesta[];
  tipoResultado?: TipoResultadoEncuesta;
  tipoGrafico?: TipoGrafico;
  fechaLimite?: string; // formato datetime-local, ej. "2026-12-31T18:00"
}

/** true si la encuesta ya pasó su fecha límite (o no tiene, en cuyo caso nunca cierra). */
export function encuestaCerrada(seccion: SeccionPagina): boolean {
  if (!seccion.fechaLimite) return false;
  return new Date(seccion.fechaLimite).getTime() < Date.now();
}

/** Da un tipo seguro a secciones creadas antes de que existiera este campo. */
export function tipoEfectivo(seccion: SeccionPagina): 'informativa' | 'encuesta' {
  return seccion.tipo ?? 'informativa';
}

/** Trata las secciones creadas antes de que existiera "estado" como ya aprobadas. */
export function estadoEfectivo(seccion: SeccionPagina): EstadoPublicacion {
  return seccion.estado ?? 'aprobado';
}

@Injectable({ providedIn: 'root' })
export class SeccionesService {
  private firestore: Firestore = inject(Firestore);
  private coleccion = collection(this.firestore, 'secciones');

  /** Todas las secciones (incluidas las pendientes) — para el panel de administración. */
  secciones$: Observable<SeccionPagina[]> = collectionData(
    query(this.coleccion, orderBy('orden')),
    { idField: 'id' }
  ) as Observable<SeccionPagina[]>;

  /** Solo las aprobadas — para el sitio público. */
  seccionesPublicas$: Observable<SeccionPagina[]> = this.secciones$.pipe(
    map((secciones) => secciones.filter((s) => estadoEfectivo(s) === 'aprobado'))
  );

  crearSeccion(datos: Omit<SeccionPagina, 'id' | 'orden'>) {
    return addDoc(this.coleccion, { ...datos, orden: Date.now() });
  }

  actualizarSeccion(id: string, datos: Omit<SeccionPagina, 'id' | 'orden' | 'autorCorreo' | 'estado'>) {
    return updateDoc(doc(this.firestore, 'secciones', id), { ...datos });
  }

  eliminarSeccion(id: string) {
    return deleteDoc(doc(this.firestore, 'secciones', id));
  }

  aprobarSeccion(id: string) {
    return updateDoc(doc(this.firestore, 'secciones', id), { estado: 'aprobado' });
  }
}

import { Injectable, Injector, inject, runInInjectionContext } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuditoriaService } from './auditoria.service';

export interface Firma {
  id?: string; // ID real del documento en Firestore (tipo-identificador)
  tipo: 'alumno' | 'trabajador';
  identificador: string; // matrícula o número de trabajador
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  unidad: string; // escuela (alumno) o adscrito (trabajador)
  categoria: string; // nivel educativo (alumno) o tipo de trabajador (trabajador)
  region: string; // región del estado
  creadoEn?: unknown;
}

function normalizarParaId(valor: string): string {
  return valor
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

@Injectable({ providedIn: 'root' })
export class FirmasService {
  private firestore: Firestore = inject(Firestore);
  private injector = inject(Injector);
  private auditoria = inject(AuditoriaService);
  private coleccionFirmas = collection(this.firestore, 'firmas');
  private coleccionCorreos = collection(this.firestore, 'mail');

  /**
   * "runInInjectionContext" evita el aviso de AngularFire sobre llamar APIs
   * de Firebase fuera de un contexto de inyección — sin esto, en algunos
   * casos la promesa nunca termina de avisarle a Angular que ya resolvió,
   * dejando la interfaz "trabada" aunque la operación ya haya terminado.
   */
  correoYaRegistrado(correo: string): Promise<boolean> {
    return runInInjectionContext(this.injector, async () => {
      const q = query(this.coleccionFirmas, where('correo', '==', correo.trim().toLowerCase()));
      const resultado = await getDocs(q);
      return !resultado.empty;
    });
  }

  guardarFirma(firma: Firma): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const idDocumento = `${firma.tipo}-${normalizarParaId(firma.identificador)}`;
      const referencia = doc(this.firestore, 'firmas', idDocumento);

      await setDoc(referencia, {
        ...firma,
        correo: firma.correo.trim().toLowerCase(),
        creadoEn: serverTimestamp(),
      });

      await this.auditoria.registrar(
        'Nueva firma',
        `${firma.tipo === 'alumno' ? 'Alumno' : 'Trabajador'}: ${firma.nombres} ${firma.apellidoPaterno} (${firma.identificador})`,
        'firmas'
      );

      await this.enviarCorreoConfirmacion(firma);
    });
  }

  private async enviarCorreoConfirmacion(firma: Firma): Promise<void> {
    const nombreCompleto = `${firma.nombres} ${firma.apellidoPaterno} ${firma.apellidoMaterno}`;
    const etiquetaTipo = firma.tipo === 'alumno' ? 'alumno' : 'trabajador';
    await setDoc(doc(this.coleccionCorreos), {
      to: [firma.correo],
      message: {
        subject: 'Tu firma fue registrada — FREDEUAG',
        html: `
          <div style="background-color:#F4F6F9; padding:32px 16px; font-family: Arial, Helvetica, sans-serif;">
            <div style="max-width:480px; margin:0 auto; background-color:#FFFFFF; border:1px solid #DDE2EA; overflow:hidden;">

              <!-- Encabezado -->
              <div style="background-color:#202054; padding:24px 32px; text-align:center;">
                <p style="margin:0; color:#FFFFFF; font-size:22px; font-weight:bold; letter-spacing:0.5px;">FREDEUAG</p>
                <p style="margin:4px 0 0; color:rgba(255,255,255,0.75); font-size:11px; letter-spacing:0.5px; text-transform:uppercase;">
                  Frente por la Reforma Democrática de la UAGro
                </p>
              </div>

              <!-- Cuerpo -->
              <div style="padding:32px;">
                <p style="margin:0 0 16px; color:#101828; font-size:15px;">Hola ${nombreCompleto},</p>
                <p style="margin:0 0 20px; color:#101828; font-size:15px; line-height:1.5;">
                  Confirmamos que tu firma fue registrada correctamente en la petición del movimiento
                  como <strong style="color:#AA0225;">${etiquetaTipo}</strong>.
                </p>

                <div style="background-color:#F4F6F9; border:1px solid #DDE2EA; padding:14px 18px; margin:0 0 20px;">
                  <p style="margin:0; color:#5C6B84; font-size:12px; text-transform:uppercase; letter-spacing:0.5px;">Identificador registrado</p>
                  <p style="margin:4px 0 0; color:#101828; font-size:17px; font-weight:bold;">${firma.identificador}</p>
                </div>

                <p style="margin:0; color:#101828; font-size:15px;">Gracias por sumarte.</p>
              </div>

              <!-- Pie -->
              <div style="padding:20px 32px; border-top:1px solid #DDE2EA; text-align:center;">
                <p style="margin:0; color:#202054; font-size:16px; font-style:italic;">¡Academia y Democracia!</p>
              </div>

            </div>
          </div>
        `,
      },
    });
  }

  /** Actualiza campos editables de una firma existente (requiere permiso "editarFirmantes"). */
  actualizarFirma(id: string, cambios: Partial<Firma>): Promise<void> {
    return updateDoc(doc(this.firestore, 'firmas', id), { ...cambios });
  }

  /** Elimina una firma (requiere permiso "borrarFirmantes"). */
  eliminarFirma(id: string): Promise<void> {
    return deleteDoc(doc(this.firestore, 'firmas', id));
  }

  contarFirmas(): Observable<number> {
    return (collectionData(this.coleccionFirmas) as Observable<Firma[]>).pipe(
      map((firmas) => firmas.length)
    );
  }

  obtenerFirmasPorTipo(tipo: 'alumno' | 'trabajador'): Observable<Firma[]> {
    const q = query(this.coleccionFirmas, where('tipo', '==', tipo));
    return collectionData(q, { idField: 'id' }) as Observable<Firma[]>;
  }
}

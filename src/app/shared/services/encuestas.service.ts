import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface VotoEncuesta {
  seccionId: string;
  respuestasOpcion?: number[]; // modo "gráfico": índice de la opción elegida, una por pregunta
  respuestasTexto?: string[]; // modo "tabla": texto libre escrito por quien responde, una por pregunta
  creadoEn: string;
}

@Injectable({ providedIn: 'root' })
export class EncuestasService {
  private firestore: Firestore = inject(Firestore);
  private coleccion = collection(this.firestore, 'encuesta_votos');

  registrarVotoOpcion(seccionId: string, respuestasOpcion: number[]) {
    return addDoc(this.coleccion, {
      seccionId,
      respuestasOpcion,
      creadoEn: new Date().toISOString(),
    });
  }

  registrarVotoTexto(seccionId: string, respuestasTexto: string[]) {
    return addDoc(this.coleccion, {
      seccionId,
      respuestasTexto,
      creadoEn: new Date().toISOString(),
    });
  }

  /** Todos los votos de una encuesta. */
  obtenerVotos(seccionId: string): Observable<VotoEncuesta[]> {
    const q = query(this.coleccion, where('seccionId', '==', seccionId));
    return collectionData(q) as Observable<VotoEncuesta[]>;
  }

  /** Conteo de votos por opción, para cada pregunta (modo "gráfico"): conteos[preguntaIndice][opcionIndice]. */
  obtenerConteos(seccionId: string, numeroOpcionesPorPregunta: number[]): Observable<number[][]> {
    return this.obtenerVotos(seccionId).pipe(
      map((votos) => {
        const conteos: number[][] = numeroOpcionesPorPregunta.map((n) => new Array(n).fill(0));
        for (const voto of votos) {
          (voto.respuestasOpcion ?? []).forEach((indiceOpcion, indicePregunta) => {
            if (conteos[indicePregunta] && conteos[indicePregunta][indiceOpcion] !== undefined) {
              conteos[indicePregunta][indiceOpcion]++;
            }
          });
        }
        return conteos;
      })
    );
  }

  /** Todas las respuestas de texto recibidas, para cada pregunta (modo "tabla"): textos[preguntaIndice] = string[]. */
  obtenerRespuestasTexto(seccionId: string, numeroPreguntas: number): Observable<string[][]> {
    return this.obtenerVotos(seccionId).pipe(
      map((votos) => {
        const textos: string[][] = Array.from({ length: numeroPreguntas }, () => []);
        for (const voto of votos) {
          (voto.respuestasTexto ?? []).forEach((texto, indicePregunta) => {
            if (textos[indicePregunta] && texto?.trim()) {
              textos[indicePregunta].push(texto.trim());
            }
          });
        }
        return textos;
      })
    );
  }
}

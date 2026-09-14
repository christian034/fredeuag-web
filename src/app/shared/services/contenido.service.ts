import { Injectable, inject } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { Observable, firstValueFrom } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PreguntaEncuesta, TipoGrafico, TipoResultadoEncuesta } from './secciones.service';

export type EstadoPublicacion = 'pendiente' | 'aprobado' | 'rechazado';

export interface EncuestaEmbebida {
  preguntas: PreguntaEncuesta[];
  tipoResultado: TipoResultadoEncuesta;
  tipoGrafico?: TipoGrafico;
  fechaLimite?: string;
}

export interface NoticiaContenido {
  id: string; // estable, para poder enlazar a la página de detalle
  titulo: string;
  fecha: string;
  resumen: string;
  cuerpoHtml: string; // texto enriquecido (negritas, cursivas, títulos, etc.)
  videoUrl: string; // link opcional a un video (YouTube, Vimeo, etc.)
  imagen: string;
  imagenAlt: string;
  creadoEn: number; // marca de tiempo para saber cuáles son las últimas publicadas
  autorCorreo: string;
  estado: EstadoPublicacion;
  destacada: boolean; // noticia muy relevante/importante
  leidoPor: string[]; // correos de quienes ya la vieron en el panel
  encuesta?: EncuestaEmbebida; // encuesta opcional incluida dentro de la propia noticia
}

export interface FotoGaleria {
  url: string;
  descripcion: string;
  autorCorreo: string;
  estado: EstadoPublicacion;
  destacada: boolean;
}

export interface DatosContacto {
  correo: string;
  telefono: string;
  facebook: string;
  instagram: string;
  x: string;
  descripcion: string;
}

export interface AccesoFormularios {
  titulo: string;
  descripcion: string;
  visible: boolean;
}

export interface Contenido {
  accesoFormularios: AccesoFormularios;
  informacionParrafo1: string;
  informacionParrafo2: string;
  informacionImagen: string;
  mision: string;
  vision: string;
  noticias: NoticiaContenido[];
  galeria: FotoGaleria[];
  contacto: DatosContacto;
  bannerEncuestas: BannerEncuestas;
}

export interface BannerEncuestas {
  visible: boolean;
  eyebrow: string;
  titulo: string;
  textoBoton: string;
}

export const CONTENIDO_POR_DEFECTO: Contenido = {
  accesoFormularios: {
    titulo: 'Suma tu firma a la petición',
    descripcion:
      'Está abierta a toda la comunidad. Elige la opción que te corresponde para llenar el formulario y respaldar el pliego de peticiones con tu firma.',
    visible: true,
  },
  informacionParrafo1:
    'Somos una organización formada por alumnos y trabajadores que buscan condiciones más justas dentro de nuestra institución. Nacimos de la necesidad de tener una voz colectiva frente a decisiones que nos afectan directamente.',
  informacionParrafo2:
    'Este espacio reúne información, avances y la petición formal que estamos construyendo entre todos. Cada firma cuenta como respaldo ante las autoridades correspondientes.',
  informacionImagen: 'https://picsum.photos/id/1048/900/1100',
  mision:
    'Representar y defender los intereses de alumnos y trabajadores, promoviendo el diálogo directo con las autoridades para lograr acuerdos concretos y verificables.',
  vision:
    'Ser un movimiento reconocido por su organización y transparencia, capaz de generar cambios duraderos en las condiciones de estudio y trabajo de nuestra comunidad.',
  noticias: [
    {
      id: 'noticia-asamblea',
      titulo: 'Asamblea abierta este sábado en la plaza central',
      fecha: '28 ago 2026',
      resumen: 'Convocamos a alumnos y trabajadores a la asamblea informativa donde presentaremos el pliego de peticiones.',
      cuerpoHtml: '',
      videoUrl: '',
      imagen: 'https://picsum.photos/id/1074/1600/900',
      imagenAlt: 'Plaza central donde se realizará la asamblea',
      creadoEn: Date.now() - 2000,
      autorCorreo: '',
      estado: 'aprobado',
      destacada: false,
      leidoPor: [],
    },
    {
      id: 'noticia-5000-firmas',
      titulo: 'Superamos las primeras 5,000 firmas',
      fecha: '20 ago 2026',
      resumen: 'Gracias a quienes ya se sumaron. Seguimos recolectando apoyo antes de la fecha límite del próximo mes.',
      cuerpoHtml: '',
      videoUrl: '',
      imagen: 'https://picsum.photos/id/1082/1600/900',
      imagenAlt: 'Comunidad reunida en apoyo al movimiento',
      creadoEn: Date.now() - 1000,
      autorCorreo: '',
      estado: 'aprobado',
      destacada: false,
      leidoPor: [],
    },
    {
      id: 'noticia-mesa-dialogo',
      titulo: 'Mesa de diálogo confirmada con autoridades',
      fecha: '10 ago 2026',
      resumen: 'Se abrió una mesa de negociación formal. Compartiremos avances conforme se den las reuniones.',
      cuerpoHtml: '',
      videoUrl: '',
      imagen: 'https://picsum.photos/id/1027/1600/900',
      imagenAlt: 'Edificio institucional sede de las negociaciones',
      creadoEn: Date.now(),
      autorCorreo: '',
      estado: 'aprobado',
      destacada: false,
      leidoPor: [],
    },
  ],
  galeria: [
    { url: 'https://picsum.photos/id/1011/800/800', descripcion: 'Asamblea informativa', autorCorreo: '', estado: 'aprobado', destacada: true },
    { url: 'https://picsum.photos/id/1015/800/800', descripcion: 'Recolecta de firmas en plantel', autorCorreo: '', estado: 'aprobado', destacada: false },
    { url: 'https://picsum.photos/id/1016/800/800', descripcion: 'Reunión con representantes', autorCorreo: '', estado: 'aprobado', destacada: false },
  ],
  contacto: {
    correo: 'contacto@tumovimiento.org',
    telefono: '744 000 0000',
    facebook: 'https://facebook.com/TU-PAGINA',
    instagram: 'https://instagram.com/TU-PAGINA',
    x: 'https://x.com/TU-PAGINA',
    descripcion: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  bannerEncuestas: {
    visible: true,
    eyebrow: 'Participa',
    titulo: '¿Ya viste nuestras encuestas?',
    textoBoton: 'Ir a Encuestas',
  },
};

const MAX_NOTICIAS_EN_CARRUSEL = 5;

function soloAprobados<T extends { estado?: EstadoPublicacion }>(items: T[]): T[] {
  return items.filter((item) => (item.estado ?? 'aprobado') === 'aprobado');
}

/**
 * Combina lo que venga guardado en Firestore con los valores por defecto,
 * campo por campo. Así, si el documento fue creado con una versión anterior
 * del esquema (por ejemplo, sin "accesoFormularios", sin "facebook" en
 * contacto, o sin "autorCorreo"/"estado" en noticias/fotos), la app no
 * truena — usa un valor por defecto razonable en vez de dejarlo "undefined".
 * Los ítems ya existentes sin "estado" se tratan como ya aprobados, para que
 * no desaparezcan del sitio público al actualizar la app.
 */
function fusionarConValoresPorDefecto(contenido: Partial<Contenido> | undefined): Contenido {
  const base = CONTENIDO_POR_DEFECTO;
  return {
    accesoFormularios: { ...base.accesoFormularios, ...(contenido?.accesoFormularios ?? {}) },
    informacionParrafo1: contenido?.informacionParrafo1 ?? base.informacionParrafo1,
    informacionParrafo2: contenido?.informacionParrafo2 ?? base.informacionParrafo2,
    informacionImagen: contenido?.informacionImagen ?? base.informacionImagen,
    mision: contenido?.mision ?? base.mision,
    vision: contenido?.vision ?? base.vision,
    noticias: (contenido?.noticias?.length ? contenido.noticias : base.noticias).map((noticia, indice) => ({
      id: noticia.id ?? `n-legado-${indice}`,
      titulo: noticia.titulo ?? '',
      fecha: noticia.fecha ?? '',
      resumen: noticia.resumen ?? '',
      cuerpoHtml: noticia.cuerpoHtml ?? '',
      videoUrl: noticia.videoUrl ?? '',
      imagen: noticia.imagen ?? '',
      imagenAlt: noticia.imagenAlt ?? '',
      creadoEn: noticia.creadoEn ?? Date.now() - indice * 1000,
      autorCorreo: noticia.autorCorreo ?? '',
      estado: noticia.estado ?? 'aprobado',
      destacada: noticia.destacada ?? false,
      leidoPor: noticia.leidoPor ?? [],
      encuesta: noticia.encuesta,
    })),
    galeria: (contenido?.galeria ?? base.galeria).map((foto) => ({
      url: foto.url ?? '',
      descripcion: foto.descripcion ?? '',
      autorCorreo: foto.autorCorreo ?? '',
      estado: foto.estado ?? 'aprobado',
      destacada: foto.destacada ?? false,
    })),
    contacto: { ...base.contacto, ...(contenido?.contacto ?? {}) },
    bannerEncuestas: { ...base.bannerEncuestas, ...(contenido?.bannerEncuestas ?? {}) },
  };
}

@Injectable({ providedIn: 'root' })
export class ContenidoService {
  private firestore: Firestore = inject(Firestore);
  private ref = doc(this.firestore, 'contenido', 'sitio');

  /** Contenido completo, sin filtrar — para el panel de administración (incluye pendientes). */
  contenido$: Observable<Contenido> = (docData(this.ref) as Observable<Partial<Contenido> | undefined>).pipe(
    map((contenido) => fusionarConValoresPorDefecto(contenido))
  );

  /** Solo lo aprobado — para el sitio público. */
  contenidoPublico$: Observable<Contenido> = this.contenido$.pipe(
    map((c) => ({ ...c, noticias: soloAprobados(c.noticias), galeria: soloAprobados(c.galeria) }))
  );

  /** Solo las últimas 5 noticias aprobadas, para el carrusel del inicio. */
  noticiasParaCarrusel$: Observable<NoticiaContenido[]> = this.contenidoPublico$.pipe(
    map((c) => [...c.noticias].sort((a, b) => (b.creadoEn ?? 0) - (a.creadoEn ?? 0)).slice(0, MAX_NOTICIAS_EN_CARRUSEL))
  );

  /** Busca una noticia aprobada por su id, para la página de detalle pública. */
  obtenerNoticiaPorId(id: string): Observable<NoticiaContenido | undefined> {
    return this.contenidoPublico$.pipe(map((c) => c.noticias.find((n) => n.id === id)));
  }

  // --- Guardado por bloque, cada uno independiente (solo para quien puede editar el sitio en general) ---

  actualizarInicio(datos: {
    accesoFormularios: AccesoFormularios;
    informacionParrafo1: string;
    informacionParrafo2: string;
    informacionImagen: string;
    mision: string;
    vision: string;
    bannerEncuestas: BannerEncuestas;
  }) {
    return setDoc(this.ref, datos, { merge: true });
  }

  actualizarNoticias(noticias: NoticiaContenido[]) {
    return setDoc(this.ref, { noticias }, { merge: true });
  }

  /** Marca una noticia como leída por este correo, sin afectar nada más. */
  async marcarNoticiaLeida(id: string, correo: string): Promise<void> {
    const contenido = await firstValueFrom(this.contenido$.pipe(take(1)));
    const noticias = contenido.noticias.map((n) =>
      n.id === id && !n.leidoPor.includes(correo) ? { ...n, leidoPor: [...n.leidoPor, correo] } : n
    );
    await setDoc(this.ref, { noticias }, { merge: true });
  }

  actualizarContacto(contacto: DatosContacto) {
    return setDoc(this.ref, { contacto }, { merge: true });
  }

  // --- Galería: cada foto se crea/edita/elimina de forma atómica ---

  private async leerGaleriaActual(): Promise<FotoGaleria[]> {
    const contenido = await firstValueFrom(this.contenido$.pipe(take(1)));
    return contenido.galeria;
  }

  async agregarFotoGaleria(foto: FotoGaleria): Promise<void> {
    const galeria = await this.leerGaleriaActual();
    await setDoc(this.ref, { galeria: [...galeria, foto] }, { merge: true });
  }

  async actualizarFotoGaleria(indice: number, foto: FotoGaleria): Promise<void> {
    const galeria = await this.leerGaleriaActual();
    galeria[indice] = foto;
    await setDoc(this.ref, { galeria }, { merge: true });
  }

  async eliminarFotoGaleria(indice: number): Promise<void> {
    const galeria = await this.leerGaleriaActual();
    galeria.splice(indice, 1);
    await setDoc(this.ref, { galeria }, { merge: true });
  }

  /** Cambia el estado de una foto a "aprobado" (usado por quien puede aprobar contenido). */
  async aprobarFotoGaleria(indice: number): Promise<void> {
    const galeria = await this.leerGaleriaActual();
    if (galeria[indice]) galeria[indice] = { ...galeria[indice], estado: 'aprobado' };
    await setDoc(this.ref, { galeria }, { merge: true });
  }
}

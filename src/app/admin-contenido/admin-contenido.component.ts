import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ContenidoService, FotoGaleria, EncuestaEmbebida, EstadoPublicacion } from '../shared/services/contenido.service';
import {
  SeccionesService,
  SeccionPagina,
  PreguntaEncuesta,
  TipoGrafico,
  tipoEfectivo,
  estadoEfectivo,
} from '../shared/services/secciones.service';
import { ImagenesService } from '../shared/services/imagenes.service';
import { AuthService } from '../shared/services/auth.service';
import { AuditoriaService } from '../shared/services/auditoria.service';
import { ToastService } from '../shared/services/toast.service';
import { AdminNavComponent } from '../shared/admin-nav.component';
import { EditorTextoComponent } from '../shared/editor-texto.component';
import { SelectorImagenComponent } from '../shared/selector-imagen/selector-imagen.component';

type PestanaContenido = 'inicio' | 'noticias' | 'galeria' | 'contacto' | 'secciones';

interface BorradorEncuestaNoticia {
  activa: boolean;
  numeroPreguntas: number;
  preguntas: { texto: string; opciones: string[] }[];
  tipoResultado: 'tabla' | 'grafico';
  tipoGrafico: TipoGrafico;
  fechaLimite: string;
}

function encuestaNoticiaVacia(): BorradorEncuestaNoticia {
  return {
    activa: false,
    numeroPreguntas: 1,
    preguntas: [{ texto: '', opciones: ['', ''] }],
    tipoResultado: 'tabla',
    tipoGrafico: 'barras',
    fechaLimite: '',
  };
}

interface BorradorSeccion {
  tipo: 'informativa' | 'encuesta';
  titulo: string;
  contenido: string;
  imagen: string;
  enlaceUrl: string;
  textoBoton: string;
  numeroPreguntas: number;
  preguntas: { texto: string; opciones: string[] }[];
  tipoResultado: 'tabla' | 'grafico';
  tipoGrafico: TipoGrafico;
  fechaLimite: string;
}

function borradorVacio(): BorradorSeccion {
  return {
    tipo: 'informativa',
    titulo: '',
    contenido: '',
    imagen: '',
    enlaceUrl: '',
    textoBoton: '',
    numeroPreguntas: 1,
    preguntas: [{ texto: '', opciones: ['', ''] }],
    tipoResultado: 'tabla',
    tipoGrafico: 'barras',
    fechaLimite: '',
  };
}

function generarId(): string {
  return `n-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

@Component({
  selector: 'app-admin-contenido',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ReactiveFormsModule, FormsModule, AdminNavComponent, EditorTextoComponent, SelectorImagenComponent],
  templateUrl: './admin-contenido.component.html',
})
export class AdminContenidoComponent {
  /** Evita que *ngFor destruya y recree los inputs de opciones al escribir (que cortaba el texto a una letra). */
  trackByIndex(index: number, _item?: unknown): number {
    return index;
  }

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private contenidoService = inject(ContenidoService);
  private seccionesService = inject(SeccionesService);
  private imagenesService = inject(ImagenesService);
  private auditoria = inject(AuditoriaService);
  private toast = inject(ToastService);
  auth = inject(AuthService);

  cargado = false;
  pestana: PestanaContenido = 'inicio';
  correoActual = '';

  /** Si venimos de un link del dashboard, aquí guardamos a qué noticia hay que hacer scroll. */
  private noticiaIdParaEnfocar: string | null = null;

  cambiarPestana(pestana: PestanaContenido): void {
    this.pestana = pestana;
  }

  tipoDe = tipoEfectivo;
  estadoDe = estadoEfectivo;

  // ===================== BLOQUE: INICIO (config general del sitio) =====================
  formInicio = this.fb.nonNullable.group({
    accesoTitulo: ['', Validators.required],
    accesoDescripcion: ['', Validators.required],
    accesoVisible: [true],
    informacionParrafo1: ['', Validators.required],
    informacionParrafo2: ['', Validators.required],
    informacionImagen: ['', Validators.required],
    mision: ['', Validators.required],
    vision: ['', Validators.required],
    bannerEyebrow: ['', Validators.required],
    bannerTitulo: ['', Validators.required],
    bannerBoton: ['', Validators.required],
    bannerVisible: [true],
  });
  guardandoInicio = false;

  // ===================== BLOQUE: NOTICIAS =====================
  formNoticias = this.fb.group({
    noticias: this.fb.array<ReturnType<typeof this.crearNoticia>>([]),
  });
  guardandoNoticias = false;

  /** 'lista' = bandeja tipo correo; 'detalle' = editando una sola noticia a la vez. */
  vistaNoticias: 'lista' | 'detalle' = 'lista';
  indiceNoticiaAbierta: number | null = null;
  borradorEncuestaNoticia: BorradorEncuestaNoticia = encuestaNoticiaVacia();

  // ===================== BLOQUE: GALERÍA =====================
  galeria: FotoGaleria[] = [];
  modalGaleriaAbierto = false;
  indiceEditandoFoto: number | null = null;
  borradorFoto: FotoGaleria = { url: '', descripcion: '', autorCorreo: '', estado: 'aprobado', destacada: false };
  archivoSeleccionado: File | null = null;
  subiendoFoto = false;
  modalEliminarFotoIndice: number | null = null;

  // ===================== BLOQUE: CONTACTO =====================
  formContacto = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    facebook: [''],
    instagram: [''],
    x: [''],
    descripcion: ['', Validators.required],
  });
  guardandoContacto = false;

  // ===================== SECCIONES ADICIONALES =====================
  secciones$ = this.seccionesService.secciones$;
  pasoCreacion: 'elegirTipo' | 'llenarDatos' | null = null;
  borrador: BorradorSeccion = borradorVacio();
  seccionEditandoId: string | null = null;
  guardandoSeccion = false;

  constructor() {
    const params = this.route.snapshot.queryParamMap;
    if (params.get('tab')) this.pestana = params.get('tab') as PestanaContenido;
    this.noticiaIdParaEnfocar = params.get('noticia');
    const seccionIdParaEditar = params.get('seccion');

    this.auth.usuario$.pipe(take(1)).subscribe((usuario) => {
      this.correoActual = usuario?.email?.toLowerCase() ?? '';
    });

    this.contenidoService.contenido$.pipe(take(1)).subscribe((contenido) => {
      this.formInicio.patchValue({
        accesoTitulo: contenido.accesoFormularios.titulo,
        accesoDescripcion: contenido.accesoFormularios.descripcion,
        accesoVisible: contenido.accesoFormularios.visible,
        informacionParrafo1: contenido.informacionParrafo1,
        informacionParrafo2: contenido.informacionParrafo2,
        informacionImagen: contenido.informacionImagen,
        mision: contenido.mision,
        vision: contenido.vision,
        bannerEyebrow: contenido.bannerEncuestas.eyebrow,
        bannerTitulo: contenido.bannerEncuestas.titulo,
        bannerBoton: contenido.bannerEncuestas.textoBoton,
        bannerVisible: contenido.bannerEncuestas.visible,
      });

      contenido.noticias.forEach((noticia) => this.noticiasArray.push(this.crearNoticia(noticia)));
      this.galeria = contenido.galeria;
      this.formContacto.patchValue(contenido.contacto);

      this.auth.permisos$.pipe(take(1)).subscribe((permisos) => {
        // La config general del sitio (Inicio, Contacto) la maneja quien puede editar cualquier contenido.
        if (!permisos.editarCualquierContenido) {
          this.formInicio.disable();
          this.formContacto.disable();
        }
        // En Noticias, cada quien puede tocar lo suyo; lo ajeno queda deshabilitado salvo para editarCualquierContenido.
        if (!permisos.editarCualquierContenido) {
          this.noticiasArray.controls.forEach((grupo) => {
            const autor = (grupo.value.autorCorreo as string) ?? '';
            const esPropia = autor === this.correoActual;
            if (!(permisos.crearContenidoPropio && esPropia)) grupo.disable();
          });
        }
        this.cargado = true;

        if (this.noticiaIdParaEnfocar) {
          const indice = this.noticiasArray.controls.findIndex((g) => g.value.id === this.noticiaIdParaEnfocar);
          if (indice !== -1) this.abrirNoticiaDetalle(indice);
        }
      });
    });

    // Si venimos de un link del dashboard hacia una encuesta/sección específica, abrir su edición.
    if (seccionIdParaEditar) {
      this.seccionesService.secciones$.pipe(take(1)).subscribe((secciones) => {
        const seccion = secciones.find((s) => s.id === seccionIdParaEditar);
        if (seccion) this.empezarEdicionSeccion(seccion);
      });
    }
  }

  get noticiasArray(): FormArray {
    return this.formNoticias.get('noticias') as FormArray;
  }

  private crearNoticia(valores?: {
    id: string;
    titulo: string;
    fecha: string;
    resumen: string;
    cuerpoHtml: string;
    videoUrl: string;
    imagen: string;
    imagenAlt: string;
    creadoEn: number;
    autorCorreo: string;
    estado: string;
    destacada?: boolean;
    leidoPor?: string[];
    encuesta?: EncuestaEmbebida | null;
  }) {
    return this.fb.nonNullable.group({
      id: [valores?.id ?? generarId()],
      titulo: [valores?.titulo ?? '', Validators.required],
      fecha: [valores?.fecha ?? '', Validators.required],
      resumen: [valores?.resumen ?? '', Validators.required],
      cuerpoHtml: [valores?.cuerpoHtml ?? ''],
      videoUrl: [valores?.videoUrl ?? ''],
      imagen: [valores?.imagen ?? '', Validators.required],
      imagenAlt: [valores?.imagenAlt ?? '', Validators.required],
      creadoEn: [valores?.creadoEn ?? Date.now()],
      autorCorreo: [valores?.autorCorreo ?? this.correoActual],
      estado: [valores?.estado ?? 'pendiente'],
      destacada: [valores?.destacada ?? false],
      leidoPor: this.fb.nonNullable.control<string[]>(valores?.leidoPor ?? []),
      encuesta: this.fb.control<EncuestaEmbebida | null>(valores?.encuesta ?? null),
    });
  }

  /** true si la persona actual puede editar/eliminar un ítem dado su autor. */
  puedeEditar(permisos: { editarCualquierContenido: boolean; crearContenidoPropio: boolean }, autorCorreo: string): boolean {
    return permisos.editarCualquierContenido || (permisos.crearContenidoPropio && autorCorreo === this.correoActual);
  }

  /**
   * A diferencia de "puedeEditar" (que decide si los campos están
   * habilitados), esto decide si la fila SIQUIERA APARECE en la lista. Un
   * Editor sin permiso de editar cualquier contenido no debe ver las
   * publicaciones de otros usuarios — ni siquiera en modo lectura.
   */
  puedeVerFilaDe(permisos: { editarCualquierContenido: boolean }, autorCorreo: string): boolean {
    return permisos.editarCualquierContenido || autorCorreo === this.correoActual;
  }

  hayNoticiasVisibles(permisos: { editarCualquierContenido: boolean }): boolean {
    return this.noticiasArray.controls.some((c) => this.puedeVerFilaDe(permisos, c.value.autorCorreo));
  }

  hayFotosVisibles(permisos: { editarCualquierContenido: boolean }): boolean {
    return this.galeria.some((f) => this.puedeVerFilaDe(permisos, f.autorCorreo));
  }

  // --- Acciones: Inicio ---

  async guardarInicio(): Promise<void> {
    if (this.formInicio.invalid) {
      this.formInicio.markAllAsTouched();
      this.toast.mostrar('Revisa los campos marcados antes de guardar.');
      return;
    }
    this.guardandoInicio = true;
    const v = this.formInicio.getRawValue();
    try {
      await this.contenidoService.actualizarInicio({
        accesoFormularios: { titulo: v.accesoTitulo, descripcion: v.accesoDescripcion, visible: v.accesoVisible },
        informacionParrafo1: v.informacionParrafo1,
        informacionParrafo2: v.informacionParrafo2,
        informacionImagen: v.informacionImagen,
        mision: v.mision,
        vision: v.vision,
        bannerEncuestas: {
          visible: v.bannerVisible,
          eyebrow: v.bannerEyebrow,
          titulo: v.bannerTitulo,
          textoBoton: v.bannerBoton,
        },
      });
      await this.auditoria.registrar('Editó bloque Inicio', 'Acceso a firma, sobre nosotros, misión y visión', 'publicaciones');
      this.toast.mostrar('Inicio guardado correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar. Intenta de nuevo.');
    } finally {
      this.guardandoInicio = false;
    }
  }

  // --- Acciones: Noticias ---

  agregarNoticia(): void {
    this.noticiasArray.push(this.crearNoticia({
      id: generarId(), titulo: '', fecha: '', resumen: '', cuerpoHtml: '', videoUrl: '', imagen: '', imagenAlt: '',
      creadoEn: Date.now(), autorCorreo: this.correoActual, estado: 'pendiente', destacada: false, leidoPor: [], encuesta: null,
    }));
    this.abrirNoticiaDetalle(this.noticiasArray.length - 1);
  }

  quitarNoticia(indice: number): void {
    this.noticiasArray.removeAt(indice);
    this.volverAListaNoticias();
  }

  async aprobarNoticia(indice: number): Promise<void> {
    this.noticiasArray.at(indice).patchValue({ estado: 'aprobado' });
    try {
      await this.contenidoService.actualizarNoticias(this.noticiasArray.getRawValue());
      await this.auditoria.registrar('Aprobó noticia', this.noticiasArray.at(indice).value.titulo, 'publicaciones');
      this.toast.mostrar('Noticia aprobada.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo aprobar. Intenta de nuevo.');
    }
  }

  async rechazarNoticia(indice: number): Promise<void> {
    this.noticiasArray.at(indice).patchValue({ estado: 'rechazado' });
    try {
      await this.contenidoService.actualizarNoticias(this.noticiasArray.getRawValue());
      await this.auditoria.registrar('Rechazó noticia', this.noticiasArray.at(indice).value.titulo, 'publicaciones');
      this.toast.mostrar('Noticia rechazada.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo rechazar. Intenta de nuevo.');
    }
  }

  /** Clase de color del punto de estatus: verde=aprobado, rojo=rechazado, naranja=en revisión, gris=sin estatus. */
  colorEstadoNoticia(estado: string): string {
    switch (estado as EstadoPublicacion) {
      case 'aprobado': return 'bg-green-600';
      case 'rechazado': return 'bg-red-600';
      case 'pendiente': return 'bg-orange-500';
      default: return 'bg-gray-400';
    }
  }

  etiquetaEstadoNoticia(estado: string): string {
    switch (estado as EstadoPublicacion) {
      case 'aprobado': return 'Aprobada';
      case 'rechazado': return 'No aprobada';
      case 'pendiente': return 'En revisión';
      default: return 'Sin estatus';
    }
  }

  noticiaNoLeida(grupo: { value: { leidoPor?: string[] } }): boolean {
    return !(grupo.value.leidoPor ?? []).includes(this.correoActual);
  }

  async alternarDestacada(indice: number, evento: Event): Promise<void> {
    evento.stopPropagation();
    const grupo = this.noticiasArray.at(indice);
    grupo.patchValue({ destacada: !grupo.value.destacada });
    try {
      await this.contenidoService.actualizarNoticias(this.noticiasArray.getRawValue());
    } catch (err) {
      console.error(err);
    }
  }

  /** Abre una noticia en la vista de detalle (a pantalla completa) y la marca como leída. */
  abrirNoticiaDetalle(indice: number): void {
    this.indiceNoticiaAbierta = indice;
    this.vistaNoticias = 'detalle';

    const grupo = this.noticiasArray.at(indice);
    const encuestaActual = grupo.value.encuesta as EncuestaEmbebida | null | undefined;
    if (encuestaActual) {
      this.borradorEncuestaNoticia = {
        activa: true,
        numeroPreguntas: encuestaActual.preguntas.length,
        preguntas: encuestaActual.preguntas.map((p) => ({ texto: p.texto, opciones: [...p.opciones] })),
        tipoResultado: encuestaActual.tipoResultado,
        tipoGrafico: encuestaActual.tipoGrafico ?? 'barras',
        fechaLimite: encuestaActual.fechaLimite ?? '',
      };
    } else {
      this.borradorEncuestaNoticia = encuestaNoticiaVacia();
    }

    const id = grupo.value.id as string;
    if (this.noticiaNoLeida(grupo)) {
      grupo.patchValue({ leidoPor: [...(grupo.value.leidoPor ?? []), this.correoActual] });
      this.contenidoService.marcarNoticiaLeida(id, this.correoActual).catch((err) => console.error(err));
    }
  }

  volverAListaNoticias(): void {
    this.vistaNoticias = 'lista';
    this.indiceNoticiaAbierta = null;
  }

  // --- Encuesta embebida dentro de la noticia abierta ---

  ajustarNumeroPreguntasNoticia(): void {
    const n = Math.max(1, Math.min(20, this.borradorEncuestaNoticia.numeroPreguntas || 1));
    this.borradorEncuestaNoticia.numeroPreguntas = n;
    const actuales = this.borradorEncuestaNoticia.preguntas;
    if (actuales.length < n) {
      for (let i = actuales.length; i < n; i++) actuales.push({ texto: '', opciones: ['', ''] });
    } else if (actuales.length > n) {
      actuales.length = n;
    }
  }

  agregarOpcionNoticia(indicePregunta: number): void {
    this.borradorEncuestaNoticia.preguntas[indicePregunta].opciones.push('');
  }

  quitarOpcionNoticia(indicePregunta: number, indiceOpcion: number): void {
    const opciones = this.borradorEncuestaNoticia.preguntas[indicePregunta].opciones;
    if (opciones.length <= 2) return;
    opciones.splice(indiceOpcion, 1);
  }

  /** Antes de guardar, vuelca el borrador de encuesta (si está activa) al FormGroup de la noticia abierta. */
  private sincronizarEncuestaEnNoticiaAbierta(): void {
    if (this.indiceNoticiaAbierta === null) return;
    const grupo = this.noticiasArray.at(this.indiceNoticiaAbierta);

    if (!this.borradorEncuestaNoticia.activa) {
      grupo.patchValue({ encuesta: null });
      return;
    }

    const esGrafico = this.borradorEncuestaNoticia.tipoResultado === 'grafico';
    const encuesta: EncuestaEmbebida = {
      preguntas: this.borradorEncuestaNoticia.preguntas.map((p) => ({
        texto: p.texto,
        opciones: esGrafico ? p.opciones.map((o) => o.trim()).filter(Boolean) : [],
      })),
      tipoResultado: this.borradorEncuestaNoticia.tipoResultado,
      // Firestore rechaza campos en "undefined" — se omiten por completo en vez de asignarlos.
      ...(esGrafico ? { tipoGrafico: this.borradorEncuestaNoticia.tipoGrafico } : {}),
      ...(this.borradorEncuestaNoticia.fechaLimite ? { fechaLimite: this.borradorEncuestaNoticia.fechaLimite } : {}),
    };
    grupo.patchValue({ encuesta });
  }

  async guardarNoticias(): Promise<void> {
    this.sincronizarEncuestaEnNoticiaAbierta();

    if (this.formNoticias.invalid) {
      this.formNoticias.markAllAsTouched();
      this.toast.mostrar('Revisa los campos marcados antes de guardar.');
      return;
    }
    this.guardandoNoticias = true;
    try {
      await this.contenidoService.actualizarNoticias(this.noticiasArray.getRawValue());
      await this.auditoria.registrar('Editó noticias', `${this.noticiasArray.length} noticias`, 'publicaciones');
      this.toast.mostrar('Noticias guardadas correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar. Intenta de nuevo.');
    } finally {
      this.guardandoNoticias = false;
    }
  }

  // --- Acciones: Galería (con modal) ---

  abrirModalCrearFoto(): void {
    this.indiceEditandoFoto = null;
    this.borradorFoto = { url: '', descripcion: '', autorCorreo: this.correoActual, estado: 'pendiente', destacada: false };
    this.archivoSeleccionado = null;
    this.modalGaleriaAbierto = true;
  }

  abrirModalEditarFoto(indice: number): void {
    this.indiceEditandoFoto = indice;
    this.borradorFoto = { ...this.galeria[indice] };
    this.archivoSeleccionado = null;
    this.modalGaleriaAbierto = true;
  }

  cerrarModalGaleria(): void {
    this.modalGaleriaAbierto = false;
  }

  onArchivoSeleccionado(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    this.archivoSeleccionado = input.files?.[0] ?? null;
  }

  async guardarFotoModal(): Promise<void> {
    this.subiendoFoto = true;
    try {
      let urlFinal = this.borradorFoto.url;
      if (this.archivoSeleccionado) {
        urlFinal = await this.imagenesService.subirImagen(this.archivoSeleccionado, 'galeria');
      }

      if (this.indiceEditandoFoto === null) {
        const foto: FotoGaleria = {
          url: urlFinal,
          descripcion: this.borradorFoto.descripcion,
          autorCorreo: this.correoActual,
          estado: 'pendiente',
          destacada: false,
        };
        await this.contenidoService.agregarFotoGaleria(foto);
        this.galeria = [...this.galeria, foto];
        await this.auditoria.registrar('Agregó foto a la galería', foto.descripcion, 'publicaciones');
        this.toast.mostrar('Foto agregada correctamente.');
      } else {
        const foto: FotoGaleria = { ...this.borradorFoto, url: urlFinal };
        await this.contenidoService.actualizarFotoGaleria(this.indiceEditandoFoto, foto);
        this.galeria[this.indiceEditandoFoto] = foto;
        await this.auditoria.registrar('Editó foto de la galería', foto.descripcion, 'publicaciones');
        this.toast.mostrar('Foto actualizada correctamente.');
      }
      this.modalGaleriaAbierto = false;
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar la foto. Intenta de nuevo.');
    } finally {
      this.subiendoFoto = false;
    }
  }

  async aprobarFoto(indice: number): Promise<void> {
    try {
      await this.contenidoService.aprobarFotoGaleria(indice);
      this.galeria[indice] = { ...this.galeria[indice], estado: 'aprobado' };
      await this.auditoria.registrar('Aprobó foto de la galería', this.galeria[indice].descripcion, 'publicaciones');
      this.toast.mostrar('Foto aprobada.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo aprobar. Intenta de nuevo.');
    }
  }

  /** Solo puede haber una foto destacada a la vez: al marcar una, se desmarcan las demás. */
  async alternarFotoDestacada(indice: number): Promise<void> {
    const nuevoEstado = !this.galeria[indice].destacada;
    const nuevaGaleria = this.galeria.map((foto, i) => ({
      ...foto,
      destacada: i === indice ? nuevoEstado : false,
    }));
    try {
      for (let i = 0; i < nuevaGaleria.length; i++) {
        if (nuevaGaleria[i].destacada !== this.galeria[i].destacada) {
          await this.contenidoService.actualizarFotoGaleria(i, nuevaGaleria[i]);
        }
      }
      this.galeria = nuevaGaleria;
      await this.auditoria.registrar(
        nuevoEstado ? 'Marcó foto como destacada' : 'Quitó foto destacada',
        this.galeria[indice].descripcion,
        'publicaciones'
      );
      this.toast.mostrar(nuevoEstado ? 'Foto marcada como destacada.' : 'Foto ya no está destacada.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo actualizar. Intenta de nuevo.');
    }
  }

  abrirModalEliminarFoto(indice: number): void {
    this.modalEliminarFotoIndice = indice;
  }

  cerrarModalEliminarFoto(): void {
    this.modalEliminarFotoIndice = null;
  }

  async confirmarEliminarFoto(): Promise<void> {
    if (this.modalEliminarFotoIndice === null) return;
    const foto = this.galeria[this.modalEliminarFotoIndice];
    try {
      await this.contenidoService.eliminarFotoGaleria(this.modalEliminarFotoIndice);
      this.galeria.splice(this.modalEliminarFotoIndice, 1);
      await this.auditoria.registrar('Eliminó foto de la galería', foto?.descripcion ?? '', 'publicaciones');
      this.toast.mostrar('Foto eliminada correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo eliminar la foto. Intenta de nuevo.');
    } finally {
      this.modalEliminarFotoIndice = null;
    }
  }

  // --- Acciones: Contacto ---

  async guardarContacto(): Promise<void> {
    if (this.formContacto.invalid) {
      this.formContacto.markAllAsTouched();
      this.toast.mostrar('Revisa los campos marcados antes de guardar.');
      return;
    }
    this.guardandoContacto = true;
    try {
      await this.contenidoService.actualizarContacto(this.formContacto.getRawValue());
      await this.auditoria.registrar('Editó datos de contacto', '', 'publicaciones');
      this.toast.mostrar('Contacto guardado correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar. Intenta de nuevo.');
    } finally {
      this.guardandoContacto = false;
    }
  }

  // --- Acciones: Secciones adicionales ---

  abrirAsistenteCreacion(): void {
    this.borrador = borradorVacio();
    this.seccionEditandoId = null;
    this.pasoCreacion = 'elegirTipo';
  }

  elegirTipoSeccion(tipo: 'informativa' | 'encuesta'): void {
    this.borrador.tipo = tipo;
    this.pasoCreacion = 'llenarDatos';
  }

  cancelarAsistente(): void {
    this.pasoCreacion = null;
    this.seccionEditandoId = null;
  }

  ajustarNumeroPreguntas(): void {
    const n = Math.max(1, Math.min(20, this.borrador.numeroPreguntas || 1));
    this.borrador.numeroPreguntas = n;
    const actuales = this.borrador.preguntas;
    if (actuales.length < n) {
      for (let i = actuales.length; i < n; i++) actuales.push({ texto: '', opciones: ['', ''] });
    } else if (actuales.length > n) {
      actuales.length = n;
    }
  }

  agregarOpcion(indicePregunta: number): void {
    this.borrador.preguntas[indicePregunta].opciones.push('');
  }

  quitarOpcion(indicePregunta: number, indiceOpcion: number): void {
    const opciones = this.borrador.preguntas[indicePregunta].opciones;
    if (opciones.length <= 2) return;
    opciones.splice(indiceOpcion, 1);
  }

  private construirDatosParaGuardar(estado: 'pendiente' | 'aprobado'): Omit<SeccionPagina, 'id' | 'orden'> {
    if (this.borrador.tipo === 'informativa') {
      return {
        tipo: 'informativa',
        titulo: this.borrador.titulo,
        contenido: this.borrador.contenido,
        imagen: this.borrador.imagen,
        enlaceUrl: this.borrador.enlaceUrl,
        textoBoton: this.borrador.textoBoton,
        autorCorreo: this.correoActual,
        estado,
      };
    }
    const esGrafico = this.borrador.tipoResultado === 'grafico';
    const preguntas: PreguntaEncuesta[] = this.borrador.preguntas.map((p) => ({
      texto: p.texto,
      opciones: esGrafico ? p.opciones.map((o) => o.trim()).filter(Boolean) : [],
    }));
    return {
      tipo: 'encuesta',
      titulo: this.borrador.titulo,
      preguntas,
      tipoResultado: this.borrador.tipoResultado,
      // Firestore rechaza campos en "undefined" — se omiten por completo en vez de asignarlos.
      ...(esGrafico ? { tipoGrafico: this.borrador.tipoGrafico } : {}),
      ...(this.borrador.fechaLimite ? { fechaLimite: this.borrador.fechaLimite } : {}),
      autorCorreo: this.correoActual,
      estado,
    };
  }

  private validarBorrador(): string | null {
    if (!this.borrador.titulo.trim()) return 'Falta el título de la sección.';
    if (this.borrador.tipo === 'informativa' && !this.borrador.contenido.trim()) {
      return 'Falta el contenido de la sección.';
    }
    if (this.borrador.tipo === 'encuesta') {
      const esGrafico = this.borrador.tipoResultado === 'grafico';
      for (const p of this.borrador.preguntas) {
        if (!p.texto.trim()) return 'Cada pregunta necesita un texto.';
        if (esGrafico) {
          const opciones = p.opciones.map((o) => o.trim()).filter(Boolean);
          if (opciones.length < 2) return 'Cada pregunta necesita al menos 2 opciones.';
        }
      }
    }
    return null;
  }

  async guardarSeccion(puedeAprobarPropio: boolean): Promise<void> {
    const errorValidacion = this.validarBorrador();
    if (errorValidacion) {
      this.toast.mostrar(errorValidacion);
      return;
    }

    this.guardandoSeccion = true;
    try {
      const estado: 'pendiente' | 'aprobado' = puedeAprobarPropio ? 'aprobado' : 'pendiente';
      const datos = this.construirDatosParaGuardar(estado);
      if (this.seccionEditandoId) {
        const { autorCorreo, estado: _e, ...datosSinAutoria } = datos;
        await this.seccionesService.actualizarSeccion(this.seccionEditandoId, datosSinAutoria);
        await this.auditoria.registrar('Editó sección', this.borrador.titulo, 'publicaciones');
        this.toast.mostrar('Sección guardada correctamente.');
      } else {
        await this.seccionesService.crearSeccion(datos);
        await this.auditoria.registrar('Creó sección', `${this.borrador.titulo} (${this.borrador.tipo})`, 'publicaciones');
        this.toast.mostrar('Sección creada correctamente.');
      }
      this.pasoCreacion = null;
      this.seccionEditandoId = null;
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar la sección. Intenta de nuevo.');
    } finally {
      this.guardandoSeccion = false;
    }
  }

  empezarEdicionSeccion(seccion: SeccionPagina): void {
    this.seccionEditandoId = seccion.id ?? null;
    const tipo = tipoEfectivo(seccion);
    this.borrador = {
      tipo,
      titulo: seccion.titulo,
      contenido: seccion.contenido ?? '',
      imagen: seccion.imagen ?? '',
      enlaceUrl: seccion.enlaceUrl ?? '',
      textoBoton: seccion.textoBoton ?? '',
      numeroPreguntas: seccion.preguntas?.length ?? 1,
      preguntas: seccion.preguntas?.length
        ? seccion.preguntas.map((p) => ({ texto: p.texto, opciones: p.opciones.length ? [...p.opciones] : ['', ''] }))
        : [{ texto: '', opciones: ['', ''] }],
      tipoResultado: seccion.tipoResultado ?? 'tabla',
      tipoGrafico: seccion.tipoGrafico ?? 'barras',
      fechaLimite: seccion.fechaLimite ?? '',
    };
    this.pasoCreacion = 'llenarDatos';
  }

  async aprobarSeccion(seccion: SeccionPagina): Promise<void> {
    if (!seccion.id) return;
    try {
      await this.seccionesService.aprobarSeccion(seccion.id);
      await this.auditoria.registrar('Aprobó sección', seccion.titulo, 'publicaciones');
      this.toast.mostrar('Sección aprobada.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo aprobar. Intenta de nuevo.');
    }
  }

  async eliminarSeccion(seccion: SeccionPagina): Promise<void> {
    if (!seccion.id) return;
    const confirmado = confirm(`¿Eliminar la sección "${seccion.titulo}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;
    try {
      await this.seccionesService.eliminarSeccion(seccion.id);
      await this.auditoria.registrar('Eliminó sección', seccion.titulo, 'publicaciones');
      this.toast.mostrar('Sección eliminada correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo eliminar la sección. Intenta de nuevo.');
    }
  }
}

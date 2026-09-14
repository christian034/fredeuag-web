import { Component, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {
  ClassicEditor,
  Essentials,
  Bold,
  Italic,
  Underline,
  Heading,
  Paragraph,
  Alignment,
  List,
  BlockQuote,
  Link,
  Table,
  TableToolbar,
  Image,
  ImageToolbar,
  ImageCaption,
  ImageStyle,
  ImageResize,
  ImageInsertViaUrl,
  Undo,
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { ImagenesService } from './services/imagenes.service';

/**
 * Editor de texto enriquecido para el cuerpo de las noticias.
 * Usa el paquete modular de CKEditor 5: negritas, cursivas, subrayado, títulos,
 * alineación (izquierda/centro/derecha/justificado, como en Word), listas,
 * citas, enlaces, tablas, e imágenes.
 *
 * El botón "Insertar imagen" vive FUERA de la barra de herramientas de
 * CKEditor (es un botón normal de Angular arriba del editor) — el sistema de
 * plugins personalizados de CKEditor no estaba registrando el botón dentro
 * de su propia barra en esta combinación de versiones, así que lo sacamos de
 * ahí por completo. Sigue usando el mismo mecanismo de subida que ya
 * funciona en el resto del panel (ImagenesService + Firebase Storage); solo
 * le pide al editor, ya con la URL en mano, que la inserte.
 */
@Component({
  selector: 'app-editor-texto',
  standalone: true,
  imports: [CommonModule, CKEditorModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorTextoComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-muted">Usa la barra de abajo para formato — para imágenes, usa este botón:</span>
      <button
        type="button"
        [disabled]="disabled || subiendo"
        (click)="abrirSelectorDeArchivo()"
        class="text-sm text-accent hover:text-accentDark underline underline-offset-2 disabled:opacity-50"
      >{{ subiendo ? 'Subiendo imagen…' : '+ Insertar imagen' }}</button>
    </div>
    <ckeditor
      [editor]="Editor"
      [config]="configuracion"
      [data]="valorInicial"
      [disabled]="disabled"
      (ready)="onReady($event)"
      (change)="onChangeEditor()"
      (blur)="onTouched()"
    ></ckeditor>
  `,
})
export class EditorTextoComponent implements ControlValueAccessor {
  private imagenesService = inject(ImagenesService);

  // Se tipa como `any` a propósito: puede haber desajustes de tipos entre
  // @ckeditor/ckeditor5-angular y el paquete modular "ckeditor5" según la
  // combinación exacta de versiones instaladas, aunque en tiempo de
  // ejecución son perfectamente compatibles.
  Editor: any = ClassicEditor;
  private instanciaEditor: any = null;

  configuracion = {
    licenseKey: 'GPL',
    plugins: [
      Essentials, Paragraph, Heading, Bold, Italic, Underline, Alignment, List, BlockQuote, Link,
      Table, TableToolbar, Image, ImageToolbar, ImageCaption, ImageStyle, ImageResize, ImageInsertViaUrl,
      Undo,
    ],
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'underline', '|',
      'alignment', '|',
      'bulletedList', 'numberedList', '|',
      'link', 'insertImage', 'insertTable', 'blockQuote', '|',
      'undo', 'redo',
    ],
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
    image: {
      toolbar: [
        'imageStyle:inline', 'imageStyle:block', 'imageStyle:side', '|',
        'toggleImageCaption', '|',
        'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original',
      ],
      resizeUnit: '%' as const,
    },
  };

  /**
   * Este valor solo se usa para CARGAR el editor (la primera vez, o cuando se
   * abre una noticia distinta). No se vuelve a actualizar en cada tecleo —
   * si lo hiciéramos, el binding [data] le diría al editor "carga este
   * contenido desde cero" en cada cambio, y el cursor saltaría siempre al
   * principio en vez de quedarse donde el usuario está escribiendo.
   */
  valorInicial = '';
  disabled = false;
  subiendo = false;

  private onChange: (valor: string) => void = () => {};
  onTouched: () => void = () => {};

  onReady(evento: any): void {
    // Según la versión, el evento "ready" a veces entrega { editor: ... } y a veces el editor directo.
    const editor = evento?.editor ?? evento;
    if (editor?.plugins) {
      this.instanciaEditor = editor;
    }
  }

  /** Abre el explorador de archivos del sistema y sube la imagen elegida a Firebase Storage. */
  abrirSelectorDeArchivo(): void {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async () => {
      const archivo = input.files?.[0];
      if (!archivo || !this.instanciaEditor) return;

      this.subiendo = true;
      try {
        const url = await this.imagenesService.subirImagen(archivo, 'noticias');
        this.instanciaEditor.execute('insertImage', { source: url });
      } catch (err) {
        console.error('No se pudo subir la imagen a Storage.', err);
        alert('No se pudo subir la imagen. Revisa tu conexión o las reglas de Storage.');
      } finally {
        this.subiendo = false;
      }
    };
    input.click();
  }

  /**
   * No dependemos de la forma del objeto que emite el evento "change" (cambió
   * entre versiones de @ckeditor/ckeditor5-angular) — usamos siempre la
   * instancia del editor que ya guardamos en onReady().
   */
  onChangeEditor(): void {
    if (!this.instanciaEditor) return;
    const data = this.instanciaEditor.getData() as string;
    // Ojo: aquí NO se actualiza "valorInicial" — solo se le avisa al
    // formulario del cambio. Si actualizáramos también el valor ligado al
    // [data] del editor, se reiniciaría el cursor al principio en cada tecla.
    this.onChange(data);
  }

  writeValue(valor: string): void {
    const nuevo = valor ?? '';
    // Si el editor ya existe y su contenido actual es distinto al que llega
    // (por ejemplo, se abrió una noticia diferente), sí hay que cargarlo de
    // verdad. Si es el mismo contenido que el editor ya tiene (el caso normal
    // mientras el usuario escribe, ya que el propio cambio vuelve aquí a
    // través del formulario), no tocamos nada para no perder la posición del
    // cursor.
    if (this.instanciaEditor && this.instanciaEditor.getData() !== nuevo) {
      this.instanciaEditor.setData(nuevo);
    }
    this.valorInicial = nuevo;
  }

  registerOnChange(fn: (valor: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}

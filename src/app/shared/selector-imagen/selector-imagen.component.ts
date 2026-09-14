import { Component, forwardRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ImagenesService } from '../services/imagenes.service';

/**
 * Campo de "URL de la imagen" con un botón que abre un modal para pegar una URL
 * o subir un archivo, mostrando una vista previa antes de confirmar — reutilizable
 * en cualquier formulario del panel (basta con usarlo como formControlName o ngModel).
 */
@Component({
  selector: 'app-selector-imagen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectorImagenComponent),
      multi: true,
    },
  ],
  template: `
    <div class="flex items-center gap-3">
      <div class="w-16 h-16 border border-line bg-base flex-shrink-0 overflow-hidden flex items-center justify-center">
        <img *ngIf="valor" [src]="valor" alt="" class="w-full h-full object-cover" />
        <span *ngIf="!valor" class="text-xs text-muted">Sin imagen</span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-xs text-muted truncate">{{ valor || 'No se ha elegido ninguna imagen' }}</p>
        <button type="button" [disabled]="disabled" (click)="abrirModal()" class="text-sm text-accent hover:text-accentDark underline underline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed">
          {{ valor ? 'Cambiar imagen' : 'Agregar imagen' }}
        </button>
      </div>
    </div>

    <div *ngIf="modalAbierto" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div class="bg-surface border border-line w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="font-display text-lg font-medium mb-4">Elegir imagen</h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-muted mb-1">Pegar una URL</label>
            <input
              type="text"
              [ngModel]="urlBorrador"
              (ngModelChange)="onUrlChange($event)"
              [ngModelOptions]="{standalone: true}"
              placeholder="https://…"
              class="w-full bg-base border border-line focus:border-accent px-3 py-2 text-bone rounded-none"
            />
          </div>
          <p class="text-xs text-muted text-center">— o —</p>
          <div>
            <label class="block text-sm text-muted mb-1">Subir desde tu equipo</label>
            <input type="file" accept="image/*" (change)="onArchivo($event)" class="w-full text-sm" />
          </div>

          <div *ngIf="previsualizacion" class="border border-line bg-base p-2">
            <p class="text-xs text-muted mb-2">Vista previa</p>
            <img [src]="previsualizacion" alt="Vista previa" class="w-full h-40 object-cover" />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <button type="button" (click)="cerrarModal()" class="text-sm text-muted hover:underline px-4 py-2">Cancelar</button>
          <button
            type="button"
            [disabled]="subiendo || !previsualizacion"
            (click)="confirmar()"
            class="bg-accent hover:bg-accentDark disabled:opacity-60 text-white text-sm font-medium px-5 py-2 transition-colors"
          >{{ subiendo ? 'Subiendo…' : 'Usar esta imagen' }}</button>
        </div>
      </div>
    </div>
  `,
})
export class SelectorImagenComponent implements ControlValueAccessor {
  private imagenesService = inject(ImagenesService);

  valor = '';
  disabled = false;

  modalAbierto = false;
  urlBorrador = '';
  archivoSeleccionado: File | null = null;
  previsualizacion: string | null = null;
  subiendo = false;

  private onChange: (valor: string) => void = () => {};
  private onTouched: () => void = () => {};

  abrirModal(): void {
    this.urlBorrador = this.valor;
    this.archivoSeleccionado = null;
    this.previsualizacion = this.valor || null;
    this.modalAbierto = true;
  }

  cerrarModal(): void {
    this.modalAbierto = false;
    this.onTouched();
  }

  onUrlChange(valor: string): void {
    this.urlBorrador = valor;
    this.archivoSeleccionado = null;
    this.previsualizacion = valor || null;
  }

  onArchivo(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    const archivo = input.files?.[0] ?? null;
    this.archivoSeleccionado = archivo;
    if (archivo) {
      this.urlBorrador = '';
      this.previsualizacion = URL.createObjectURL(archivo);
    }
  }

  async confirmar(): Promise<void> {
    this.subiendo = true;
    try {
      let urlFinal = this.urlBorrador;
      if (this.archivoSeleccionado) {
        urlFinal = await this.imagenesService.subirImagen(this.archivoSeleccionado, 'contenido');
      }
      this.valor = urlFinal;
      this.onChange(this.valor);
      this.onTouched();
      this.modalAbierto = false;
    } finally {
      this.subiendo = false;
    }
  }

  writeValue(valor: string): void {
    this.valor = valor ?? '';
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

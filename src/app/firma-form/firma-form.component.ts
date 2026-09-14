import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { FirmasService } from '../shared/services/firmas.service';
import { ContenidoService } from '../shared/services/contenido.service';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';

const REGIONES_GUERRERO = [
  'Acapulco',
  'Centro',
  'Costa Chica',
  'Costa Grande',
  'La Montaña',
  'Norte',
  'Tierra Caliente',
  'Sierra',
];

const NIVELES_EDUCATIVOS = ['Medio superior', 'Superior', 'Posgrado'];
const TIPOS_TRABAJADOR = ['STTAISUAGRO', 'STAUAG'];

@Component({
  selector: 'app-firma-form',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ReactiveFormsModule, RouterLink, SiteFooterComponent, FondoPublicoComponent],
  templateUrl: './firma-form.component.html',
})
export class FirmaFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private firmasService = inject(FirmasService);
  private contenidoService = inject(ContenidoService);
  private cdr = inject(ChangeDetectorRef);
  contenido$ = this.contenidoService.contenidoPublico$;

  tipo: 'alumno' | 'trabajador' =
    (this.route.snapshot.data['tipo'] as 'alumno' | 'trabajador') ?? 'alumno';

  regiones = REGIONES_GUERRERO;
  opcionesCategoria = this.tipo === 'alumno' ? NIVELES_EDUCATIVOS : TIPOS_TRABAJADOR;

  enviando = false;
  error: string | null = null;
  enviadoConExito = false;
  mostrarModalExito = false;

  form = this.fb.nonNullable.group({
    identificador: [
      '',
      [
        Validators.required,
        Validators.pattern(this.tipo === 'alumno' ? /^\d{8}$/ : /^\d+$/),
      ],
    ],
    nombres: ['', [Validators.required, Validators.minLength(2)]],
    apellidoPaterno: ['', [Validators.required, Validators.minLength(2)]],
    apellidoMaterno: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    unidad: ['', [Validators.required]],
    categoria: ['', this.tipo === 'alumno' ? [] : [Validators.required]],
    region: ['', [Validators.required]],
  });

  get mensajeErrorIdentificador(): string {
    return this.tipo === 'alumno'
      ? 'La matrícula debe tener exactamente 8 dígitos numéricos.'
      : 'El número de trabajador solo puede contener dígitos.';
  }

  /** Filtra el campo para que solo acepte dígitos (y, en el caso de alumno, máximo 8). */
  soloNumeros(evento: Event): void {
    const input = evento.target as HTMLInputElement;
    let valor = input.value.replace(/\D/g, '');
    if (this.tipo === 'alumno') valor = valor.slice(0, 8);
    input.value = valor;
    this.form.controls.identificador.setValue(valor, { emitEvent: false });
  }

  get etiquetaIdentificador(): string {
    return this.tipo === 'alumno' ? 'Matrícula' : 'Número de trabajador';
  }

  get etiquetaUnidad(): string {
    return this.tipo === 'alumno' ? 'Escuela' : 'Adscrito';
  }

  get etiquetaCategoria(): string {
    return this.tipo === 'alumno' ? 'Nivel educativo' : 'Tipo de trabajador';
  }

  async enviar(): Promise<void> {
    this.error = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Revisa los campos marcados antes de continuar.';
      return;
    }

    this.enviando = true;
    const valores = this.form.getRawValue();

    const limiteDeTiempo = new Promise<never>((_, rechazar) =>
      setTimeout(() => rechazar(new Error('tiempo-agotado')), 15000)
    );

    try {
      // Nota: ya no verificamos aquí si el correo está repetido — esa consulta
      // necesitaba leer la colección "firmas", y las reglas de seguridad
      // correctamente NO permiten que el público (sin sesión) lea los datos
      // de otros firmantes. El mecanismo real que evita duplicados sigue
      // intacto: el ID del documento se arma con la matrícula/número de
      // trabajador, y las reglas bloquean sobrescribir uno ya existente
      // (ver el bloque catch de abajo).
      await Promise.race([
        this.firmasService.guardarFirma({
          tipo: this.tipo,
          identificador: valores.identificador,
          nombres: valores.nombres,
          apellidoPaterno: valores.apellidoPaterno,
          apellidoMaterno: valores.apellidoMaterno,
          correo: valores.correo,
          unidad: valores.unidad,
          categoria: valores.categoria,
          region: valores.region,
        }),
        limiteDeTiempo,
      ]);

      this.enviadoConExito = true;
      this.mostrarModalExito = true;
      this.cdr.markForCheck();
      setTimeout(() => this.router.navigate(['/']), 2800);
    } catch (err) {
      // Si el documento ya existe (misma matrícula/número), Firestore
      // rechaza el "update" implícito por las reglas de seguridad.
      if (err instanceof FirebaseError && err.code === 'permission-denied') {
        this.error = `Ya existe una firma registrada con ${this.etiquetaIdentificador.toLowerCase()} "${valores.identificador}".`;
      } else if (err instanceof Error && err.message === 'tiempo-agotado') {
        this.error = 'La operación está tardando demasiado. Revisa tu conexión a internet e intenta de nuevo.';
      } else {
        console.error(err);
        this.error = 'No se pudo guardar tu firma. Intenta de nuevo en unos segundos.';
      }
    } finally {
      this.enviando = false;
      this.cdr.markForCheck();
    }
  }
}

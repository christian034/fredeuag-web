import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Firestore, collection, collectionData, deleteDoc, doc, setDoc } from '@angular/fire/firestore';
import { initializeApp, deleteApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AdminNavComponent } from '../shared/admin-nav.component';
import { AuthService, Rol } from '../shared/services/auth.service';
import { AuditoriaService } from '../shared/services/auditoria.service';
import { ToastService } from '../shared/services/toast.service';
import { environment } from '../../environments/environment';

/** El rol que se asigna automáticamente a cualquier cuenta nueva. */
const ROL_MINIMO: Rol = 'visor';

/** Todos los roles, del más alto al más bajo — el orden importa para el límite de ascenso. */
const TODOS_LOS_ROLES: Rol[] = ['admin', 'fundador', 'supervisor', 'editor', 'visor'];

interface UsuarioConRol {
  correo: string;
  usuario?: string;
  rol: Rol;
  activo?: boolean; // ausente o true = activo; false = desactivado (sin acceso, pero reversible)
}

@Component({
  selector: 'app-admin-usuarios',
  standalone: true,
  imports: [CommonModule, AsyncPipe, ReactiveFormsModule, FormsModule, AdminNavComponent],
  templateUrl: './admin-usuarios.component.html',
})
export class AdminUsuariosComponent {
  private fb = inject(FormBuilder);
  private firestore: Firestore = inject(Firestore);
  private auditoria = inject(AuditoriaService);
  private toast = inject(ToastService);
  auth = inject(AuthService);

  usuarios$: Observable<UsuarioConRol[]> = collectionData(
    collection(this.firestore, 'usuarios')
  ) as Observable<UsuarioConRol[]>;

  guardando = false;
  error: string | null = null;
  exito: string | null = null;

  editandoCorreo: string | null = null;
  nombreEnEdicion = '';

  /** Usuario que se está por eliminar (null = modal cerrado). */
  usuarioAEliminar: UsuarioConRol | null = null;

  form = this.fb.nonNullable.group({
    usuario: ['', [Validators.required, Validators.minLength(2)]],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  /** true si el usuario está activo (el campo puede no existir en cuentas antiguas — se trata como activo). */
  estaActivo(usuarioRow: UsuarioConRol): boolean {
    return usuarioRow.activo !== false;
  }

  /**
   * Roles que quien tiene "miRol" puede asignar a otros:
   * - admin: todos, incluido admin.
   * - fundador: todos excepto admin (hasta su propio rango).
   * - cualquier otro rol: ninguno (no debería llegar a usar esto de todos modos).
   */
  rolesAsignables(miRol: Rol | null): Rol[] {
    if (miRol === 'admin') return TODOS_LOS_ROLES;
    if (miRol === 'fundador') return TODOS_LOS_ROLES.filter((r) => r !== 'admin');
    return [];
  }

  /**
   * true si quien tiene "miRol" puede tocar el rol de una fila cuyo rol actual
   * es "rolDeLaFila" — evita, por ejemplo, que un fundador le quite el rol a
   * un admin (aunque tampoco pueda asignarlo, tampoco debe poder quitárselo).
   */
  puedeEditarFila(miRol: Rol | null, rolDeLaFila: Rol): boolean {
    return this.rolesAsignables(miRol).includes(rolDeLaFila);
  }

  /**
   * Crea la cuenta real en Firebase Authentication usando una app secundaria
   * (así no se cierra la sesión de quien está creando el usuario), y guarda
   * su rol inicial (el de menor privilegio) en Firestore.
   */
  async crearUsuario(): Promise<void> {
    this.error = null;
    this.exito = null;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const { usuario, correo, password } = this.form.getRawValue();
    const correoNormalizado = correo.trim().toLowerCase();

    const appSecundaria = initializeApp(environment.firebase, `secundaria-${Date.now()}`);
    try {
      const authSecundaria = getAuth(appSecundaria);
      const credencial = await createUserWithEmailAndPassword(authSecundaria, correoNormalizado, password);
      await updateProfile(credencial.user, { displayName: usuario });
      await signOut(authSecundaria);

      await setDoc(doc(this.firestore, 'usuarios', correoNormalizado), {
        correo: correoNormalizado,
        usuario,
        rol: ROL_MINIMO,
        activo: true,
      });

      await this.auditoria.registrar('Creó usuario', `${correoNormalizado} (rol inicial: ${ROL_MINIMO})`, 'usuarios');
      this.exito = `Cuenta creada para ${correoNormalizado} con rol "${ROL_MINIMO}".`;
      this.toast.mostrar('Usuario creado correctamente.');
      this.form.reset({ usuario: '', correo: '', password: '' });
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'auth/email-already-in-use') {
        this.error = 'Ya existe una cuenta con ese correo.';
      } else if (err?.code === 'auth/weak-password') {
        this.error = 'La contraseña debe tener al menos 6 caracteres.';
      } else {
        this.error = 'No se pudo crear la cuenta. Intenta de nuevo.';
      }
      this.toast.mostrar('No se pudo crear el usuario.');
    } finally {
      await deleteApp(appSecundaria);
      this.guardando = false;
    }
  }

  empezarEdicionNombre(usuarioRow: UsuarioConRol): void {
    this.editandoCorreo = usuarioRow.correo;
    this.nombreEnEdicion = usuarioRow.usuario ?? '';
  }

  cancelarEdicionNombre(): void {
    this.editandoCorreo = null;
  }

  async guardarNombre(usuarioRow: UsuarioConRol): Promise<void> {
    try {
      await setDoc(
        doc(this.firestore, 'usuarios', usuarioRow.correo),
        { correo: usuarioRow.correo, usuario: this.nombreEnEdicion, rol: usuarioRow.rol },
        { merge: true }
      );
      await this.auditoria.registrar('Editó nombre de usuario', `${usuarioRow.correo} → ${this.nombreEnEdicion}`, 'usuarios');
      this.toast.mostrar('Nombre actualizado correctamente.');
      this.editandoCorreo = null;
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo guardar. Intenta de nuevo.');
    }
  }

  async cambiarRol(usuarioRow: UsuarioConRol, nuevoRol: Rol, miRol: Rol | null): Promise<void> {
    // Defensa extra, además de que la interfaz ya solo muestra opciones permitidas.
    if (!this.rolesAsignables(miRol).includes(nuevoRol) || !this.puedeEditarFila(miRol, usuarioRow.rol)) {
      this.toast.mostrar('No tienes permiso para asignar ese rango.');
      return;
    }
    try {
      await setDoc(
        doc(this.firestore, 'usuarios', usuarioRow.correo),
        { correo: usuarioRow.correo, usuario: usuarioRow.usuario ?? '', rol: nuevoRol },
        { merge: true }
      );
      await this.auditoria.registrar('Cambió rol', `${usuarioRow.correo} → ${nuevoRol}`, 'usuarios');
      this.toast.mostrar('Rol actualizado correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo cambiar el rol. Intenta de nuevo.');
    }
  }

  /** Desactivar/reactivar: reversible — la cuenta y su rol se quedan guardados, solo se bloquea el acceso. */
  async alternarActivo(usuarioRow: UsuarioConRol): Promise<void> {
    const nuevoEstado = !this.estaActivo(usuarioRow);
    try {
      await setDoc(
        doc(this.firestore, 'usuarios', usuarioRow.correo),
        { correo: usuarioRow.correo, usuario: usuarioRow.usuario ?? '', rol: usuarioRow.rol, activo: nuevoEstado },
        { merge: true }
      );
      await this.auditoria.registrar(
        nuevoEstado ? 'Reactivó usuario' : 'Desactivó usuario',
        usuarioRow.correo,
        'usuarios'
      );
      this.toast.mostrar(nuevoEstado ? 'Usuario reactivado correctamente.' : 'Usuario desactivado correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo actualizar. Intenta de nuevo.');
    }
  }

  /** Abre el modal de confirmación antes de eliminar (acción permanente). */
  abrirModalEliminar(usuarioRow: UsuarioConRol): void {
    this.usuarioAEliminar = usuarioRow;
  }

  cerrarModalEliminar(): void {
    this.usuarioAEliminar = null;
  }

  async confirmarEliminar(): Promise<void> {
    if (!this.usuarioAEliminar) return;
    const correo = this.usuarioAEliminar.correo;
    try {
      await deleteDoc(doc(this.firestore, 'usuarios', correo));
      await this.auditoria.registrar('Eliminó usuario', correo, 'usuarios');
      this.toast.mostrar('Usuario eliminado correctamente.');
    } catch (err) {
      console.error(err);
      this.toast.mostrar('No se pudo eliminar. Intenta de nuevo.');
    } finally {
      this.usuarioAEliminar = null;
    }
  }
}

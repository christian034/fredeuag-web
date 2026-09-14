import { Injectable, inject } from '@angular/core';
import { Auth, User, authState, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Permisos, Rol, TABLA_PERMISOS, PERMISOS_SIN_SESION } from '../permisos';

export type { Rol };

interface DocumentoUsuario {
  correo: string;
  rol: Rol;
  activo?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private auth: Auth = inject(Auth);
  private firestore: Firestore = inject(Firestore);

  /** Usuario autenticado de Firebase Auth (o null si no hay sesión). */
  usuario$: Observable<User | null> = authState(this.auth);

  /**
   * Rol asignado al usuario actual — o null si no tiene rol, o si su cuenta
   * está desactivada (aunque su sesión de Firebase Auth siga siendo válida).
   */
  rol$: Observable<Rol | null> = this.usuario$.pipe(
    switchMap((usuario) => {
      if (!usuario?.email) return of(null);
      const ref = doc(this.firestore, 'usuarios', usuario.email.toLowerCase());
      return docData(ref) as Observable<DocumentoUsuario | undefined>;
    }),
    map((datos) => (datos && datos.activo !== false ? datos.rol : null))
  );

  /** Permisos calculados a partir del rol actual. */
  permisos$: Observable<Permisos> = this.rol$.pipe(
    map((rol) => (rol ? TABLA_PERMISOS[rol] : PERMISOS_SIN_SESION))
  );

  login(correo: string, password: string) {
    return signInWithEmailAndPassword(this.auth, correo, password);
  }

  logout() {
    return signOut(this.auth);
  }
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Permisos } from '../permisos';

/** Requiere que haya una sesión iniciada; si no, manda a /admin/login. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.usuario$.pipe(
    take(1),
    map((usuario) => (usuario ? true : router.createUrlTree(['/admin/login'])))
  );
};

/** Requiere que el usuario tenga el permiso indicado según su rol. */
export function permisoGuard(clave: keyof Permisos): CanActivateFn {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    return auth.permisos$.pipe(
      take(1),
      map((permisos) => (permisos[clave] ? true : router.createUrlTree(['/admin/login'])))
    );
  };
}

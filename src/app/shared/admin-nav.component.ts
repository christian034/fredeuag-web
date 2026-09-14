import { Component, HostListener, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastService } from './services/toast.service';
import { TemaService } from './services/tema.service';

@Component({
  selector: 'app-admin-nav',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, RouterLinkActive],
  template: `
    <nav class="relative border-b border-line bg-surface px-6 md:px-16 py-3 mb-10">
      <div class="flex items-center gap-4">
        <a routerLink="/admin/dashboard" (click)="menuMovilAbierto = false" class="mr-2 flex-shrink-0">
          <img
            [src]="tema.oscuroActivo() ? 'assets/marca/logo-horizontal-oscuro.png' : 'assets/marca/logo-horizontal-claro.png'"
            alt="FREDEUAG"
            class="h-9 w-auto"
          />
        </a>

        <ng-container *ngIf="auth.permisos$ | async as permisos">
          <!-- Links: visibles siempre en pantallas medianas en adelante -->
          <div class="hidden md:flex items-center gap-6">
            <a routerLink="/admin/dashboard" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Panel</a>
            <a *ngIf="permisos.verFirmantes" routerLink="/admin/resultados" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Firmantes</a>
            <a *ngIf="permisos.verContenidoAdmin" routerLink="/admin/contenido" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Contenido de la página</a>
            <a *ngIf="permisos.verHistorial" routerLink="/admin/historial" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Historial</a>
            <a *ngIf="permisos.verListaUsuarios" routerLink="/admin/usuarios" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Usuarios</a>
          </div>

          <button
            type="button"
            (click)="tema.alternar()"
            class="ml-auto text-muted hover:text-accent transition-colors p-1.5"
            [attr.aria-label]="tema.oscuroActivo() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            [title]="tema.oscuroActivo() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
          >
            <svg *ngIf="!tema.oscuroActivo()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
            </svg>
            <svg *ngIf="tema.oscuroActivo()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
          </button>

          <!-- Menú de perfil: visible siempre -->
          <div class="relative" (click)="$event.stopPropagation()">
            <button
              type="button"
              (click)="menuPerfilAbierto = !menuPerfilAbierto"
              class="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center font-medium text-sm flex-shrink-0"
              aria-label="Menú de perfil"
            >
              {{ (auth.usuario$ | async)?.email?.charAt(0)?.toUpperCase() ?? '?' }}
            </button>

            <div
              *ngIf="menuPerfilAbierto"
              class="absolute right-0 top-12 w-56 bg-surface border border-line shadow-lg py-2 z-20"
            >
              <p class="px-4 py-2 text-xs text-muted truncate">{{ (auth.usuario$ | async)?.email }}</p>
              <p class="px-4 pb-2 text-xs uppercase tracking-wide text-muted">
                Rol: <span class="text-accent">{{ auth.rol$ | async }}</span>
              </p>
              <hr class="border-line" />
              <button
                type="button"
                (click)="cerrarSesion()"
                class="w-full text-left px-4 py-2.5 text-sm text-muted hover:text-accent hover:bg-base transition-colors"
              >Cerrar sesión</button>
            </div>
          </div>

          <!-- Botón de hamburguesa: solo en pantallas chicas -->
          <button
            type="button"
            (click)="menuMovilAbierto = !menuMovilAbierto; $event.stopPropagation()"
            class="md:hidden text-muted hover:text-accent p-1.5"
            [attr.aria-label]="menuMovilAbierto ? 'Cerrar menú' : 'Abrir menú'"
            [attr.aria-expanded]="menuMovilAbierto"
          >
            <svg *ngIf="!menuMovilAbierto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
              <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg *ngIf="menuMovilAbierto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
              <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>

          <!-- Menú desplegado: solo en pantallas chicas, cuando está abierto -->
          <div *ngIf="menuMovilAbierto" class="md:hidden absolute left-0 right-0 top-full bg-surface border-b border-line px-6 py-4 flex flex-col gap-4 z-20" (click)="$event.stopPropagation()">
            <a routerLink="/admin/dashboard" routerLinkActive="text-accent" (click)="menuMovilAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Panel</a>
            <a *ngIf="permisos.verFirmantes" routerLink="/admin/resultados" routerLinkActive="text-accent" (click)="menuMovilAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Firmantes</a>
            <a *ngIf="permisos.verContenidoAdmin" routerLink="/admin/contenido" routerLinkActive="text-accent" (click)="menuMovilAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Contenido de la página</a>
            <a *ngIf="permisos.verHistorial" routerLink="/admin/historial" routerLinkActive="text-accent" (click)="menuMovilAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Historial</a>
            <a *ngIf="permisos.verListaUsuarios" routerLink="/admin/usuarios" routerLinkActive="text-accent" (click)="menuMovilAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Usuarios</a>
          </div>
        </ng-container>
      </div>
    </nav>
  `,
})
export class AdminNavComponent {
  auth: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private toast: ToastService = inject(ToastService);
  tema = inject(TemaService);

  menuPerfilAbierto = false;
  menuMovilAbierto = false;

  @HostListener('document:click')
  cerrarMenusAlClickearFuera(): void {
    this.menuPerfilAbierto = false;
    this.menuMovilAbierto = false;
  }

  async cerrarSesion(): Promise<void> {
    await this.auth.logout();
    this.toast.mostrar('Sesión cerrada correctamente');
    this.router.navigate(['/admin/login']);
  }
}
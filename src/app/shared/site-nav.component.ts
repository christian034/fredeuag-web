import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TemaService } from './services/tema.service';

@Component({
  selector: 'app-site-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bg-surface border-b border-line px-6 md:px-16 py-4">
      <div class="flex items-center gap-4">
        <a routerLink="/" (click)="menuAbierto = false" class="mr-2 flex-shrink-0">
          <img
            [src]="tema.oscuroActivo() ? 'assets/marca/logo-horizontal-oscuro.png' : 'assets/marca/logo-horizontal-claro.png'"
            alt="FREDEUAG — Frente por la Reforma Democrática de la Universidad Autónoma de Guerrero"
            class="h-10 w-auto"
          />
        </a>

        <!-- Links: visibles siempre en pantallas medianas en adelante -->
        <div class="hidden md:flex items-center gap-8">
          <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Inicio</a>
          <a routerLink="/noticias" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Noticias</a>
          <a routerLink="/galeria" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Galería</a>
          <a routerLink="/encuestas" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Encuestas</a>
          <a routerLink="/contacto" routerLinkActive="text-accent" class="text-sm text-muted hover:text-accent transition-colors">Contacto</a>
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

        <!-- Acceso admin: ícono, siempre visible en cualquier tamaño de pantalla (no va dentro del menú de hamburguesa) -->
        <a
          routerLink="/admin/login"
          (click)="menuAbierto = false"
          class="text-muted hover:text-accent transition-colors p-1.5"
          aria-label="Acceso admin"
          title="Acceso admin"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5">
            <circle cx="12" cy="8" r="3.5" />
            <path stroke-linecap="round" d="M4.5 20c1.2-3.5 4.2-5.5 7.5-5.5s6.3 2 7.5 5.5" />
          </svg>
        </a>

        <!-- Botón de hamburguesa: solo en pantallas chicas -->
        <button
          type="button"
          (click)="menuAbierto = !menuAbierto"
          class="md:hidden text-muted hover:text-accent p-1.5"
          [attr.aria-label]="menuAbierto ? 'Cerrar menú' : 'Abrir menú'"
          [attr.aria-expanded]="menuAbierto"
        >
          <svg *ngIf="!menuAbierto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
          <svg *ngIf="menuAbierto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-6 h-6">
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <!-- Menú desplegado: solo en pantallas chicas, cuando está abierto -->
      <div *ngIf="menuAbierto" class="md:hidden mt-4 pt-4 border-t border-line flex flex-col gap-4">
        <a routerLink="/" [routerLinkActiveOptions]="{ exact: true }" routerLinkActive="text-accent" (click)="menuAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Inicio</a>
        <a routerLink="/noticias" routerLinkActive="text-accent" (click)="menuAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Noticias</a>
        <a routerLink="/galeria" routerLinkActive="text-accent" (click)="menuAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Galería</a>
        <a routerLink="/encuestas" routerLinkActive="text-accent" (click)="menuAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Encuestas</a>
        <a routerLink="/contacto" routerLinkActive="text-accent" (click)="menuAbierto = false" class="text-sm text-muted hover:text-accent transition-colors">Contacto</a>
      </div>
    </nav>
  `,
})
export class SiteNavComponent {
  tema = inject(TemaService);
  menuAbierto = false;
}
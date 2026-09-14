import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/toast.component';
import { TemaService } from './shared/services/tema.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastComponent],
  template: `
    <router-outlet></router-outlet>
    <app-toast></app-toast>
  `,
})
export class AppComponent {
  // Se inyecta aquí (sin usarse directamente) para que el tema se aplique
  // desde el arranque de la app, antes de que se vea cualquier parpadeo.
  private tema = inject(TemaService);
}

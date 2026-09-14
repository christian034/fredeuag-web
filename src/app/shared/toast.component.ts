import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  template: `
    <div
      *ngIf="toast.mensaje$ | async as mensaje"
      class="fixed top-5 right-5 z-50 bg-bone text-surface px-5 py-3 shadow-lg text-sm font-medium animate-fade-in"
    >
      {{ mensaje }}
    </div>
  `,
})
export class ToastComponent {
  toast = inject(ToastService);
}

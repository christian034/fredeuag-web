import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FirebaseError } from '@angular/fire/app';
import { AuthService } from '../shared/services/auth.service';
import { ToastService } from '../shared/services/toast.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
})
export class AdminLoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);
  private toast = inject(ToastService);

  enviando = false;
  error: string | null = null;

  form = this.fb.nonNullable.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async enviar(): Promise<void> {
    this.error = null;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const { correo, password } = this.form.getRawValue();

    try {
      await this.auth.login(correo, password);
      this.toast.mostrar('Sesión iniciada correctamente');
      this.router.navigate(['/admin/dashboard']);
    } catch (err) {
      if (err instanceof FirebaseError) {
        this.error = 'Correo o contraseña incorrectos.';
      } else {
        console.error(err);
        this.error = 'No se pudo iniciar sesión. Intenta de nuevo.';
      }
    } finally {
      this.enviando = false;
    }
  }
}

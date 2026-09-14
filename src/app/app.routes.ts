import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoticiasComponent } from './noticias/noticias.component';
import { NoticiaDetalleComponent } from './noticia-detalle/noticia-detalle.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { ContactoComponent } from './contacto/contacto.component';
import { FirmaFormComponent } from './firma-form/firma-form.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminResultadosComponent } from './admin-resultados/admin-resultados.component';
import { AdminContenidoComponent } from './admin-contenido/admin-contenido.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminHistorialComponent } from './admin-historial/admin-historial.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard, permisoGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  // Público — no requiere sesión
  { path: '', component: HomeComponent },
  { path: 'noticias', component: NoticiasComponent },
  { path: 'noticias/:id', component: NoticiaDetalleComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'encuestas', component: EncuestasComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'firmar/alumno', component: FirmaFormComponent, data: { tipo: 'alumno' } },
  { path: 'firmar/trabajador', component: FirmaFormComponent, data: { tipo: 'trabajador' } },
  { path: 'gracias', component: ThankYouComponent },

  // Panel de administración — requiere sesión + permiso específico
  { path: 'admin/login', component: AdminLoginComponent },
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/resultados',
    component: AdminResultadosComponent,
    canActivate: [authGuard, permisoGuard('verFirmantes')],
  },
  {
    path: 'admin/contenido',
    component: AdminContenidoComponent,
    canActivate: [authGuard, permisoGuard('verContenidoAdmin')],
  },
  {
    path: 'admin/usuarios',
    component: AdminUsuariosComponent,
    canActivate: [authGuard, permisoGuard('verListaUsuarios')],
  },
  {
    path: 'admin/historial',
    component: AdminHistorialComponent,
    canActivate: [authGuard, permisoGuard('verHistorial')],
  },

  { path: '**', redirectTo: '' },
];

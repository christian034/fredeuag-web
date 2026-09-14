import { bootstrapApplication } from '@angular/platform-browser';
import 'chart.js/auto'; // registra todos los tipos de gráfico (barras, circular, líneas, dispersión, etc.)
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

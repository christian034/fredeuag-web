import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAppCheck, initializeAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' })
    ),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideAppCheck(() => {
      // En desarrollo local (npm start), usa un "token de depuración" en vez
      // de reCAPTCHA real — si no, App Check bloquearía tu propio localhost.
      if (isDevMode()) {
        (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
      }
      return initializeAppCheck(getApp(), {
        // Reemplaza esto con tu clave de sitio de reCAPTCHA v3 (ver instrucciones).
        provider: new ReCaptchaV3Provider('PEGA_AQUI_TU_CLAVE_DE_RECAPTCHA_V3'),
        isTokenAutoRefreshEnabled: true,
      });
    }),
  ],
};
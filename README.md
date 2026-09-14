# Página del Movimiento (Angular + Tailwind + Firebase)

## Sitio público (sin necesidad de iniciar sesión)
- **Inicio** (`/`) — carrusel de noticias (últimas 5 aprobadas), acceso a formularios, sobre nosotros, misión y visión, secciones informativas adicionales, invitación a Encuestas.
- **Noticias** (`/noticias`) y su página de detalle (`/noticias/:id`) a lo ancho completo.
- **Galería** (`/galeria`), **Encuestas** (`/encuestas`), **Contacto** (`/contacto`).
- **Firmar** — `/firmar/alumno` y `/firmar/trabajador`, con confirmación visual y correo de confirmación.
- **Gracias** (`/gracias`).

El **footer** (con las redes sociales) aparece en todas las páginas públicas **excepto Contacto**
(ahí ya se muestran las redes de forma más prominente, como parte del contenido principal).

## Panel de administración

- `/admin/login` — inicio de sesión, con aviso (toast) al entrar y al salir.
- `/admin/dashboard` — resumen: firmantes, encuestas activas/cerradas, noticias recientes y (para quien
  pueda ver el historial) novedades recientes. Los enlaces de encuestas y noticias llevan directo a su
  edición dentro del panel — no al sitio público.
- `/admin/resultados` — **Firmantes**: tablas con buscador, exportar a Excel y edición inline.
- `/admin/contenido` — **Contenido de la página**, dividido en pestañas: Inicio, Noticias Nuevas,
  Galería, Contacto, Secciones adicionales. Todo lo que se crea o edita pasa por un **flujo de
  aprobación** (ver abajo).
- `/admin/usuarios` — ver/gestionar cuentas y roles (según permiso).
- `/admin/historial` — quién hizo qué y cuándo, en tres pestañas: Publicaciones, Firmas, Usuarios (esta
  última solo para quien puede gestionar usuarios).

## Roles y flujo de aprobación

Cinco roles, cada uno acumulando lo del anterior:

| Rol | Ver firmantes | Ver contenido (incl. pendiente) | Crear/editar/eliminar su propio contenido | Editar/eliminar contenido ajeno | Aprobar publicaciones | Ver historial | Ver lista de usuarios | Gestionar usuarios y roles |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **visor** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **editor** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **supervisor** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| **fundador** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (+ pestaña de usuarios) | ✅ | ✅ |

**Cómo funciona la aprobación:** cuando alguien sin permiso de aprobar (editor) crea o edita una
noticia, foto o sección, queda marcada como **"Pendiente de aprobación"** y no aparece en el sitio
público hasta que alguien con permiso de aprobar (supervisor o superior) le dé clic en **"Aprobar"**.
Si quien crea el contenido ya tiene permiso de aprobar, se publica de inmediato. Un editor puede ver
todo el contenido de los demás (para tener contexto), pero solo puede editar o eliminar lo que él
mismo creó — de ahí que supervisor pueda además tocar lo de rangos inferiores.

Toda la matriz de permisos vive en `src/app/shared/permisos.ts` — es el único archivo que hay que
tocar para ajustar quién puede hacer qué.

> **Nota sobre firmantes:** editar/eliminar firmas y descargar el Excel de firmantes sigue reservado
> a `admin` (no se pidió explícitamente para los demás roles en este rediseño). Si quieres que
> supervisor o fundador también puedan hacerlo, es un cambio de una línea en `permisos.ts`.

## Instalación

```bash
npm install --legacy-peer-deps
```

> **Por qué `--legacy-peer-deps` es necesario, no opcional:** `ng2-charts` declara su dependencia
> hacia `@angular/cdk` sin límite superior de versión, así que npm siempre intenta instalar la
> versión de `@angular/cdk` más reciente del registro — que ya pide una versión de Angular mucho más
> nueva que la 18 de este proyecto. La bandera le dice a npm que instale de todos modos.

## Configurar Firebase

1. Crea un proyecto en https://console.firebase.google.com
2. Activa **Firestore Database**, **Authentication** (correo/contraseña) y **Storage**.
3. Copia tus credenciales en `src/environments/environment.ts` y `environment.prod.ts`.

### Crear tu primer administrador

1. Firebase Console → **Authentication** → **Add user**: tu correo y una contraseña.
2. Firestore → colección `usuarios` → documento con **ID = tu correo en minúsculas**:
   - `correo`: tu correo (string)
   - `usuario`: tu nombre (string, opcional)
   - `rol`: `"admin"` (string)
3. Entra en `/admin/login`.

### Reglas de seguridad de Firestore (versión final y completa)

> ⚠️ **Si algo del panel "no se refleja" (el historial vacío es el síntoma más común), la causa casi
> siempre son reglas de Firestore desactualizadas** — hemos ido agregando colecciones a lo largo de
> varias rondas de cambios, y si copiaste una versión anterior de estas reglas, algunas colecciones
> nuevas (como `auditoria` o `encuesta_votos`) pueden no tener permiso de lectura o escritura. Copia
> **este bloque completo** en Firebase Console → Firestore Database → Reglas, reemplazando todo lo
> que haya ahí, para asegurarte de que no falte nada:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    function rolDelSolicitante() {
      return get(/databases/$(database)/documents/usuarios/$(request.auth.token.email.lower())).data.rol;
    }
    function tienePermiso(roles) {
      return request.auth != null && rolDelSolicitante() in roles;
    }
    function esAlMenosSupervisor() {
      return tienePermiso(['supervisor', 'fundador', 'admin']);
    }
    function esAlMenosEditor() {
      return tienePermiso(['editor', 'supervisor', 'fundador', 'admin']);
    }

    match /firmas/{firmaId} {
      allow create: if request.resource.data.nombres is string
                    && request.resource.data.correo is string
                    && request.resource.data.identificador is string;
      allow read: if tienePermiso(['visor', 'editor', 'supervisor', 'fundador', 'admin']);
      allow update: if tienePermiso(['admin']);
      allow delete: if tienePermiso(['admin']);
    }

    match /contenido/{docId} {
      allow read: if true; // el sitio público necesita leer el contenido aprobado
      allow write: if esAlMenosEditor();
    }

    match /secciones/{seccionId} {
      allow read: if true;
      allow create: if esAlMenosEditor();
      allow update: if esAlMenosEditor(); // incluye aprobar (cambiar "estado")
      allow delete: if esAlMenosEditor();
    }

    match /encuesta_votos/{votoId} {
      allow create: if request.resource.data.seccionId is string;
      allow read: if true; // votos anónimos, se necesitan para calcular resultados públicos
      allow update, delete: if false;
    }

    match /usuarios/{userId} {
      // Cualquier usuario puede leer SU PROPIO documento (así la app sabe su
      // rol al iniciar sesión) — sin esto, solo fundador/admin podrían saber
      // su propio rol, y el resto vería el panel vacío sin ningún permiso.
      allow read: if tienePermiso(['fundador', 'admin']) || request.auth.token.email.lower() == userId;
      allow write: if tienePermiso(['admin']);
    }

    match /auditoria/{registroId} {
      allow create: if request.auth != null;
      allow read: if tienePermiso(['fundador', 'admin']);
      allow update, delete: if false;
    }

    match /mail/{mailId} {
      allow create: if request.resource.data.to is list;
      allow read, update, delete: if false;
    }
  }
}
```

> **Nota honesta sobre el flujo de aprobación a nivel de reglas:** por simplicidad, las reglas de
> arriba permiten escribir en `contenido` y `secciones` a cualquiera con rol editor o superior, sin
> distinguir a nivel de Firestore "esto es mío" vs. "esto es ajeno", ni "esto es crear" vs. "esto es
> aprobar". Esa distinción más fina (quién puede editar contenido de quién, quién puede aprobar) se
> aplica en la interfaz del panel — no es a prueba de balas contra alguien que manipule las
> peticiones directamente. Si más adelante quieres que también sea inquebrantable a nivel de
> Firestore, lo correcto sería mover cada noticia a su propio documento (como ya son las secciones) e
> incluir el correo del autor y el permiso de aprobar como parte de la condición en las reglas.

### Reglas de seguridad de Storage

> ⚠️ La app sube imágenes a **tres carpetas distintas** según de dónde vengan: `galeria/` (fotos de
> la galería), `noticias/` (imágenes insertadas dentro del editor de texto de una noticia), y
> `contenido/` (el selector de imagen con vista previa, usado en Inicio y Secciones). Si tus reglas
> solo cubren una de esas carpetas, las subidas a las demás fallan **sin aviso visible** — ese es el
> motivo más probable si una imagen "no se refleja" después de subirla. Copia este bloque completo:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{carpeta}/{archivo} {
      allow read: if true;
      allow write: if request.auth != null && carpeta in ['galeria', 'noticias', 'contenido'];
    }
  }
}
```

### Enviar correo de confirmación (extensión "Trigger Email")

Cada firma agrega un documento a `mail`. Instala la extensión oficial **"Trigger Email from
Firestore"** desde Firebase Console → Extensiones, apuntando a la colección `mail`, y configura tu
SMTP.

## Editor de texto enriquecido

El campo "Contenido completo" de cada noticia usa **CKEditor 5** (build "classic"): negritas,
cursivas, títulos, listas, citas, tablas, e inserción de imágenes por URL. Se instala junto con el
resto de dependencias.

## Correr en desarrollo

```bash
npm start
```

Abre http://localhost:4200

## Pendientes para completar
- Reemplazar noticias, galería e información de ejemplo desde `/admin/contenido`.
- Reemplazar los links de redes sociales en la pestaña Contacto del panel.
- Instalar y configurar la extensión "Trigger Email from Firestore".
- 
- Si quieres blindar el flujo de aprobación también a nivel de reglas de Firestore (no solo en la
  interfaz), considera mover las noticias a su propio documento por ítem, como ya son las secciones.
- Considera, más adelante, migrar Angular a versiones más nuevas de forma gradual (una versión mayor
  a la vez), en vez del salto grande que pediría actualmente `ng2-charts` en su versión más reciente.

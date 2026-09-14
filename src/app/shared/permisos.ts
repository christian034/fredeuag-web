export type Rol = 'visor' | 'editor' | 'supervisor' | 'fundador' | 'admin';

export interface Permisos {
  // Firmantes
  verFirmantes: boolean;
  editarFirmantes: boolean;
  borrarFirmantes: boolean;
  descargarExcel: boolean;

  // Contenido de la página (noticias, galería, secciones, config general)
  verContenidoAdmin: boolean; // acceso a la pantalla de contenido (aunque sea solo lectura)
  crearContenidoPropio: boolean; // crear/editar/eliminar SU PROPIO contenido
  editarCualquierContenido: boolean; // editar/eliminar contenido de cualquier usuario, y la config general del sitio
  aprobarContenido: boolean; // aprobar publicaciones pendientes antes de que salgan al sitio

  // Usuarios y roles
  verListaUsuarios: boolean; // ver la tabla de usuarios (sin poder tocarla)
  puedeAscenderRoles: boolean; // cambiar el rol de otros usuarios, con límite según el propio rango
  gestionarUsuarios: boolean; // crear, editar y eliminar usuarios por completo

  // Historial
  verHistorial: boolean; // acceso a la pantalla de historial
  verHistorialCompleto: boolean; // ve el historial de TODOS; si es false, solo ve el suyo propio
}

/** Lo que puede hacer alguien sin sesión iniciada (nada dentro del panel de admin). */
export const PERMISOS_SIN_SESION: Permisos = {
  verFirmantes: false,
  editarFirmantes: false,
  borrarFirmantes: false,
  descargarExcel: false,
  verContenidoAdmin: false,
  crearContenidoPropio: false,
  editarCualquierContenido: false,
  aprobarContenido: false,
  verListaUsuarios: false,
  puedeAscenderRoles: false,
  gestionarUsuarios: false,
  verHistorial: false,
  verHistorialCompleto: false,
};

export const TABLA_PERMISOS: Record<Rol, Permisos> = {
  // Visor: solo panel y firmantes. Sin acceso al contenido de la página (noticias, galería, secciones)
  // hasta que le suban de rango.
  visor: {
    verFirmantes: true,
    editarFirmantes: false,
    borrarFirmantes: false,
    descargarExcel: false,
    verContenidoAdmin: false,
    crearContenidoPropio: false,
    editarCualquierContenido: false,
    aprobarContenido: false,
    verListaUsuarios: false,
    puedeAscenderRoles: false,
    gestionarUsuarios: false,
    verHistorial: false,
    verHistorialCompleto: false,
  },
  // Editor: todo lo de visor + crear/editar/eliminar SU PROPIO contenido (incluidas noticias ya
  // publicadas) + subir imágenes + ver el historial de SUS PROPIAS publicaciones (no las de otros).
  editor: {
    verFirmantes: true,
    editarFirmantes: false,
    borrarFirmantes: false,
    descargarExcel: false,
    verContenidoAdmin: true,
    crearContenidoPropio: true,
    editarCualquierContenido: false,
    aprobarContenido: false,
    verListaUsuarios: false,
    puedeAscenderRoles: false,
    gestionarUsuarios: false,
    verHistorial: true,
    verHistorialCompleto: false,
  },
  // Supervisor: todo lo de editor + editar/corregir publicaciones de otros usuarios + aprobarlas
  // + editar la página publicada en general.
  supervisor: {
    verFirmantes: true,
    editarFirmantes: true,
    borrarFirmantes: false,
    descargarExcel: true,
    verContenidoAdmin: true,
    crearContenidoPropio: true,
    editarCualquierContenido: true,
    aprobarContenido: true,
    verListaUsuarios: false,
    puedeAscenderRoles: false,
    gestionarUsuarios: false,
    verHistorial: true,
    verHistorialCompleto: false,
  },
  // Fundador: todo lo de supervisor + ver historial de TODOS + ver lista de usuarios (sin editarla).
  fundador: {
    verFirmantes: true,
    editarFirmantes: true,
    borrarFirmantes: false,
    descargarExcel: true,
    verContenidoAdmin: true,
    crearContenidoPropio: true,
    editarCualquierContenido: true,
    aprobarContenido: true,
    verListaUsuarios: true,
    puedeAscenderRoles: true,
    gestionarUsuarios: false,
    verHistorial: true,
    verHistorialCompleto: true,
  },
  // Admin: todo lo anterior + crear/editar/eliminar roles de usuarios, y borrar firmantes.
  admin: {
    verFirmantes: true,
    editarFirmantes: true,
    borrarFirmantes: true,
    descargarExcel: true,
    verContenidoAdmin: true,
    crearContenidoPropio: true,
    editarCualquierContenido: true,
    aprobarContenido: true,
    verListaUsuarios: true,
    puedeAscenderRoles: true,
    gestionarUsuarios: true,
    verHistorial: true,
    verHistorialCompleto: true,
  },
};

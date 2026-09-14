import { Injectable, inject } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class ImagenesService {
  private storage: Storage = inject(Storage);

  /** Sube un archivo a Storage y devuelve la URL pública para guardarla en Firestore. */
  async subirImagen(archivo: File, carpeta: string): Promise<string> {
    const nombreSeguro = archivo.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const ruta = `${carpeta}/${Date.now()}-${nombreSeguro}`;
    const referencia = ref(this.storage, ruta);
    await uploadBytes(referencia, archivo);
    return getDownloadURL(referencia);
  }
}

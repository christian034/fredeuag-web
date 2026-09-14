import { Injectable, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class VideoEmbedService {
  private sanitizer = inject(DomSanitizer);

  /** Convierte un link de YouTube/Vimeo/etc. en una URL de embed lista para un <iframe>. */
  obtenerUrlEmbed(url: string): SafeResourceUrl | null {
    if (!url) return null;

    const youtube = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{6,})/);
    if (youtube) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${youtube[1]}`);
    }

    const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vimeo) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${vimeo[1]}`);
    }

    // Si no reconocemos la plataforma, no arriesgamos a incrustar una URL arbitraria.
    return null;
  }
}

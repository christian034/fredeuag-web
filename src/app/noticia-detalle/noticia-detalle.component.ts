import { Component, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { map, switchMap } from 'rxjs/operators';
import { ContenidoService, NoticiaContenido } from '../shared/services/contenido.service';
import { VideoEmbedService } from '../shared/services/video-embed.service';
import { SiteNavComponent } from '../shared/site-nav.component';
import { SiteFooterComponent } from '../shared/site-footer.component';
import { EncuestaPublicaComponent, EncuestaVotable } from '../shared/encuesta-publica/encuesta-publica.component';
import { FondoPublicoComponent } from '../shared/fondo-publico/fondo-publico.component';

@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, SiteNavComponent, SiteFooterComponent, EncuestaPublicaComponent, FondoPublicoComponent],
  templateUrl: './noticia-detalle.component.html',
})
export class NoticiaDetalleComponent {
  private route = inject(ActivatedRoute);
  private contenidoService = inject(ContenidoService);
  private videoEmbedService = inject(VideoEmbedService);
  private sanitizer = inject(DomSanitizer);

  noticia$ = this.route.paramMap.pipe(
    map((params) => params.get('id') ?? ''),
    switchMap((id) => this.contenidoService.obtenerNoticiaPorId(id))
  );
  contenido$ = this.contenidoService.contenidoPublico$;

  embed(url: string) {
    return this.videoEmbedService.obtenerUrlEmbed(url);
  }

  /**
   * El HTML del cuerpo de la noticia solo lo escriben roles autorizados del panel
   * (nunca visitantes), así que se marca como confiable en vez de dejar que el
   * saneador por defecto de Angular le quite el estilo de alineación de CKEditor.
   */
  cuerpoSeguro(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /** Adapta la encuesta embebida de la noticia al formato que espera el componente de votación. */
  encuestaVotable(noticia: NoticiaContenido): EncuestaVotable | null {
    if (!noticia.encuesta) return null;
    return {
      id: 'noticia-encuesta-' + noticia.id,
      titulo: 'Encuesta',
      preguntas: noticia.encuesta.preguntas,
      tipoResultado: noticia.encuesta.tipoResultado,
      tipoGrafico: noticia.encuesta.tipoGrafico,
      fechaLimite: noticia.encuesta.fechaLimite,
    };
  }
}

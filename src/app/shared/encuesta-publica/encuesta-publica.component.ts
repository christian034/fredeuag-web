import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { PreguntaEncuesta, TipoGrafico, TipoResultadoEncuesta } from '../services/secciones.service';
import { EncuestasService } from '../services/encuestas.service';
import { AuthService } from '../services/auth.service';

/** Cualquier cosa votable: una sección de tipo encuesta, o la encuesta embebida en una noticia. */
export interface EncuestaVotable {
  id?: string;
  titulo: string;
  preguntas?: PreguntaEncuesta[];
  tipoResultado?: TipoResultadoEncuesta;
  tipoGrafico?: TipoGrafico;
  fechaLimite?: string;
}

@Component({
  selector: 'app-encuesta-publica',
  standalone: true,
  imports: [CommonModule, AsyncPipe, FormsModule, NgChartsModule],
  templateUrl: './encuesta-publica.component.html',
})
export class EncuestaPublicaComponent implements OnInit {
  private encuestasService = inject(EncuestasService);
  auth = inject(AuthService);

  @Input({ required: true }) seccion!: EncuestaVotable;

  yaVoto = false;
  cerrada = false;

  respuestasOpcion: number[] = [];
  respuestasTexto: string[] = [];
  enviando = false;

  conteosPorPregunta: number[][] = [];
  textosPorPregunta: string[][] = [];

  ngOnInit(): void {
    this.cerrada = !!this.seccion.fechaLimite && new Date(this.seccion.fechaLimite).getTime() < Date.now();

    const clave = `encuesta-votada-${this.seccion.id}`;
    this.yaVoto = localStorage.getItem(clave) === 'true';

    const numPreguntas = (this.seccion.preguntas ?? []).length;
    this.respuestasOpcion = new Array(numPreguntas).fill(-1);
    this.respuestasTexto = new Array(numPreguntas).fill('');

    if (this.yaVoto || this.cerrada) {
      this.cargarResultados();
    }
  }

  get esModoGrafico(): boolean {
    return this.seccion.tipoResultado === 'grafico';
  }

  private cargarResultados(): void {
    const preguntas = this.seccion.preguntas ?? [];
    if (this.esModoGrafico) {
      this.encuestasService
        .obtenerConteos(this.seccion.id!, preguntas.map((p) => p.opciones.length))
        .subscribe((conteos) => (this.conteosPorPregunta = conteos));
    } else {
      // Las respuestas de texto libre solo se descargan si hay sesión iniciada en el panel.
      this.auth.usuario$.subscribe((usuario) => {
        if (!usuario) return;
        this.encuestasService
          .obtenerRespuestasTexto(this.seccion.id!, preguntas.length)
          .subscribe((textos) => (this.textosPorPregunta = textos));
      });
    }
  }

  elegirOpcion(indicePregunta: number, indiceOpcion: number): void {
    this.respuestasOpcion[indicePregunta] = indiceOpcion;
  }

  get faltanRespuestas(): boolean {
    if (this.esModoGrafico) return this.respuestasOpcion.some((r) => r === -1);
    return this.respuestasTexto.some((r) => !r.trim());
  }

  async votar(): Promise<void> {
    if (this.faltanRespuestas || !this.seccion.id || this.cerrada) return;
    this.enviando = true;
    try {
      if (this.esModoGrafico) {
        await this.encuestasService.registrarVotoOpcion(this.seccion.id!, this.respuestasOpcion);
      } else {
        await this.encuestasService.registrarVotoTexto(this.seccion.id!, this.respuestasTexto);
      }
      localStorage.setItem(`encuesta-votada-${this.seccion.id}`, 'true');
      this.yaVoto = true;
      this.cargarResultados();
    } finally {
      this.enviando = false;
    }
  }

  totalVotosOpcion(indicePregunta: number): number {
    return (this.conteosPorPregunta[indicePregunta] ?? []).reduce((a, b) => a + b, 0);
  }

  private tipoChartJs(tipo: TipoGrafico | undefined): ChartType {
    switch (tipo) {
      case 'circular': return 'pie';
      case 'lineas': return 'line';
      case 'dispersion': return 'scatter';
      case 'histograma': return 'bar';
      case 'barras':
      default: return 'bar';
    }
  }

  configuracionGrafico(indicePregunta: number): { tipo: ChartType; datos: ChartConfiguration['data'] } {
    const pregunta = this.seccion.preguntas![indicePregunta];
    const conteos = this.conteosPorPregunta[indicePregunta] ?? pregunta.opciones.map(() => 0);
    const tipo = this.tipoChartJs(this.seccion.tipoGrafico);

    if (tipo === 'scatter') {
      return {
        tipo,
        datos: { datasets: [{ label: pregunta.texto, data: conteos.map((valor, indice) => ({ x: indice, y: valor })) }] },
      };
    }

    return {
      tipo,
      datos: { labels: pregunta.opciones, datasets: [{ label: pregunta.texto, data: conteos }] },
    };
  }
}

import { MatSnackBar } from '@angular/material/snack-bar';
import { Processo } from './../../models/processo.model';
import { EscalonamentoSrtService } from './../../services/escalonamento-srt.service';
import { EscalonamentoSpnService } from './../../services/escalonamento-spn.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escalonamento',
  templateUrl: './escalonamento.component.html',
  styleUrls: ['./escalonamento.component.css'],
  providers: [EscalonamentoSpnService, EscalonamentoSrtService],
})
export class EscalonamentoComponent implements OnInit {
  tempoMaximo = 0;
  state$: Observable<object>;
  processos: Processo[];
  politica: string;
  nomes = [];
  prontos = [];
  esperas = [];
  count = 0;

  constructor(
    private escalonamentoSpnService: EscalonamentoSpnService,
    private escalonamentoSrtService: EscalonamentoSrtService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    if (this.router.getCurrentNavigation().extras.state === undefined) {
      this.router.navigate(['']);
    }
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );

    this.state$.subscribe((data) => {
      this.processos = data['processos'];
      if (this.processos !== undefined) {
        this.nomes = this.processos.map((p) => p.nome);
      }
      this.politica = data['id'] == '1' ? 'SPN' : 'SRT';
      this.tempoMaximo = data['tempo'];
    });
  }

  ngOnInit(): void {
    this.executarEscalonamento();
    this.getPronto(this.count);
  }

  back(): void {
    this.router.navigate(['']);
  }

  next(): void {
    let processo: Processo;
    if (this.politica === 'SPN') {
      processo = this.escalonamentoSpnService.dequeueNext();
    }
    if (this.politica === 'SRT') {
      processo = this.escalonamentoSrtService.dequeueNext();
    }

    if (processo !== undefined) {
      this.fillTimeLine(processo, processo.inicio, processo.termino, 'black');
      this.getPronto(++this.count);
      this.getEmEspera(processo.termino)

      if (processo.tempoEs1) {
        this.fillTimeLine(processo, processo.inicioEspera1, processo.esperando1, 'orange');
      }
      if (processo.tempoEs2) {
        this.fillTimeLine(processo, processo.inicioEspera2, processo.esperando2, 'orange');
      }
    } else {
      this.showMessage("O escalonamento terminou de executar todos processos!");
    }
  }

  previous(): void {
    let processo: Processo;
    if (this.politica === 'SPN') {
      processo = this.escalonamentoSpnService.popPrevious();
    }
    if (this.politica === 'SRT') {
      processo = this.escalonamentoSrtService.popPrevious();
    }


    if (processo !== undefined) {
      this.fillTimeLine(processo, processo.inicio, processo.termino, 'white');
      this.getPronto(--this.count);
      this.getEmEspera(processo.inicio)
      if (processo.tempoEs1 && processo.esperando1 > processo.inicio) {
        this.fillTimeLine(processo, processo.inicioEspera1, processo.esperando1, 'white')
      }
      if (processo.tempoEs2 && processo.esperando2 > processo.inicio) {
        this.fillTimeLine(processo, processo.inicioEspera2, processo.esperando2, 'white')
      }
    } else {
      this.prontos = this.escalonamentoSpnService.queueReady[0];
      this.esperas = [];
    }
  }

  private fillTimeLine(processo: Processo, inicio: number, termino: number, status: 'white' | 'black' | 'orange'): void {

    for (let i = inicio; i <= termino; i++) {
      const id = `${processo.nome}-${i}`;
      let element = document.getElementById(id);
      if (element !== null) {
        element.style.backgroundColor = status;
      }
    }
  }

  private executarEscalonamento(): void {
    if (this.politica === 'SPN') {
      this.escalonamentoSpnService.executar(this.processos, this.tempoMaximo);
    }
    if (this.politica === 'SRT') {
      this.escalonamentoSrtService.executar(this.processos, this.tempoMaximo);
    }
  }

  private showMessage(msg: string): void {
    this.snackbar.open(
      msg,
      'X',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  }
  private getPronto(count: number) {
    if (this.politica === 'SPN') {
      this.prontos = this.escalonamentoSpnService.queueReady[count]
    }
    if (this.politica === 'SRT') {
      this.prontos = this.escalonamentoSrtService.queueReady[count]
    }
  }

  private getEmEspera(time: number) {
    console.log(time)
    if (this.politica === 'SPN') {
      this.esperas = this.escalonamentoSpnService.waitlist
        .filter(e => (e.inicioEspera1 <= time && e.esperando1 >= time) || (e.inicioEspera2 <= time && e.esperando2 >= time)).map(e => e.nome);

      this.esperas = [...new Set(this.esperas)]
    }
    if (this.politica === 'SRT') {
      this.esperas = this.escalonamentoSrtService.waitlist
        .filter(e => (e.inicioEspera1 <= time && e.esperando1 >= time) || (e.inicioEspera2 <= time && e.esperando2 >= time)).map(e => e.nome);

      this.esperas = [...new Set(this.esperas)]
    }
  }
}


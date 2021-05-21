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

  constructor(
    private escalonamentoSpnService: EscalonamentoSpnService,
    private escalonamentoSrtService: EscalonamentoSrtService,
    private router: Router,
    private activatedRoute: ActivatedRoute
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
    this.getPronto(0);
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
      this.getPronto(processo.termino + 1);
      for (let i = processo.inicio; i <= processo.termino; i++) {
        const id = `${processo.nome}-${i}`;
        let element = document.getElementById(id);
        if (element !== null) {
          element.style.backgroundColor = 'black';
        }
      }

      if (processo.tempoEs1 !== undefined) {
        for (let i = processo.tempoEs1; i < processo.esperando1; i++) {
          const id = `${processo.nome}-${i}`;
          let element = document.getElementById(id);
          if (element !== null) {
            element.style.backgroundColor = 'orange';
          }
        }
        this.getPronto(processo.termino - processo.es1);
      }
      if (processo.tempoEs2 !== undefined) {
        for (let i = processo.tempoEs2; i < processo.esperando2; i++) {
          const id = `${processo.nome}-${i}`;
          let element = document.getElementById(id);
          if (element !== null) {
            element.style.backgroundColor = 'orange';
          }
        }
        this.getPronto(processo.termino - processo.es2);
      }
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
      this.getPronto(processo.inicio);
      for (let i = processo.inicio; i <= processo.termino; i++) {
        const id = `${processo.nome}-${i}`;
        let element = document.getElementById(id);
        element.style.backgroundColor = 'white';
      }

      if (processo.tempoEs1 !== undefined) {
        for (let i = processo.tempoEs1; i < processo.esperando1; i++) {
          const id = `${processo.nome}-${i}`;
          let element = document.getElementById(id);
          if (element !== null) {
            element.style.backgroundColor = 'white';
          }
        }
      }
      if (processo.tempoEs2 !== undefined) {
        for (let i = processo.tempoEs2; i < processo.esperando2; i++) {
          const id = `${processo.nome}-${i}`;
          let element = document.getElementById(id);
          if (element !== null) {
            element.style.backgroundColor = 'white';
          }
        }
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

  private getPronto(time: number) {
    if (this.politica === 'SPN') {
      this.prontos = this.escalonamentoSpnService.queueReady.get(time);
      console.log(time)
      console.log(this.prontos);
    }
    if (this.politica === 'SRT') {
      //this.prontos = this.escalonamentoSrtService.nextReady();
    }
  }
}

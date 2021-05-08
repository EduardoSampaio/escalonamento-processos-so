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
  styleUrls: ['./escalonamento.component.css']
})
export class EscalonamentoComponent implements OnInit {

  tempoMaximo = 0;
  state$: Observable<object>;
  processos: Processo[];
  politica: string;
  nomes = [];

  constructor(
    private escalonamentoSpnService: EscalonamentoSpnService,
    private escalonamentoSrtService: EscalonamentoSrtService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state === undefined) {
      this.router.navigate(['']);
    }
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))

    this.state$.subscribe(data => {
      this.processos = data['processos'];
      this.nomes = this.processos.map(p => p.nome);
      this.politica = data['id'] == '1' ? 'SPN' : 'SRT';
      this.tempoMaximo = data['tempo'];
    });
  }

  ngOnInit(): void {
    this.executarEscalonamento();
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

    if (processo !== undefined)
    {
      for (let i = processo.inicio; i <= processo.termino; i++) {
        const id = `${processo.nome}-${i}`;
        let element = document.getElementById(id);
        if (element !== null)
        {
          element.style.backgroundColor = "black";
        }
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

    for (let i = processo.inicio; i <= processo.termino; i++) {
      const id = `${processo.nome}-${i}`;
      let element = document.getElementById(id);
      element.style.backgroundColor = "white";
    }
  }

  private executarEscalonamento(): void {
    if (this.politica === 'SPN') {
      this.escalonamentoSpnService.executar(this.processos, this.tempoMaximo);
    }
    if (this.politica === 'SRT') {
      this.escalonamentoSpnService.executar(this.processos, this.tempoMaximo);
    }
  }
}

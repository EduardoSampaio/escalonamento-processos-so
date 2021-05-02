import { Escalonamento } from './../../models/escalonamento.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-escalonamento',
  templateUrl: './escalonamento.component.html',
  styleUrls: ['./escalonamento.component.css']
})
export class EscalonamentoComponent implements OnInit {

  tempoMaximo = 0;
  state$: Observable<object>;
  processos: Escalonamento[];
  politica: string;
  nomes = [];
  tempoAtual = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // if (this.router.getCurrentNavigation().extras.state === undefined) {
    //   this.router.navigate(['']);
    // }
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))

    this.state$.subscribe(data => {
      this.processos = data['processos'];
      this.nomes = this.processos.map(p => p.processo);
      this.politica = data['id'] == '1' ? 'SPN' : 'SRT';
      this.tempoMaximo = data['tempo'];
    });
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['']);
  }

  next(): void {
    if (this.tempoAtual < this.tempoMaximo) {
      this.tempoAtual++;
    }
    var element = document.getElementById("P3-18");
    element.style.backgroundColor = "black";
  }
  previous(): void {
    if (this.tempoAtual > 0) {
      this.tempoAtual--;
    }

    var element = document.getElementById("P3-18");
    element.style.backgroundColor = "white";

  }
  reset(): void { console.log('reset'); }
  start(): void { console.log('start') }
}

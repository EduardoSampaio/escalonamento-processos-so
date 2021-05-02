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

    var element = document.getElementById("P2-14");
    element.classList.add("preenchido");

    var element = document.getElementById("P2-15");
    element.classList.add("preenchido");

    var element = document.getElementById("P2-16");
    element.classList.add("preenchido");

    var element = document.getElementById("P2-17");
    element.classList.add("preenchido");

    var element = document.getElementById("P3-18");
    element.classList.add("preenchido");

    var element = document.getElementById("P3-19");
    element.classList.add("preenchido");

    var element = document.getElementById("P3-20");
    element.classList.add("preenchido");

    var element = document.getElementById("P3-21");
    element.classList.add("preenchido");

  }
  previous(): void {
    if (this.tempoAtual > 0) {
      this.tempoAtual--;
    }

    var element = document.getElementById("P3-18");
    element.classList.remove("preenchido");

    var element = document.getElementById("P3-19");
    element.classList.remove("preenchido");

    var element = document.getElementById("P3-20");
    element.classList.remove("preenchido");

    var element = document.getElementById("P3-21");
    element.classList.remove("preenchido");
  }
  reset(): void { console.log('reset'); }
  start(): void { console.log('start') }
}

import { Escalonamento } from './../../models/escalonamento.model';
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
  processos: Escalonamento[];
  nomes = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state === undefined) {
      this.router.navigate(['']);
    }
    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))

    this.state$.subscribe(data => {
      this.processos = data['processos'];
      this.nomes = this.processos.map(p => p.processo);
    });
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['']);
  }


}

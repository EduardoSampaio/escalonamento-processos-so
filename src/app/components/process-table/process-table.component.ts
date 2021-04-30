import { Router, ActivatedRoute } from '@angular/router';
import { Escalonamento } from './../../models/escalonamento.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {

  displayedColumns: string[] = ['processo', 'chegada', 'execucao', 'es1', 'tempoEs1', 'es2', 'tempoEs2'];
  dataSource = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state === undefined) {
      this.router.navigate(['']);
    }
    const { processos } = this.router.getCurrentNavigation().extras.state;

    this.dataSource = processos;
    console.log(this.dataSource);
  }


  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {

  displayedColumns: string[] = ['processo', 'chegada', 'execucao', 'es1', 'es2'];
  dataSource = [{ processo: 'P1', chegada: 0, execucao: 10, es1: 'T=8,U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P2', chegada: 10, execucao: 20, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P3', chegada: 20, execucao: 30, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P4', chegada: 0, execucao: 10, es1: 'T=8,U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P5', chegada: 10, execucao: 20, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P6', chegada: 20, execucao: 30, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P7', chegada: 0, execucao: 10, es1: 'T=8,U.T=1', es2: 'T=9 UT=9' },
  { processo: 'P8', chegada: 10, execucao: 20, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' },
    { processo: 'P9', chegada: 20, execucao: 30, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' },
    { processo: 'P10', chegada: 20, execucao: 30, es1: 'T=8 U.T=1', es2: 'T=9 UT=9' }];

  constructor() { }

  ngOnInit(): void {
  }

}

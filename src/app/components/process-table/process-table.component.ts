import { Router, ActivatedRoute } from '@angular/router';
import { Escalonamento } from './../../models/escalonamento.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {

  @Input() data: Escalonamento[];
  displayedColumns: string[] = ['processo', 'chegada', 'execucao', 'es1', 'tempoEs1', 'es2', 'tempoEs2'];
  dataSource = [];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.data;
    console.log(this.dataSource);
  }

}

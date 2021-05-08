import { Processo } from './../../models/processo.model';
import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-process-table',
  templateUrl: './process-table.component.html',
  styleUrls: ['./process-table.component.css']
})
export class ProcessTableComponent implements OnInit {

  @Input() data: Processo[];
  displayedColumns: string[] = ['nome', 'chegada', 'execucao', 'tempoEs1', 'es1', 'tempoEs2', 'es2'];
  dataSource = [];

  constructor() {}

  ngOnInit(): void {
    this.dataSource = this.data;
  }

}

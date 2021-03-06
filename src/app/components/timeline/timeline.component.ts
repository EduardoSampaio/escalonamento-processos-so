import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Output() onNext = new EventEmitter();
  @Output() onPrevious = new EventEmitter();
  @Input() tempoMaximo: number;
  colunas = new Array();

  @Input() nomes: string[];
  constructor() {
  }

  ngOnInit(): void {
    this.colunas = new Array(this.tempoMaximo + 10);
  }

  next(): void { this.onNext.emit() }

  previous(): void { this.onPrevious.emit() }
}

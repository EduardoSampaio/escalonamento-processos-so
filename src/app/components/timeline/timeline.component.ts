import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Output() onReset = new EventEmitter();
  @Output() onStart = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() onPrevious = new EventEmitter();

  colunas = new Array(50);
  @Input() nomes;
  constructor() {
    console.log(this.colunas);
  }

  ngOnInit(): void {
    console.log(this.nomes);
  }

  reset(): void { this.onReset.emit() }

  start(): void { this.onStart.emit() }

  next(): void { this.onNext.emit() }

  previous(): void { this.onPrevious.emit() }
}

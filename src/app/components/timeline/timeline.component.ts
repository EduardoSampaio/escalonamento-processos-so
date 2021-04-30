import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  colunas = new Array(51);
  @Input() nomes;
  constructor() {
    console.log(this.colunas);
  }

  ngOnInit(): void {
    console.log(this.nomes);
  }

}

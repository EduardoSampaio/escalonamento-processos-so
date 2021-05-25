import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ready-process',
  templateUrl: './app-ready-process.component.html',
  styleUrls: ['./app-ready-process.component.css']
})
export class ReadyProcessComponent implements OnInit {

  @Input() prontos: any;
  constructor() { }

  ngOnInit() {
  }

}

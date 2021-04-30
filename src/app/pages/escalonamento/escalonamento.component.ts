import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escalonamento',
  templateUrl: './escalonamento.component.html',
  styleUrls: ['./escalonamento.component.css']
})
export class EscalonamentoComponent implements OnInit {

  tempoMaximo = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    if (this.router.getCurrentNavigation().extras.state === undefined) {
      this.router.navigate(['']);
    }
    const { tempo } = this.router.getCurrentNavigation().extras.state;
    this.tempoMaximo = tempo;
    console.log(tempo);
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['']);
  }
}

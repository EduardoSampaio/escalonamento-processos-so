import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-escalonamento',
  templateUrl: './escalonamento.component.html',
  styleUrls: ['./escalonamento.component.css']
})
export class EscalonamentoComponent implements OnInit {

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log(this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
  }

  back(): void {
    this.router.navigate(['']);
  }
}

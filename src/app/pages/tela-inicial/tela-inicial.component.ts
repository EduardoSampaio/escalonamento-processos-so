import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  isDisable = true;
  selectedValue: any;
  file: File = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  start(): void{
    this.router.navigateByUrl('/escalonamento', { state: { id: this.selectedValue, file: this.file} });
  }

  selectionChange(): void
  {
    this.verificarSelection();
  }

  importarCsv(file: File): void
  {
    this.file = file;
    this.verificarSelection();
    console.log(file);
  }

  private verificarSelection(): void
  {
    if (this.selectedValue !== undefined && this.file !== null) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }

  clearFile(event: any): void {
    this.file = null;
    this.verificarSelection();
  }
}

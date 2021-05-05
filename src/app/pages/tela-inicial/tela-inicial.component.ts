import { MatSnackBar } from '@angular/material/snack-bar';
import { Escalonamento } from './../../models/escalonamento.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tela-inicial',
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css']
})
export class TelaInicialComponent implements OnInit {

  isDisable = true;
  selectedValue: any;
  file: File = null;
  tempoMaximo = 0;
  csvRecords: Array<Escalonamento> = [];
  header = false;

  constructor(
    private router: Router,
    private ngxCsvParser: NgxCsvParser,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  start(): void {
    this.router.navigateByUrl('/escalonamento', { state: { id: this.selectedValue, processos: this.csvRecords, tempo: this.tempoMaximo } });
  }

  selectionChange(): void {
    this.verificarSelection();
  }

  importarCsv(file: File): void {
    this.file = file;
    this.verificarSelection();

    this.ngxCsvParser.parse(file, { header: this.header, delimiter: ',' })
      // tslint:disable-next-line: deprecation
      .pipe().subscribe((result: Array<any>) => {
        this.csvToModel(result);
        this.verificarQtdProcesso();
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

  private verificarQtdProcesso() {
    if (this.csvRecords.length > 10) {
      this.showMessage('O arquivo pode possuir no máximo 10 processos');
      this.clearFile(undefined);
    }
  }

  private verificarSelection(): void {
    if (this.selectedValue !== undefined && this.file !== null) {
      this.isDisable = false;
    } else {
      this.isDisable = true;
    }
  }

  clearFile(event: any): void {
    this.file = null;
    this.csvRecords = [];
    this.verificarSelection();
  }

  private csvToModel(result: Array<any>): void {
    this.csvRecords = [];
    const lista: Array<Escalonamento> = [];

    for (const obj of result) {
      const newObj = new Escalonamento();
      newObj.processo = obj[0];
      newObj.chegada = obj[1];
      newObj.tempoExecucao = obj[2];
      newObj.es1 = obj[3];
      newObj.tempoEs1 = obj[4];
      newObj.es2 = obj[5];
      newObj.tempoEs2 = obj[6];
      // tslint:disable-next-line: radix
      this.tempoMaximo += parseInt(obj[2]);
      this.validValues(newObj);
      lista.push(newObj);
    }
    this.csvRecords = lista;
    this.requiredValues();
    this.calcularTempoMaximo();
  }

  private validValues(escalonamento: Escalonamento): void {
    const values = Object.values(escalonamento);
    for (let i = 1; i < values.length; i++) {
      if (values[i] !== undefined && values[i] < 0) {
        this.clearFile(undefined);
        this.showMessage('O Arquivo importado possui valores negativos');
      }

    }
  }

  private requiredValues() {
    for (const value of this.csvRecords) {
      if (value.processo === undefined || value.chegada === undefined || value.tempoExecucao === undefined) {
        this.clearFile(undefined);
        this.showMessage('Os campos nome do processo/tempo chegada/ tempo execução são obrigatórios');
        return;
      }
    }
  }

  private calcularTempoMaximo(): void {
    let soma = 0;

    for (const value of this.csvRecords) {
      if (value.tempoEs1 !== undefined) {
        soma += parseInt(value.tempoEs1.toString());
      }

      if (value.tempoEs2 !== undefined) {
        soma += parseInt(value.tempoEs2.toString());
      }

      if (value.tempoExecucao !== undefined) {

      } soma += parseInt(value.tempoExecucao.toString());

    }
    this.tempoMaximo = soma;
  }

  private showMessage(msg: string): void {
    this.snackbar.open(
      msg,
      'X',
      {
        duration: 5000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }

  download(): void {
    saveAs('assets/template.csv', 'template.csv')
  }
}

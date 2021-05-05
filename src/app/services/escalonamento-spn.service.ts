import { Escalonamento } from './../models/escalonamento.model';
import { Processo } from './../models/processo.model';
import { Injectable } from '@angular/core';


const processo: Array<Processo> = [
  { nome: 'P1', chegada: 0, proxInicio: 0, proxTermino: 5, tempoExecucao: 5, tempoRestante: 0 },
  { nome: 'P2', chegada: 3, proxInicio: 6, proxTermino: 9, tempoExecucao: 3, tempoRestante: 0 },
  { nome: 'P3', chegada: 6, proxInicio: 10, proxTermino: 15, tempoExecucao: 5, tempoRestante: 0 },
  { nome: 'P4', chegada: 4, proxInicio: 16, proxTermino: 22, tempoExecucao: 7, tempoRestante: 0 },
]


@Injectable({
  providedIn: 'root'
})
export class EscalonamentoSpnService {

  private queueNext: Array<Processo> = processo;
  private stackPrevious: Array<Processo> = [];

  preemptivo = false;

  get next(): Array<Processo> {
    return this.queueNext;
  }

  get previous(): Array<Processo> {
    return this.stackPrevious;
  }

  constructor() { }

  executar(processos: Escalonamento[]): void {}

  enqueueNext(processo: Processo): void {
    this.queueNext.push(processo);
  }

  dequeueNext(): Processo {
    if (this.queueNext.length > 0) {
      const processo = this.queueNext.shift();
      this.pushPrevious(processo);
      return processo;
    }
  }

  pushPrevious(processo: Processo): void {
    this.stackPrevious.push(processo);
  }

  popPrevious(): Processo {
    if (this.stackPrevious.length > 0) {
      const processo = this.stackPrevious.pop();
      this.queueNext.unshift(processo);
      return processo;
    }
  }
}

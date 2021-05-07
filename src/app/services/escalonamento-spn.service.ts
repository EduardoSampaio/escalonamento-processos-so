import { Escalonamento } from './../models/escalonamento.model';
import { Processo } from './../models/processo.model';
import { Injectable } from '@angular/core';


// const processo: Array<Processo> = [
//   { nome: 'P1', chegada: 0, inicio: 0, termino: 5, tempoExecucao: 5, tempoRestante: 0 },
//   { nome: 'P2', chegada: 3, inicio: 6, termino: 9, tempoExecucao: 3, tempoRestante: 0 },
//   { nome: 'P3', chegada: 6, inicio: 10, termino: 15, tempoExecucao: 5, tempoRestante: 0 },
//   { nome: 'P4', chegada: 4, inicio: 16, termino: 22, tempoExecucao: 7, tempoRestante: 0 },
// ]


@Injectable({
  providedIn: 'root'
})
export class EscalonamentoSpnService {

  private queueNext: Array<Processo> = [];
  private stackPrevious: Array<Processo> = [];
  private queueWait: Array<Processo> = [];
  private listProcess: Array<Processo> = [];

  private MAXTIME = 0;
  private TIME = 0;

  get next(): Array<Processo> {
    return this.queueNext;
  }

  get previous(): Array<Processo> {
    return this.stackPrevious;
  }

  constructor() { }

  removeEspera(processo: Processo): Array<Processo> {
    if (this.queueWait.length > 0) {
      this.queueWait = this.queueWait.filter((e) => e.nome !== processo.nome);
      return this.queueWait;
    }
    return null;
  }

  removeList(processo: Processo): Array<Processo> {
    if (this.listProcess.length > 0) {
      this.listProcess = this.listProcess.filter((e) => e.nome !== processo.nome);
      return this.listProcess;
    }
    return null;
  }

  compare(a: Processo, b: Processo): number {
    if (a.tempoExecucao < b.tempoExecucao) {
      return -1;
    }

    if (a.tempoExecucao > b.tempoExecucao) {
      return 1;
    }
    return 0;
  }

  nextWait(time: number) {
    let emEspera = this.queueWait.filter((e) => e.esperando == time);
    for (const processo of emEspera) {
      this.removeEspera(processo);
      this.listProcess.push(processo);
    }
  }

  nextProcess(nextTime: number): Processo {
    let values = this.listProcess.filter((e) => e.chegada <= nextTime);
    if (values.length > 0) {
      let nextProcess = values.sort(this.compare)[0];
      this.removeList(nextProcess);
      return nextProcess;
    }
    return null;
  }

  isWaitProcess(processo: Processo) {
    if ((processo.tempoEs1 !== undefined && processo.tempoEs1 == this.TIME)
      || (processo.tempoEs2 !== undefined && processo.tempoEs2 == this.TIME)) {
      return true;
    }
    return false;
  }

  isEmptyWaitQueue(): boolean {
    if (this.queueWait.length > 0) {
      return false;
    }
    return true;
  }

  createProcess(processo: Processo): Processo {
    return { ...processo };
  }

  create(processos: Escalonamento[]): void {
    for(const processo of processos)
    {
       let newProcess = new Processo();
       newProcess.nome = processo.processo;
       newProcess.chegada = processo.chegada;
       newProcess.tempoExecucao = processo.tempoExecucao;
       newProcess.tempoRestante = processo.tempoExecucao;
       newProcess.es1 = processo.es1;
       newProcess.es2 = processo.es2;
       newProcess.tempoEs1 = processo.tempoEs1;
       newProcess.tempoEs2 = processo.tempoEs2;
       this.listProcess.push(newProcess);
    }
  }

  executar(processos: Escalonamento[], maxTime: number): void {
    console.log(this.listProcess);
    this.MAXTIME = maxTime;
    let inicio = this.TIME;
    let processo = this.nextProcess(this.TIME);
    for (this.TIME; this.TIME <= this.MAXTIME + 1 && processo != null; this.TIME++) {
        if (processo.inicio === undefined) {
            processo.inicio = inicio;
        }
        if (!this.isEmptyWaitQueue()) {
            this.nextWait(this.MAXTIME);
        }
        if (!this.isWaitProcess(processo)) {
            if (processo.tempoRestante > 1) {
                processo.tempoRestante--;
            } else {
                processo.tempoRestante--;
                if (processo.termino === undefined) {
                    processo.termino = this.TIME;
                    this.queueNext.push(processo);
                } else {
                    let newProcesso = this.createProcess(processo);
                    newProcesso.inicio = inicio;
                    newProcesso.termino = this.TIME;
                    this.queueNext.push(newProcesso);
                }

                processo = this.nextProcess(this.TIME);
            }
        } else {
            let newProcesso = this.createProcess(processo);
            newProcesso.inicio = inicio;
            newProcesso.termino = this.TIME;
            this.queueNext.push(newProcesso);
            this.queueWait.push(newProcesso);
            processo =  this.nextProcess(this.TIME)
        }
        inicio = this.TIME + 1;
    }
  }

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

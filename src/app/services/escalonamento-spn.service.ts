import { Processo } from './../models/processo.model';
import { Injectable } from '@angular/core';
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
    if (a.tempoRestante < b.tempoRestante) {
      return -1;
    }

    if (a.tempoRestante > b.tempoRestante) {
      return 1;
    }
    return 0;
  }

  nextWait(time: number): void {
    const emEspera = this.queueWait.filter((e) => (e.esperando1 == this.TIME) || (e.esperando2 == this.TIME));
    for (const processo of emEspera) {
      this.removeEspera(processo);
      const newProcesso = this.createProcess(processo);
      newProcesso.inicio = undefined;
      newProcesso.termino = undefined;
      this.listProcess.push(newProcesso);
    }
  }

  nextProcess(nextTime: number): Processo {
    const values = this.listProcess.filter((e) => e.chegada <= nextTime);
    if (values.length > 0) {
      const nextProcess = values.sort(this.compare)[0];
      this.removeList(nextProcess);
      return nextProcess;
    }
    return null;
  }

  isWaitProcess(processo: Processo): boolean {
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

  addNew(processo: Processo, inicio: number): void {
    if (processo.termino === undefined) {
      processo.termino = this.TIME;
      this.queueNext.push(processo);
    }
    else {
      const newProcesso = this.createProcess(processo);
      newProcesso.inicio = inicio;
      newProcesso.termino = this.TIME;
      this.queueNext.push(newProcesso);
    }
  }

  putWait(processo: Processo): void {
    const newProcesso = this.createProcess(processo);
    if (processo.tempoEs1 !== undefined && processo.tempoEs1 == this.TIME) {
      newProcesso.termino = this.TIME;
      this.TIME--;
    }

    if (processo.tempoEs2 !== undefined && processo.tempoEs1 == this.TIME) {
      newProcesso.termino = this.TIME;
      this.TIME--;
    }
    this.queueNext.push(newProcesso);
    this.queueWait.push(newProcesso);
  }

  executar(processos: Processo[], maxTime: number): void {
    this.listProcess = processos;
    this.MAXTIME = maxTime;
    let inicio = 0;
    let processo = this.nextProcess(this.TIME);
    for (this.TIME; this.TIME <= this.MAXTIME && processo !== null; this.TIME++) {
      inicio = this.TIME;
      if(processo === null || processo === undefined)
      {
        processo = this.nextProcess(this.TIME);
      }else{
        if (processo.inicio === undefined) {
          processo.inicio = inicio;
        }
        if (!this.isEmptyWaitQueue()) {
          this.nextWait(this.TIME);
        }
        if (!this.isWaitProcess(processo)) {
          if (processo.tempoRestante > 1) {
            processo.tempoRestante--;
          }
          else {
            processo.tempoRestante--;
            this.addNew(processo, inicio);
            processo = this.nextProcess(this.TIME);
          }
        } else {
          this.putWait(processo);
          processo = this.nextProcess(this.TIME);
        }
      }
    }
    console.log(this.queueNext)
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

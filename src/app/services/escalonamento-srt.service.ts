import { Processo } from '../models/processo.model';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EscalonamentoSrtService {

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

  removeFila(nextProcess: Processo, currentProcess: Processo) {
    if (this.listProcess.length > 0) {
        if (currentProcess == null || nextProcess.nome !== currentProcess.nome) {
          this.listProcess = this.listProcess.filter((e) => e.nome !== nextProcess.nome);
            if (currentProcess != null && currentProcess.tempoRestante > 0) {
              this.listProcess.push(currentProcess);
            }
        }
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

  nextWait(time: number): void {
    const emEspera = this.queueWait.filter((e) => (e.esperando1 == this.TIME) || (e.esperando2 == this.TIME));
    for (const processo of emEspera) {
      this.removeEspera(processo);
      this.listProcess.push(processo);
    }
  }

  nextProcess(nextTime: number, currentProcess: Processo): Processo {
    let prontos = this.listProcess.filter((e) => e.chegada <= nextTime);
    if (currentProcess !== null && currentProcess.tempoRestante > 0) {
        prontos.push(currentProcess);
    }
    if (prontos.length > 0) {
        let nextProcess = prontos.sort(this.compare)[0];
        this.removeFila(nextProcess, currentProcess);
        return nextProcess;
    }
    return null;
}
  minTime(nextTime: number, processo: Processo) {
    if (processo !== null) {
        let prontos = this.listProcess.filter((e) => e.chegada <= nextTime);
        prontos.push(processo);
        if (prontos.length > 0) {
            let min = prontos.sort(this.compare)[0];
            if (min.nome !== processo.nome && processo.tempoRestante !== min.tempoRestante) {
                return true;
            }
        }
    }
    return false;
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

  addNew(processo: Processo, inicio: number): Processo {
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
    processo = this.nextProcess(this.TIME, processo);
    return processo;
  }

  putWait(processo: Processo): void {
    const newProcesso = this.createProcess(processo);
    if (processo.tempoEs1 !== undefined && processo.tempoEs1 == this.TIME) {
      newProcesso.termino = (this.TIME - processo.es1) + 1;
      this.TIME -= processo.es1 - 1;
    }

    if (processo.tempoEs2 !== undefined && processo.tempoEs1 == this.TIME) {
      newProcesso.termino = (this.TIME - processo.es2) + 1;
      this.TIME -= processo.es2 - 1;
    }

    this.queueNext.push(newProcesso);
    this.queueWait.push(newProcesso);
  }

  executar(processos: Processo[], maxTime: number): void {
    this.listProcess = processos;
    this.MAXTIME = maxTime;
    let inicio = this.TIME;
    let processo = this.nextProcess(this.TIME, null);
    for (this.TIME; this.TIME <= this.MAXTIME + 1 && processo != null; this.TIME++) {
      if (processo.inicio === undefined) {
        processo.inicio = inicio;
      }
      if (!this.isEmptyWaitQueue()) {
        this.nextWait(this.MAXTIME);
      }
      if (!this.isWaitProcess(processo)) {
        if (this.minTime(this.TIME, processo)) {
          processo = this.addNew(processo, inicio);
        }
        if (processo.tempoRestante > 1) {
          processo.tempoRestante--;
        }
        else {
          processo.tempoRestante--;
          processo = this.addNew(processo, inicio);
        }
      } else {
        this.putWait(processo);
        processo = this.nextProcess(this.TIME, processo);
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

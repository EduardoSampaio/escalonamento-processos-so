import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private queueReady: Array<any> = [];
  private queueWait: Array<any> = [];
  private queueNext: Array<any> = [];
  private stackPrevious: Array<any> = [];

  constructor() { }

  enqueueReady(processo: any): void {
    this.queueReady.push(processo)
  }

  dequeueReady(): void {
    if (this.queueReady.length > 0)
    {
      this.queueReady.shift();
    }
  }

  enqueueWait(): void { }

  dequeueWait(): void { }

  enqueueNext(): void { }

  dequeueNext(): void { }

  pushPrevious(): void { }

  popPrevious(): void { }
}

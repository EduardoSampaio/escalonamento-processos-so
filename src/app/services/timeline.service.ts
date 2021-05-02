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


}

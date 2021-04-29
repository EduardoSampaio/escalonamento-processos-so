import { EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appDragDropUploadFile]'
})
export class DragDropUploadFileDirective {

  constructor() { }

  @Input() preventBodyDrop = true;

  @HostBinding('class.hover-active')
  active = false;

  @Output() fileDrop = new EventEmitter<Array<File>>();

  @HostListener('drop', ['$event'])
  onDrop(event: any): void {
    event.preventDefault();
    this.active = false;

    const { dataTransfer } = event;

    if (dataTransfer.items) {
      const files = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dataTransfer.items.length; i++) {
        if (dataTransfer.items[i].kind === 'file') {
          files.push(dataTransfer.items[i].getAsFile());
        }
      }
      dataTransfer.items.clear();
      this.fileDrop.emit(files);
    } else {
      const files = dataTransfer.files;
      dataTransfer.clearData();
      this.fileDrop.emit(Array.from(files));
    }
  }

  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.active = true;
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    this.active = false;
  }

}

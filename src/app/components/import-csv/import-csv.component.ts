import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import-csv',
  templateUrl: './import-csv.component.html',
  styleUrls: ['./import-csv.component.css']
})
export class ImportCsvComponent implements OnInit {

  constructor(
    private snackbar: MatSnackBar
  ) { }

  @Output() selectedFile = new EventEmitter<File>();
  @Output() clearFile = new EventEmitter<File>();
  filename = '';
  file: File;

  private readonly EXTENSIONS = [
    'text/csv',
    '.csv',
    'application/vnd.ms-excel'
  ];

  ngOnInit(): void { }

  onFileDrop(file: File): void {
    if (
      file !== null &&
      file[0].type !== undefined &&
      this.validateExtensions(file[0].type)
    ) {
      this.setFilename(file[0].name);
      this.file = file[0];
      this.selectedFile.emit(file[0]);
    } else {
      this.showMessage(file[0].type);
    }
  }
  openFileBrowser(): void {
    document.getElementById('escalonamento').click();
  }

  setFilename(name: string): void {
    if (name.length > 30) {
      this.filename =
        name.substring(0, 30) +
        '...' +
        name.substring(name.length - 4, name.length);
    } else {
      this.filename = name;
    }
  }
  validateExtensions(type: string): boolean {
    console.log(type);
    if (!this.EXTENSIONS.includes(type)) {
      return false;
    }
    return true;
  }

  showMessage(msg: string): void {
    this.snackbar.open(
      `O Arquivo importado tem um formato ${msg} é inválido`,
      'X',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }

  onFileChange(event: any): void {
    const file = event.srcElement.files[0] as File;
    if (file !== undefined && this.validateExtensions(file.type)) {
      this.setFilename(file.name);
      this.file = file;
      this.selectedFile.emit(file);
      event.srcElement.value = null;
    } else {
      this.showMessage(file.type);
    }
  }

  onClearFile(): void {
    this.filename = '';
    this.file = null;
    this.clearFile.emit(null);
  }

}

import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IItemModel } from './models';

@Component({
  selector    : 'multi-file-upload',
  templateUrl : './multi-file-upload.component.html',
  styleUrls   : ['./multi-file-upload.component.scss'],
})

export class MultiFileUploadComponent {
  @Output() updateFiles: EventEmitter<Blob[]> = new EventEmitter();
  @Output() updateImages: EventEmitter<string[]> = new EventEmitter();

  @Input() error: boolean = false;

  @Input('uploadedFiles') set setUploadedFiles(value: string[]) {
    if (value && !this.files.length) {
      this.files = [];
      value.forEach(x => {
        this.files.push({
          blob     : null,
          path     : x,
          viewPath : x,
        });
      });
    }
  }

  public files: IItemModel[] = [];
  public removedIds: number[] = [];

  private getFilesFromModel = (): Blob[] => this.files.filter(x => x.blob).map(x => x.blob);

  public uploadFiles = (files: Blob[]): void => {
    Object.keys(files).map(file => {
      if (file) {
        const READER = new FileReader();
        READER.readAsDataURL(files[file]);
        READER.onload = () => {
          this.files.push({
            blob     : files[file],
            path     : null,
            viewPath : READER.result,
          });
          this.updateFiles.emit(this.getFilesFromModel());
        };
      }
    });
  }

  public delete = (index: number) => {
    const item = this.files[index];
    this.files.splice(index, 1);
    if (item.path) {
      this.updateImages.emit(
        this.files.filter(x => x.path).map(x => x.path),
      );
    } else if (item.blob) {
      this.updateFiles.emit(this.getFilesFromModel());
    }
  }
}

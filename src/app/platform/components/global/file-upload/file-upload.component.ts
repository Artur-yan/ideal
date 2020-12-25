import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
  @Output() updateFile: EventEmitter<Blob> = new EventEmitter();
  @Input() viewPath: string | ArrayBuffer;
  @Input() error: boolean;

  public uploadFile = (files: Blob[]): void => {
    const file = files[0];
    if (file) {
      const READER = new FileReader();
      READER.readAsDataURL(file);
      READER.onload = () => {
        this.viewPath = READER.result;
        this.updateFile.emit(file);
      };
    }
  }
}

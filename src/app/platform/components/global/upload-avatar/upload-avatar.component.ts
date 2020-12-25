import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-upload-avatar',
  templateUrl: './upload-avatar.component.html',
  styleUrls: ['./upload-avatar.component.scss'],
})
export class UploadAvatarComponent {

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

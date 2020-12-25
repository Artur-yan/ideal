import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output() evChange: EventEmitter<any> = new EventEmitter();
  @Input() set isOpened(data: boolean) {
    if (data) {
      this.isOpen = true;
    } else {
      this.close();
    }
  }

  @Input() id: number;
  @Input() rotate: boolean;
  public isOpen: boolean;

  public changeIsOpenState = (event): void => {
    this.isOpen = !this.isOpen;
    this.evChange.emit(this.id);
  }

  public close = () => {
    this.isOpen = false;
  }
}

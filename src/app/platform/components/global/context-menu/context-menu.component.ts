import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss'],
})
export class ContextMenuComponent {

  @Output() onContextClick = new EventEmitter();

  private disableClick: boolean;
  public x: number;
  public y: number;

  public clear = () => {
    if (!this.disableClick && (this.x || this.y)) {
      this.x = undefined;
      this.y = undefined;
    }
  }

  public context = (e: MouseEvent) => {
    this.disableClick = true;
    setTimeout(() => this.disableClick = false, 0);
    e.preventDefault();
    this.x = e.x;
    this.y = e.y;
    this.onContextClick.emit();
  }

  public stopEvent = (e: MouseEvent) => {
    e.stopPropagation();
  }
}

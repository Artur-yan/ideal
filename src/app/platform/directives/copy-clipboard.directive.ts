import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ToasterService } from '@platform/modules/toaster/services/toaster.service';

@Directive({
  selector: '[copyClipboard]',
})
export class CopyClipboardDirective {

  @Input() copyClipboard: string;
  @Input() notify: boolean;
  @Output() copied = new EventEmitter<string>();

  constructor(
    private toasterService: ToasterService,
  ) {

  }

  @HostListener('click', ['$event'])
  public onClick(event: MouseEvent): void {

    event.preventDefault();
    if (!this.copyClipboard)
      return;

    const listener = (e: ClipboardEvent) => {
      const clipboard = e.clipboardData || window['clipboardData'];
      clipboard.setData('text', this.copyClipboard.toString());
      e.preventDefault();

      if (this.notify) {
        this.toasterService.showNotification('Copied to clipboard!');
      }
      this.copied.emit(this.copyClipboard);
    };

    document.addEventListener('copy', listener, false);
    document.execCommand('copy');
    document.removeEventListener('copy', listener, false);
  }

}

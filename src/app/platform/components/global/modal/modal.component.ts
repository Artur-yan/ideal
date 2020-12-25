import { Component, Input, EventEmitter, Output, HostListener, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector    : 'app-modal',
  templateUrl : './modal.component.html',
  styleUrls   : ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {

  @Output() close: EventEmitter<undefined> = new EventEmitter();
  @Input() alignCenter: boolean;

  @HostListener('window:keyup', ['$event'])
    keyEvent(event: KeyboardEvent) {
      // tslint:disable-next-line: deprecation
      if (event.keyCode === 27) {
        this.close.emit();
      }
    }

  ngOnInit(): void {
    document.body.style.overflowY = 'hidden';
  }
  
  ngOnDestroy(): void {
    document.body.style.overflowY = 'initial';
  }
}

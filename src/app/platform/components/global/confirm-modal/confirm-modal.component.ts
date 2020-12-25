import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() text: string = 'Are you sure you want to Log out from your account?';
  @Input() title: string = 'Delete Photo';
  @Output() close: EventEmitter<undefined> = new EventEmitter();
  @Output() confirm: EventEmitter<undefined> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}

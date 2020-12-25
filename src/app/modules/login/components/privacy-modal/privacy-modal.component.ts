import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-privacy-modal',
  templateUrl: './privacy-modal.component.html',
  styleUrls: ['./privacy-modal.component.scss'],
})
export class PrivacyModalComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

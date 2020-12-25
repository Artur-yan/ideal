import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-terms-modal',
  templateUrl: './terms-modal.component.html',
  styleUrls: ['./terms-modal.component.scss']
})
export class TermsModalComponent implements OnInit {
  @Output() close: EventEmitter<undefined> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}

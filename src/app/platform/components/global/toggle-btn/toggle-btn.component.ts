import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toggle-btn',
  templateUrl: './toggle-btn.component.html',
  styleUrls: ['./toggle-btn.component.scss'],
})
export class ToggleBtnComponent implements OnInit {

  @Input() condition: boolean;
  @Output() change = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(event: MouseEvent) {
    event.stopPropagation();
    event.preventDefault();
    this.change.emit(event);
  }
}

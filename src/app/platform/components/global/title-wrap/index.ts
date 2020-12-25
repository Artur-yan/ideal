import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector    : 'title-wrap',
  templateUrl : './index.html',
  styleUrls   : ['./index.scss'],
})
export class TitleWrap {

  @Output() onBack = new EventEmitter();
  @Input() title: string = '';
  @Input() route: string = '';
  @Input() backWithLocation: boolean = false;

  constructor(
    private location: Location,
  ) {
  }

  public back(): void {
    this.onBack.emit();
    this.location.back();
  }
}

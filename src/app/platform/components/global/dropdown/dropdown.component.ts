import { Component, Input, Output, EventEmitter } from '@angular/core';

import { DropdownModel } from '@platform/models/select';

@Component({
  selector    : 'app-dropdown',
  templateUrl : './dropdown.component.html',
  styleUrls   : ['./dropdown.component.scss'],
})

export class DropdownComponent {
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() list: DropdownModel[] = [];
  @Input() disabledItems: any[] = [];
  @Input() disable: boolean;
  @Input() error: boolean;
  @Input() placeholder: string = '';
  @Input() get value(): any {
    return this._selectedValue;
  }

  private _selectedValue: any;
  public isOpen: boolean;

  constructor() {}

  get selectedItem(): DropdownModel {
    return this.list.find(item => JSON.stringify(item.value) === JSON.stringify(this.value)) || null;
  }

  set value(val: any) {
    this.close();
    const oldValue = this._selectedValue;
    this._selectedValue = val;
    if (oldValue !== this._selectedValue) {
      this.valueChange.emit(this._selectedValue);
    }
  }

  public change = (item: DropdownModel): void => {
    if (!this.isDisabled(item)) this.value = item.value;
  }

  public toggle = (): void => {
    if (!this.disable && this.list.length) {
      this.isOpen = !this.isOpen;
    }
  }
  public close = (): void => {
    if (this.isOpen) this.isOpen = false;
  }

  public isSelected = (item: DropdownModel): boolean => {
    return item.value === this.value;
  }

  public isDisabled = (item: DropdownModel): boolean => {
    return this.disabledItems.some(el => item.value === el);
  }
}

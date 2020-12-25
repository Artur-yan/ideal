import { Component, EventEmitter, Output, Input } from '@angular/core';
import { DropdownModel } from '@platform/models/select';

@Component({
  selector: 'app-multi-dropdown',
  templateUrl: './multi-dropdown.component.html',
  styleUrls: ['./multi-dropdown.component.scss'],
})
export class MultiDropdownComponent {
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() list: DropdownModel[] = [];
  @Input() disabledItems: any[] = [];
  @Input() disable: boolean;
  @Input() multipleViewByName: boolean;
  @Input() error: boolean;
  @Input() placeholder: string = '';
  @Input() get value(): any[] { return this._selectedItems || []; }

  private _selectedItems: any[];
  isOpen: boolean;

  constructor() { }

  get title(): string {
    if (!(this._selectedItems && this._selectedItems.length)) return this.placeholder;
    if (!this.multipleViewByName || this._selectedItems.length > 4) return this._selectedItems.length + ' Selected';

    let title: string = '';

    this.list.forEach(item => {
      if (this.isSelected(item)) title += `${item.name}, `;
    });

    title = title.slice(0, title.length - 2);

    return title;
  }

  set value(val: any[]) {
    if (val) {
      this._selectedItems = val;
      this.change.emit(this._selectedItems);
    }
  }

  public onSelect = (item: DropdownModel): void => {
    if (!this.isSelected(item)) {
      this.value = [...this.value, item.value];
    } else {
      this.value = this.value.filter(el => JSON.stringify(el) !== JSON.stringify(item.value));
    }
  }

  public toggle = (): void => {
    if (!this.disable) {
      if (this.list.length) {
        this.isOpen = !this.isOpen;
      }
    }
  }
  public close = (): void => {
    if (this.isOpen) this.isOpen = false;
  }

  public isSelected = (item: DropdownModel): boolean => {
    return this.value.find(x => JSON.stringify(x) === JSON.stringify(item.value));
  }

  public isDisabled = (item: DropdownModel): boolean => {
    let flag: boolean;
    this.disabledItems.forEach(el => {
      if (item.value === el) flag = true;
    });
    return flag;
  }
}

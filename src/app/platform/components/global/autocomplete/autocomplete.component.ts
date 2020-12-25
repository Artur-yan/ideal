import { Component, Output, EventEmitter, Input } from '@angular/core';
import { DropdownModel } from '@platform/models/select';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent {

  @Output() selectedIdChange: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
  @Input() disabled: boolean;
  @Input() updateListLocal: boolean;
  @Input() error: boolean;
  @Input() placeholder: string = '';
  @Input() get selectedId(): number {
    return this.id;
  }
  @Input() get value(): string {
    return this._value;
  }
  @Input() private set list(value: DropdownModel[]) {
    if (value) {
      this.dataList = [...value];
      this.dataFullList = [...value];
    }
    const data = this.dataList.find(item => item.value === this.id);
    if (data && data.name) {
      this.value = data.name;
    }
    if (this.isFocused) {
      this.open();
    }
  }

  private _value: string;
  private id: number;
  dataList: DropdownModel[] = [];
  dataFullList: DropdownModel[] = [];
  isOpen: boolean;
  isFocused: boolean;

  set value(data: string) {
    this._value = data;
    this.valueChange.emit(this._value);
    if (this.updateListLocal) {
      if (this._value) {
        this.dataList = this.dataFullList.filter(x => x.name.toLowerCase().includes(this._value.toLowerCase()));
      } else {
        this.dataList = [...this.dataFullList];
      }
    }
    const item = this.dataList.find(x => x.name.toLowerCase() === (data || '').toLowerCase());
    if (item) {
      this.selectedId = item.value;
    } else if (this.id || this.id === 0) {
      this.selectedId = null;
    }
  }

  set selectedId(value: number) {
    if (this.id !== value) {
      this.id = value;
      this.selectedIdChange.emit(this.id);
    }
  }

  close(): void {
    this.isOpen = false;
  }
  
  open(): void {
    this.isOpen = !!this.dataList.length;
  }

  onFocus = () => {
    this.open();
    this.isFocused = true;
  }

  change = (item: DropdownModel) => {
    this.value = item.name;
    this.selectedId = item.value;
    this.isOpen = false;
  }

  onBlur() {
    this.isFocused = false;
  }
}

export class DropdownModel<T = any> {
  public name: string;
  public value: T;
  public photo: string;

  constructor(name: string, value: T, photo?: string) {
    this.name = name;
    this.value = value;
    this.photo = photo;
  }
}

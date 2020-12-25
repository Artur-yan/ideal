import { storage } from './storage';

export abstract class Validation {

  isSubmited = false;

  abstract errors: any;

  public validate(): boolean {
    if (!this.isSubmited) {
      this.isSubmited = true;
    }
    const arr = storage.validate(this);
    Object.keys(this.errors).forEach(key => this.errors[key] = false);
    arr.forEach(x => this.errors[x] = true);

    return !arr.length;
  }
}

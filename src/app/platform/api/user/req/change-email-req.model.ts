import {Validation} from '@platform/validation';

export class ChangeEmailReqModel extends Validation {

  email: string = '';
  code1: string = '';
  code2: string = '';
  code3: string = '';
  code4: string = '';
  errors = {
    email: false,
    code: false,
  };

  validate(): boolean {
    let valid = super.validate();
    const code = '' + this.code1 + this.code2 + this.code3 + this.code4;

    if (code.length == 4) {
      valid = true;
      this.errors.code = false;
    } else {
      this.errors.code = true;
      valid = false;
    }

    return valid;
  }

  getModel() {
    return {
      code  : '' + this.code1 + this.code2 + this.code3 + this.code4,
      email : this.email,
    };
  }

}

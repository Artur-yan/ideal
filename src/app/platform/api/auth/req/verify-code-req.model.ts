import { Validation } from '@platform/validation';
import { IsEmail, IsNotEmpty } from '@platform/validation/decorators';

export class VerifyCodeReqModel extends Validation {

  @IsEmail()
  email: string = '';
  code: string = '';
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
      userName: this.email,
      code: '' + this.code1 + this.code2 + this.code3 + this.code4,
    };
  }

  clearCode() {
    this.code1 = '';
    this.code2 = '';
    this.code3 = '';
    this.code4 = '';
    this.errors.code = false;
  }

}

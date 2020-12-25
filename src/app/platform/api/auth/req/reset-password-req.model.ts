import { Validation } from '@platform/validation';
import { IsEmail, MinLength } from '@platform/validation/decorators';

export class ResetPasswordReqModel extends Validation {

  @IsEmail()
  email: string = '';

  @MinLength(6)
  password: string = '';

  confirm: string = '';

  @MinLength(4)
  code: string = '';

  errors = {
    email: false,
    password: false,
    confirm: false,
    code: false,
  };

  validate(): boolean {
    let valid = super.validate();

    if (this.password !== this.confirm) {
      this.errors.password = true;
      this.errors.confirm = true;
      valid = false;
    }
    
    return valid;
  }

  getModel() {
    return {
      userName: this.email,
      password: this.password,
      code: this.code,
    };
  }

}

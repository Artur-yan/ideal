import { Validation } from '@platform/validation';
import { MinLength } from '@platform/validation/decorators';

export class ChangePasswordRM extends Validation {

  @MinLength(6)
  password: string = '';

  @MinLength(6)
  confirmPassword: string = '';
  
  @MinLength(6)
  oldPassword: string = '';

  public errors = {
    password        : false,
    confirmPassword : false,
    oldPassword : false,
  };

  public validate(): boolean {
    const valid = super.validate();

    if (this.password !== this.confirmPassword) {
      this.errors.password = true;
      this.errors.confirmPassword = true;
      return false;
    }
    return valid;
  }

  public getModel() {
    return {
      oldPassword : this.oldPassword,
      password : this.password,
    };
  }
}

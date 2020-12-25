import { Validation } from '@platform/validation';
import { Min, MinLength } from '@platform/validation/decorators';
import { CountryCodeEnum } from '@enums/country-code.enum';
import { RegisterTypeEnum } from '@enums/register-type.enum';

export class LoginRM extends Validation {

  email: string = '';

  @Min(8)
  phoneNumber: string = '';

  @MinLength(6)
  password: string = '';
  phoneCode: CountryCodeEnum | '' = CountryCodeEnum.Arm;
  loginType: RegisterTypeEnum = RegisterTypeEnum.Phone;
  errors = {
    email: false,
    phoneNumber: false,
    password: false,
  };

  validate(): boolean {
    let valid = super.validate();

    if (this.loginType === RegisterTypeEnum.Email) {

      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(String(this.email).toLowerCase())) {
        this.errors.email = true;
        valid = false;
      }
    } else {

      if (!this.phoneNumber) {
        this.errors.phoneNumber = true;
        valid = false;
      }
    }

    return valid;
  }

  getModel() {
    return {
      userName: this.loginType === RegisterTypeEnum.Email ? this.email : this.phoneCode + this.phoneNumber,
      password: this.password,
    };
  }
}

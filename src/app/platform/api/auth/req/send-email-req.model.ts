import {Validation} from '@platform/validation';
import {CountryCodeEnum} from '@enums/country-code.enum';
import {RegisterTypeEnum} from '@enums/register-type.enum';

export class SendEmailReqModel extends Validation {

  email: string = '';
  phoneCode: CountryCodeEnum = CountryCodeEnum.Arm;
  phoneNumber: string = '';
  registerType: RegisterTypeEnum = RegisterTypeEnum.Phone;
  errors = {
    phoneNumber: false,
    email: false,
  };

  validate(): boolean {
    let valid = super.validate();

    if (this.registerType === RegisterTypeEnum.Email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!re.test(String(this.email).toLowerCase())) {
        this.errors.email = true;
        valid = false;
      }
    } else if (!this.phoneNumber || this.phoneNumber.toString().length !== 8) {
      this.errors.phoneNumber = true;
      valid = false;
    }

    return valid;
  }

  getModel() {
    return {
      userName: this.email ? this.email : this.phoneNumber ? (this.phoneCode + this.phoneNumber) : '',
    };
  }

}

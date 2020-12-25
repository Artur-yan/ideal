import { CountryCodeEnum } from '@enums/country-code.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { Validation } from '@platform/validation';
import { MinLength } from '@platform/validation/decorators';

export class RegisterRM extends Validation {

  email: string;
  @MinLength(6)
  password: string = '';
  privacy = false;
  confirm: string = '';
  phoneCode: CountryCodeEnum | '' = CountryCodeEnum.Arm;
  phoneNumber: string = '';
  userType: UserTypeEnum = UserTypeEnum.Physical;

  errors = {
    email    : false,
    confirm  : false,
    password : false,
    privacy  : false,
  };

  validate(): boolean {
    let valid = super.validate();

    if (this.password !== this.confirm) {
      this.errors.password = true;
      this.errors.confirm = true;
      valid = false;
    }

    if (!this.privacy) {
      this.errors.privacy = true;
      valid = false;
    }
    return valid;
  }

  getModel() {
    return {
      email             : this.email ? this.email : null,
      phoneNumber       : this.phoneNumber ? this.phoneNumber : null,
      addressName       : null,
      password          : this.password,
      userTypeEnumValue : this.userType,
      // genderEnumValue: this.gender,
    };
  }
}

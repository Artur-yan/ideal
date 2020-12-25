import {Validation} from '@platform/validation';
import {CountryCodeEnum} from '@enums/country-code.enum';
import {GenderEnum} from '@enums/gender';

export class ChangePhysicalUserInfoRM extends Validation {

  dateOfBirth: Date = null;
  firstName: string = '';
  lastName: string = '';
  secondPhoneNumber: string = '';
  gender: GenderEnum = null;
  secondPhoneCode: CountryCodeEnum = CountryCodeEnum.Arm;

  errors = {
    dateOfBirth       : false,
    firstName         : false,
    lastName          : false,
    secondPhoneNumber : false,
  };

  validate() {
    let valid = super.validate();

    if (this.dateOfBirth) {
      const date = new Date(this.dateOfBirth);
      const validDate = new Date();
      validDate.setFullYear(new Date().getFullYear() - 18);
      if (date.getTime() > validDate.getTime()) {
        valid = false;
        this.errors.dateOfBirth = true;
      }
    }

    if (this.secondPhoneNumber && this.secondPhoneNumber.length !== 8) {
      this.errors.secondPhoneNumber = true;
      valid = false;
    }

    return valid;
  }

  getModel() {
    return {
      physicalUser: {
        dateOfBirth       : new Date(this.dateOfBirth).getTime() || null,
        firstName         : this.firstName,
        lastName          : this.lastName,
        genderValue       : this.gender,
      },
      secondPhoneNumber : this.secondPhoneNumber ? (this.secondPhoneCode + this.secondPhoneNumber) : null,
    };
  }

}

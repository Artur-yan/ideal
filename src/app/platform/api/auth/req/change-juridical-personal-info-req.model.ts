import { Validation } from '@platform/validation';
import { CountryCodeEnum } from '@enums/country-code.enum';

export class ChangeJuridicalPersonalInfoRM extends Validation {

  companyName: string;
  addressName: string;
  taxNumber: string;
  bankName: string;
  accountNumber: string;
  secondPhoneNumber: string;
  latitude: number;
  longitude: number;
  secondPhoneCode = CountryCodeEnum.Arm;

  errors = {
    companyName       : false,
    taxNumber         : false,
    bankName          : false,
    accountNumber     : false,
    secondPhoneNumber : false,
  };

  validate() {
    let valid = super.validate();

    if (this.secondPhoneNumber && this.secondPhoneNumber.length !== 8) {
      this.errors.secondPhoneNumber = true;
      valid = false;
    }

    return valid;
  }

  getModel() {
    return {
      juridicalUser: {
        accountNumber           : this.accountNumber,
        addressName             : this.addressName,
        bankName                : this.bankName,
        companyName             : this.companyName,
        taxIdentificationNumber : this.taxNumber,
        latitude                : this.latitude,
        longitude               : this.longitude,
      },
      secondPhoneNumber : this.secondPhoneNumber ? (this.secondPhoneCode + this.secondPhoneNumber) : null,
    };
  }
}

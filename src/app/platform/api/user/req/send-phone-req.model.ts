import {Validation} from '@platform/validation';

export class SendPhoneVerifyReqModel extends Validation {

  phoneNumber: string = '';
  errors = {
  };

  getModel() {
    return {
      phoneNumber: this.phoneNumber,
    };
  }

}

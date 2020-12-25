import {Validation} from '@platform/validation';

export class SendEmailVerifyReqModel extends Validation {

  email: string = '';
  errors = {
  };

  getModel() {
    return {
      email: this.email,
    };
  }

}

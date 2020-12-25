import { Validation } from '@platform/validation';
import { IsDefined } from '@platform/validation/decorators';

export class PhotoReqModel extends Validation {

  @IsDefined()
  photo: Blob;

  errors = {
    photo: false,
  };

  getModel() {
    const form = new FormData();
    form.append('file', this.photo);
    return form;
  }

}

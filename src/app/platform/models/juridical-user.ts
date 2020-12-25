import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class JuridicalUser extends BaseModel {

  @Fillable()
  accountNumber: string;

  @Fillable()
  addressName: string;

  @Fillable()
  bankName: string;

  @Fillable()
  companyName: string;

  @Fillable()
  latitude: number;

  @Fillable()
  longitude: number;

  @Fillable()
  taxIdentificationNumber: string;
}

import { BaseModel } from '@platform/modules/http/classes/base.model';
import { Fillable } from '@decorators/fillable.decorator';

export class AddressModel extends BaseModel {

  @Fillable()
  id: string;

  @Fillable()
  addressName: string;

  @Fillable()
  additionalInformation: string;

  @Fillable()
  apartment: string;

  @Fillable()
  building: string;

  @Fillable()
  entrance: number;

  @Fillable()
  hasElevator: boolean;

  @Fillable()
  floor: number;

  @Fillable()
  isDefault: boolean;

  @Fillable()
  latitude: number;

  @Fillable()
  longitude: number;

  @Fillable()
  title: string;

}

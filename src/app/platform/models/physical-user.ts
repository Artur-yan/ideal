import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { GenderEnum } from '@enums/gender';

export class PhysicalUser extends BaseModel {

  @Fillable()
  firstName: string;

  @Fillable()
  genderValue: GenderEnum;

  @Fillable()
  lastName: string;

  @Fillable()
  dateOfBirth: string;
}

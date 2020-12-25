import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';
import { RoleEnum } from '@enums/role.enum';
import { UserTypeEnum } from '@enums/user-type.enum';
import { PhysicalUser } from './physical-user';
import { Model } from '@platform/decorators/model.decorator.ts';
import { JuridicalUser } from './juridical-user';
import { Default } from '@platform/decorators/default.decorator';

export class User extends BaseModel {

	@Fillable()
  userId: number;

  @Fillable()
  @Default('')
  phoneNumber: string;

  @Fillable()
  @Default('')
  secondPhoneNumber: string;

  @Fillable()
  userTypeValue: UserTypeEnum;

  @Fillable()
  imageUrl: string;

  @Fillable()
  email: string;

  @Fillable()
  type: RoleEnum;

  @Fillable()
  @Model(PhysicalUser)
  physicalUser: PhysicalUser;

  @Fillable()
  @Model(JuridicalUser)
  juridicalUser: JuridicalUser;
}

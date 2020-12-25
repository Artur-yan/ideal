import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class TokenModel extends BaseModel {
  
  @Fillable()
  token: string;

}

import { Fillable } from '@decorators/fillable.decorator';
import { BaseModel } from '@platform/modules/http/classes/base.model';

export class Notification extends BaseModel {

	@Fillable()
  id: number;

  @Fillable()
  title: string;

  @Fillable()
  message: string;

  @Fillable()
  sendDate: number;

  @Fillable()
  image: string;

  @Fillable()
  isSeen: boolean;
}

import { IToaster } from '../interfaces/toaster.interface';
import { ToasterEnum } from '../enums/toaster-type.enum';

export class Toaster implements IToaster {
  public text: string; 
  public status: ToasterEnum;
  public id: number = null;
  public isActive: boolean = true;
  public disableRemove: boolean = false;

  constructor(data: IToaster) {
    if (data) {
      this.text = data.text;
      this.status = data.status;
      this.id = data.id || null;
    }
  }
}

import { ToasterEnum } from '../enums/toaster-type.enum';

export interface IToaster {
  text: string;
  status: ToasterEnum;
  id?: number;
  isActive?: boolean;
  disableRemove?: boolean;
}

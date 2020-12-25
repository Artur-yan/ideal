import { BaseModel } from '../classes/base.model';

export interface IBaseModelOptions {
  transform?: 'model' | 'array';
  model?: typeof BaseModel;
  default?: any;
  key: string;
  propertyKey: string;
}

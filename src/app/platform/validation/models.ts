import { ValidationTypes } from './enums';

export interface IValidationArgsModel {
  type: ValidationTypes;
  target: object;
  propertyName: string;
  constraints?: any[];
}

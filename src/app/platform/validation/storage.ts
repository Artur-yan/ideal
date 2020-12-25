import { IValidationArgsModel } from './models';
import { Validations } from './validations';

class Storage {
  validateArr: IValidationArgsModel[] = [];

  public validate = (someClass: object) => {
    const filter = this.validateArr.filter(y => {
      return someClass.constructor === y.target;
    });

    return filter.filter(y => {
      const el = someClass[y.propertyName];
      return !Validations.validateValue(el, y);
    }).map(y => y.propertyName);
  }
}

export const storage = new Storage();

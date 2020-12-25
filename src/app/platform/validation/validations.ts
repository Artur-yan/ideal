import { IValidationArgsModel } from './models';
import { ValidationTypes } from './enums';

export class Validations {
  public static validateValue(value: any, metadata: IValidationArgsModel): boolean {
    switch (metadata.type) {
      /* common checkers */
      case ValidationTypes.IS_DEFINED:
        return this.isDefined(value);
      case ValidationTypes.EQUALS:
        return this.equals(value, metadata.constraints[0]);
      case ValidationTypes.NOT_EQUALS:
        return this.notEquals(value, metadata.constraints[0]);
      case ValidationTypes.IS_EMPTY:
        return this.isEmpty(value);
      case ValidationTypes.IS_NOT_EMPTY:
        return this.isNotEmpty(value);

      /* type checkers */
      case ValidationTypes.IS_BOOLEAN:
        return this.isBoolean(value);
      case ValidationTypes.IS_DATE:
        return this.isDate(value);
      case ValidationTypes.IS_STRING:
        return this.isString(value);
      case ValidationTypes.IS_DATE_STRING:
        return this.isDateString(value);
      case ValidationTypes.IS_ARRAY:
        return this.isArray(value);
      case ValidationTypes.IS_NUMBER:
        return this.isNumber(value);
      case ValidationTypes.IS_INT:
        return this.isInt(value);
      case ValidationTypes.IS_ENUM:
        return this.isEnum(value, metadata.constraints[0]);

      /* number checkers */
      case ValidationTypes.IS_POSITIVE:
        return this.isPositive(value);
      case ValidationTypes.IS_NEGATIVE:
        return this.isNegative(value);
      case ValidationTypes.MIN:
        return this.min(value, metadata.constraints[0]);
      case ValidationTypes.MAX:
        return this.max(value, metadata.constraints[0]);

      /* date checkers */
      case ValidationTypes.MIN_DATE:
        return this.minDate(value, metadata.constraints[0]);
      case ValidationTypes.MAX_DATE:
        return this.maxDate(value, metadata.constraints[0]);

      /* string checkers */
      case ValidationTypes.CONTAINS:
        return this.contains(value, metadata.constraints[0]);
      case ValidationTypes.NOT_CONTAINS:
        return this.notContains(value, metadata.constraints[0]);
      case ValidationTypes.IS_EMAIL:
        return this.isEmail(value);
      case ValidationTypes.IS_ISOFormat:
        return this.isISOFormat(value);
      case ValidationTypes.IS_JSON:
        return this.isJSON(value);
      case ValidationTypes.MIN_LENGTH:
        return this.minLength(value, metadata.constraints[0]);
      case ValidationTypes.MAX_LENGTH:
        return this.maxLength(value, metadata.constraints[0]);

      /* array checkers */
      case ValidationTypes.ARRAY_CONTAINS:
        return this.arrayContains(value, metadata.constraints[0]);
      case ValidationTypes.ARRAY_NOT_CONTAINS:
        return this.arrayNotContains(value, metadata.constraints[0]);
      case ValidationTypes.ARRAY_NOT_EMPTY:
        return this.arrayNotEmpty(value);
      case ValidationTypes.ARRAY_MIN_SIZE:
        return this.arrayMinSize(value, metadata.constraints[0]);
      case ValidationTypes.ARRAY_MAX_SIZE:
        return this.arrayMaxSize(value, metadata.constraints[0]);
      case ValidationTypes.ARRAY_UNIQUE:
        return this.arrayUnique(value);
    }
    return true;
  }

  public static isDefined(value: any): boolean {
    return value || value === 0;
  }

  public static equals(value: any, comparison: any): boolean {
    return value === comparison;
  }

  public static notEquals(value: any, comparison: any): boolean {
    return value !== comparison;
  }

  public static isEmpty(value: any): boolean {
    return typeof value === 'string' && value === '' || value === null || value === undefined;
  }

  public static isNotEmpty(value: any): boolean {
    return typeof value === 'string' && value !== '' && value !== null && value !== undefined;
  }

  public static isBoolean(value: any): boolean {
    return value instanceof Boolean || typeof value === 'boolean';
  }

  public static isDate(value: any): boolean {
    return value instanceof Date && !isNaN(value.getTime());
  }

  public static isString(value: any): boolean {
    return value instanceof String || typeof value === 'string';
  }

  public static isDateString(value: any): boolean {
    const regex = /^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|\+[0-2]\d(?:\:[0-5]\d)?)?$/g;
    return this.isString(value) && regex.test(value);
  }

  public static isArray(value: any): boolean {
    return value instanceof Array;
  }

  public static isEnum(value: any, entity: any): boolean {
    const enumValues = Object.keys(entity)
      .map(k => entity[k]);
    return enumValues.indexOf(value) >= 0;
  }

  public static isNumber(value: any): boolean {
    return Number.isFinite(value);
  }

  public static isInt(val: number): boolean {
    return Number.isInteger(val);
  }

  public static isPositive(value: number): boolean {
    return typeof value === 'number' && value > 0;
  }

  public static isNegative(value: number): boolean {
    return typeof value === 'number' && value < 0;
  }

  public static min(num: number, min: number): boolean {
    return typeof num === 'number' && typeof min === 'number' && num >= min;
  }

  public static max(num: number, max: number): boolean {
    return typeof num === 'number' && typeof max === 'number' && num <= max;
  }

  public static minDate(date: Date, minDate: Date): boolean {
    return date && date.getTime() >= minDate.getTime();
  }

  public static maxDate(date: Date, maxDate: Date): boolean {
    return date && date.getTime() <= maxDate.getTime();
  }

  public static contains(value: string, seed: string): boolean {
    return typeof value === 'string' && value.includes(seed);
  }

  public static notContains(value: string, seed: string): boolean {
    return typeof value === 'string' && !value.includes(seed);
  }

  public static isEmail(value: string): boolean {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return typeof value === 'string' &&  re.test(value);
  }

  public static isISOFormat(value: string): boolean {
    const re = /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g;
    return typeof value === 'string' && re.test(value);
  }

  public static isJSON(value: string): boolean {
    try {
      JSON.parse(value);
      return typeof value === 'string';
    } catch (error) {
      return false;
    }
  }

  public static minLength(value: string, min: number) {
    return typeof value === 'string' && value.length >= min;
  }

  public static maxLength(value: string, max: number) {
    return typeof value === 'string' && value.length <= max;
  }

  public static arrayContains(array: any[], values: any[]) {
    if (!(array instanceof Array))
      return false;

    return !array || values.every(value => array.indexOf(value) !== -1);
  }

  public static arrayNotContains(array: any[], values: any[]) {
    if (!(array instanceof Array))
      return false;

    return !array || values.every(value => array.indexOf(value) === -1);
  }

  public static arrayNotEmpty(array: any[]) {
    return array instanceof Array && array.length > 0;
  }

  public static arrayMinSize(array: any[], min: number) {
    return array instanceof Array && array.length >= min;
  }

  public static arrayMaxSize(array: any[], max: number) {
    return array instanceof Array && array.length <= max;
  }

  public static arrayUnique(array: any[]) {
    if (!(array instanceof Array))
      return false;

    const uniqueItems = array.filter((a, b, c) => c.indexOf(a) === b);
    return array.length === uniqueItems.length;
  }
}

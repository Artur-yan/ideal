import { storage } from './storage';
import { ValidationTypes } from './enums';
import { IValidationArgsModel } from './models';

export function IsDefined() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_DEFINED,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function Equals(comparison: any) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.EQUALS,
      target       : object.constructor,
      propertyName,
      constraints  : [comparison],
    };
    storage.validateArr.push(args);
  };
}

export function NotEquals(comparison: any) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.NOT_EQUALS,
      target       : object.constructor,
      propertyName,
      constraints  : [comparison],
    };
    storage.validateArr.push(args);
  };
}

export function IsEmpty() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_EMPTY,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsNotEmpty() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_NOT_EMPTY,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsOptional() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.CONDITIONAL_VALIDATION,
      target       : object.constructor,
      propertyName,
      constraints  : [(obj: any, value: any) => {
        return obj[propertyName] !== null && obj[propertyName] !== undefined;
      }],
    };
    storage.validateArr.push(args);
  };
}

export function IsBoolean() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_BOOLEAN,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsDate() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_DATE,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsNumber() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_NUMBER,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsInt() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_INT,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsString() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_STRING,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsDateString() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_DATE_STRING,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsValidArray() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_ARRAY,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsEnum(entity: object) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_ENUM,
      target       : object.constructor,
      propertyName,
      constraints  : [entity],
    };
    storage.validateArr.push(args);
  };
}

// -------------------------------------------------------------------------
// Number checkers
// -------------------------------------------------------------------------

export function IsPositive() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_POSITIVE,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsNegative() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_NEGATIVE,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function Min(min: number) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.MIN,
      target       : object.constructor,
      propertyName,
      constraints  : [min],
    };
    storage.validateArr.push(args);
  };
}

export function Max(max: number) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.MAX,
      target       : object.constructor,
      propertyName,
      constraints  : [max],
    };
    storage.validateArr.push(args);
  };
}

// -------------------------------------------------------------------------
// Date checkers
// -------------------------------------------------------------------------

export function MinDate(date: Date) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.MIN_DATE,
      target       : object.constructor,
      propertyName,
      constraints  : [date],
    };
    storage.validateArr.push(args);
  };
}

export function MaxDate(date: Date) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.MAX_DATE,
      target       : object.constructor,
      propertyName,
      constraints  : [date],
    };
    storage.validateArr.push(args);
  };
}

// -------------------------------------------------------------------------
// String checkers
// -------------------------------------------------------------------------

export function Contains(seed: string) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.CONTAINS,
      target       : object.constructor,
      propertyName,
      constraints  : [seed],
    };
    storage.validateArr.push(args);
  };
}

export function NotContains(seed: string) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.NOT_CONTAINS,
      target       : object.constructor,
      propertyName,
      constraints  : [seed],
    };
    storage.validateArr.push(args);
  };
}

export function IsEmail() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_EMAIL,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsISOFormat() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_ISOFormat,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function IsJSON() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.IS_JSON,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function MinLength(min: number) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.MIN_LENGTH,
      target       : object.constructor,
      propertyName,
      constraints  : [min],
    };
    storage.validateArr.push(args);
  };
}

export function MaxLength(max: number) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.MAX_LENGTH,
      target       : object.constructor,
      propertyName,
      constraints  : [max],
    };
    storage.validateArr.push(args);
  };
}

// -------------------------------------------------------------------------
// Array checkers
// -------------------------------------------------------------------------

export function ArrayContains(values: any[]) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.ARRAY_CONTAINS,
      target       : object.constructor,
      propertyName,
      constraints  : [values],
    };
    storage.validateArr.push(args);
  };
}

export function ArrayNotContains(values: any[]) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.ARRAY_NOT_CONTAINS,
      target       : object.constructor,
      propertyName,
      constraints  : [values],
    };
    storage.validateArr.push(args);
  };
}

export function ArrayNotEmpty() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.ARRAY_NOT_EMPTY,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

export function ArrayMinSize(min: number) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.ARRAY_MIN_SIZE,
      target       : object.constructor,
      propertyName,
      constraints  : [min],
    };
    storage.validateArr.push(args);
  };
}

export function ArrayMaxSize(max: number) {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.ARRAY_MAX_SIZE,
      target       : object.constructor,
      propertyName,
      constraints  : [max],
    };
    storage.validateArr.push(args);
  };
}

/**
 * Checks if all array's values are unique. Comparison for objects is reference-based.
 */
export function ArrayUnique() {
  return function(object: object, propertyName: string) {
    const args: IValidationArgsModel = {
      type         : ValidationTypes.ARRAY_UNIQUE,
      target       : object.constructor,
      propertyName,
    };
    storage.validateArr.push(args);
  };
}

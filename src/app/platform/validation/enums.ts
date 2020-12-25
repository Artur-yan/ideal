
export enum ValidationTypes {
/* system */
  CUSTOM_VALIDATION = 'customValidation',
  NESTED_VALIDATION = 'nestedValidation',
  CONDITIONAL_VALIDATION = 'conditionalValidation',
  WHITELIST = 'whitelistValidation',

/* common checkers */
  IS_DEFINED = 'isDefined',
  EQUALS = 'equals',
  NOT_EQUALS = 'notEquals',
  IS_EMPTY = 'isEmpty',
  IS_NOT_EMPTY = 'isNotEmpty',

/* type checkers */
  IS_BOOLEAN = 'isBoolean',
  IS_DATE = 'isDate',
  IS_NUMBER = 'isNumber',
  IS_STRING = 'isString',
  IS_DATE_STRING = 'isDateString',
  IS_ARRAY = 'isArray',
  IS_INT = 'isInt',
  IS_ENUM = 'isEnum',

/* number checkers */
  IS_POSITIVE = 'isPositive',
  IS_NEGATIVE = 'isNegative',
  MIN = 'min',
  MAX = 'max',

/* date checkers */
  MIN_DATE = 'minDate',
  MAX_DATE = 'maxDate',

/* string checkers */
  CONTAINS = 'contains',
  NOT_CONTAINS = 'notContains',
  IS_EMAIL = 'isEmail',
  IS_ISOFormat = 'isIsoFormat',
  IS_JSON = 'isJson',
  MIN_LENGTH = 'minLength',
  MAX_LENGTH = 'maxLength',

/* array checkers */
  ARRAY_CONTAINS = 'arrayContains',
  ARRAY_NOT_CONTAINS = 'arrayNotContains',
  ARRAY_NOT_EMPTY = 'arrayNotEmpty',
  ARRAY_MIN_SIZE = 'arrayMinSize',
  ARRAY_MAX_SIZE = 'arrayMaxSize',
  ARRAY_UNIQUE = 'arrayUnique',
}

import { AssertResult, CustomFunction } from 'core/src/config/types';
import { Location } from '../../../ref-utils';
import { isString as runOnValue, isTruthy } from '../../../utils';
import {
  OrderOptions,
  OrderDirection,
  isOrdered,
  getIntersectionLength,
  regexFromString,
} from './utils';

export type AssertionFn = (
  value: any,
  condition: any,
  baseLocation: Location,
  rawValue?: any
) => AssertResult[];

export type Asserts = {
  pattern: AssertionFn;
  enum: AssertionFn;
  defined: AssertionFn;
  required: AssertionFn;
  disallowed: AssertionFn;
  undefined: AssertionFn;
  nonEmpty: AssertionFn;
  minLength: AssertionFn;
  maxLength: AssertionFn;
  casing: AssertionFn;
  sortOrder: AssertionFn;
  mutuallyExclusive: AssertionFn;
  mutuallyRequired: AssertionFn;
  requireAny: AssertionFn;
  ref: AssertionFn;
}

export const runOnKeysSet = new Set<keyof Asserts>([
  'mutuallyExclusive',
  'mutuallyRequired',
  'enum',
  'pattern',
  'minLength',
  'maxLength',
  'casing',
  'sortOrder',
  'disallowed',
  'required',
  'requireAny',
  'ref',
]);
export const runOnValuesSet = new Set<keyof Asserts>([
  'pattern',
  'enum',
  'defined',
  'undefined',
  'nonEmpty',
  'minLength',
  'maxLength',
  'casing',
  'sortOrder',
  'ref',
]);

export const asserts: Asserts = {
  pattern: (value: string | string[], condition: string, baseLocation: Location) => {
    if (typeof value === 'undefined') return []; // property doesn't exist, no need to lint it with this assert
    const values = runOnValue(value) ? [value] : value;
    const regx = regexFromString(condition);

    return values
      .map(
        (_val) =>
          !regx?.test(_val) && {
            message: `"${_val}" should match a regex ${condition}`,
            location: runOnValue(value) ? baseLocation : baseLocation.key(),
          }
      )
      .filter(isTruthy);
  },
  enum: (value: string | string[], condition: string[], baseLocation: Location) => {
    if (typeof value === 'undefined') return []; // property doesn't exist, no need to lint it with this assert
    const values = runOnValue(value) ? [value] : value;
    return values
      .map(
        (_val) =>
          !condition.includes(_val) && {
            message: `"${_val}" should be one of the predefined values`,
            location: runOnValue(value) ? baseLocation : baseLocation.child(_val).key(),
          }
      )
      .filter(isTruthy);
  },
  defined: (value: string | undefined, condition: boolean = true, baseLocation: Location) => {
    const isDefined = typeof value !== 'undefined';
    const isValid = condition ? isDefined : !isDefined;
    return isValid
      ? []
      : [
          {
            message: condition ? `Should be defined` : 'Should be not defined',
            location: baseLocation,
          },
        ];
  },
  required: (value: string[], keys: string[], baseLocation: Location) => {
    return keys
      .map(
        (requiredKey) =>
          !value.includes(requiredKey) && {
            message: `${requiredKey} is required`,
            location: baseLocation.key(),
          }
      )
      .filter(isTruthy);
  },
  disallowed: (value: string | string[], condition: string[], baseLocation: Location) => {
    if (typeof value === 'undefined') return []; // property doesn't exist, no need to lint it with this assert
    const values = runOnValue(value) ? [value] : value;
    return values
      .map(
        (_val) =>
          condition.includes(_val) && {
            message: `"${_val}" is disallowed`,
            location: runOnValue(value) ? baseLocation : baseLocation.child(_val).key(),
          }
      )
      .filter(isTruthy);
  },
  undefined: (value: any, condition: boolean = true, baseLocation: Location) => {
    const isUndefined = typeof value === 'undefined';
    const isValid = condition ? isUndefined : !isUndefined;
    return isValid
      ? []
      : [
          {
            message: condition ? `Should not be defined` : 'Should be defined',
            location: baseLocation,
          },
        ];
  },
  nonEmpty: (
    value: string | undefined | null,
    condition: boolean = true,
    baseLocation: Location
  ) => {
    const isEmpty = typeof value === 'undefined' || value === null || value === '';
    const isValid = condition ? !isEmpty : isEmpty;
    return isValid
      ? []
      : [
          {
            message: condition ? `Should not be empty` : 'Should be empty',
            location: baseLocation,
          },
        ];
  },
  minLength: (value: string | any[], condition: number, baseLocation: Location) => {
    if (typeof value === 'undefined' || value.length >= condition) return []; // property doesn't exist, no need to lint it with this assert
    return [{ message: `Should have at least ${condition} characters`, location: baseLocation }];
  },
  maxLength: (value: string | any[], condition: number, baseLocation: Location) => {
    if (typeof value === 'undefined' || value.length <= condition) return []; // property doesn't exist, no need to lint it with this assert
    return [{ message: `Should have at most ${condition} characters`, location: baseLocation }];
  },
  casing: (value: string | string[], condition: string, baseLocation: Location) => {
    if (typeof value === 'undefined') return []; // property doesn't exist, no need to lint it with this assert
    const values: string[] = runOnValue(value) ? [value] : value;
    const casingRegexes: Record<string, RegExp> = {
      camelCase: /^[a-z][a-zA-Z0-9]+$/g,
      'kebab-case': /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/g,
      snake_case: /^([a-z][a-z0-9]*)(_[a-z0-9]+)*$/g,
      PascalCase: /^[A-Z][a-zA-Z0-9]+$/g,
      MACRO_CASE: /^([A-Z][A-Z0-9]*)(_[A-Z0-9]+)*$/g,
      'COBOL-CASE': /^([A-Z][A-Z0-9]*)(-[A-Z0-9]+)*$/g,
      flatcase: /^[a-z][a-z0-9]+$/g,
    };
    return values
      .map(
        (_val) =>
          !_val.match(casingRegexes[condition]) && {
            message: `"${_val}" should use ${condition}`,
            location: runOnValue(value) ? baseLocation : baseLocation.child(_val).key(),
          }
      )
      .filter(isTruthy);
  },
  sortOrder: (value: any[], condition: OrderOptions | OrderDirection, baseLocation: Location) => {
    if (typeof value === 'undefined' || isOrdered(value, condition)) return [];
    const direction = (condition as OrderOptions).direction || (condition as OrderDirection);
    const property = (condition as OrderOptions).property;
    return [
      {
        message: `Should be sorted in ${
          direction === 'asc' ? 'an ascending' : 'a descending'
        } order${property ? ` by property ${property}` : ''}`,
        location: baseLocation,
      },
    ];
  },
  mutuallyExclusive: (value: string[], condition: string[], baseLocation: Location) => {
    if (getIntersectionLength(value, condition) < 2) return [];
    return [
      {
        message: `${condition.join(', ')} keys should be mutually exclusive`,
        location: baseLocation.key(),
      },
    ];
  },
  mutuallyRequired: (value: string[], condition: string[], baseLocation: Location) => {
    const isValid =
      getIntersectionLength(value, condition) > 0
        ? getIntersectionLength(value, condition) === condition.length
        : true;
    return isValid
      ? []
      : [
          {
            message: `Properties ${condition.join(', ')} are mutually required`,
            location: baseLocation.key(),
          },
        ];
  },
  requireAny: (value: string[], condition: string[], baseLocation: Location) => {
    return getIntersectionLength(value, condition) >= 1
      ? []
      : [
          {
            message: `Should have any of ${condition.join(', ')}`,
            location: baseLocation.key(),
          },
        ];
  },
  ref: (_value: any, condition: string | boolean, baseLocation: Location, rawValue: any) => {
    if (typeof rawValue === 'undefined') return []; // property doesn't exist, no need to lint it with this assert
    const hasRef = rawValue.hasOwnProperty('$ref');
    if (typeof condition === 'boolean') {
      const isValid = condition ? hasRef : !hasRef;
      return isValid
        ? []
        : [
            {
              message: condition ? `should use $ref` : 'should not use $ref',
              location: hasRef ? baseLocation : baseLocation.key(),
            },
          ];
    }
    const regex = regexFromString(condition);
    const isValid = hasRef && regex?.test(rawValue['$ref']);
    return isValid
      ? []
      : [
          {
            message: `$ref value should match ${condition}`,
            location: hasRef ? baseLocation : baseLocation.key(),
          },
        ];
  },
};

export function buildAssertCustomFunction(fn: CustomFunction): AssertionFn {
  return (value: string[], options: any, baseLocation: Location) =>
    fn.call(null, value, options, baseLocation);
}

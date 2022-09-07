import type { AssertResult, RuleSeverity } from '../../../config';
import { colorize } from '../../../logger';
import { isRef, Location } from '../../../ref-utils';
import { Problem, ProblemSeverity, UserContext } from '../../../walk';
import { asserts } from './asserts';

export type OrderDirection = 'asc' | 'desc';

export type OrderOptions = {
  direction: OrderDirection;
  property: string;
};

export type AssertToApply = {
  name: string;
  assertId?: string;
  conditions: any;
  message?: string;
  severity?: ProblemSeverity;
  suggest?: string[];
  runsOnKeys: boolean;
  runsOnValues: boolean;
};

export function buildVisitorObject(
  subject: string,
  context: Record<string, any>[],
  subjectVisitor: any
) {
  if (!context) {
    return { [subject]: subjectVisitor };
  }

  let currentVisitorLevel: Record<string, any> = {};
  const visitor: Record<string, any> = currentVisitorLevel;

  for (let index = 0; index < context.length; index++) {
    const node = context[index];
    if (context.length === index + 1 && node.type === subject) {
      // Visitors don't work properly for the same type nested nodes, so
      // as a workaround for that we don't create separate visitor for the last element
      // which is the same as subject;
      // we will check includes/excludes it in the last visitor.
      continue;
    }
    const matchParentKeys = node.matchParentKeys;
    const excludeParentKeys = node.excludeParentKeys;

    if (matchParentKeys && excludeParentKeys) {
      throw new Error(
        `Both 'matchParentKeys' and 'excludeParentKeys' can't be under one context item`
      );
    }

    if (matchParentKeys || excludeParentKeys) {
      currentVisitorLevel[node.type] = {
        skip: (_value: any, key: string) => {
          if (matchParentKeys) {
            return !matchParentKeys.includes(key);
          }
          if (excludeParentKeys) {
            return excludeParentKeys.includes(key);
          }
        },
      };
    } else {
      currentVisitorLevel[node.type] = {};
    }
    currentVisitorLevel = currentVisitorLevel[node.type];
  }

  currentVisitorLevel[subject] = subjectVisitor;

  return visitor;
}

type Assertion = {
  assertId: string;
  property: string | string[];
  context?: Record<string, any>[];
  severity?: RuleSeverity;
  suggest?: any[];
  message?: string;
  subject: string;
};

export function buildSubjectVisitor(assertion: Assertion, asserts: AssertToApply[]) {
  return (
    node: any,
    { report, location, rawLocation, key, type, resolve, rawNode }: UserContext
  ) => {
    let properties = assertion.property;
    // We need to check context's last node if it has the same type as subject node;
    // if yes - that means we didn't create context's last node visitor,
    // so we need to handle 'matchParentKeys' and 'excludeParentKeys' conditions here;
    if (assertion.context) {
      const lastContextNode = assertion.context[assertion.context.length - 1];
      if (lastContextNode.type === type.name) {
        const matchParentKeys = lastContextNode.matchParentKeys;
        const excludeParentKeys = lastContextNode.excludeParentKeys;

        if (matchParentKeys && !matchParentKeys.includes(key)) {
          return;
        }
        if (excludeParentKeys && excludeParentKeys.includes(key)) {
          return;
        }
      }
    }

    if (properties) {
      properties = Array.isArray(properties) ? properties : [properties];
    }

    const results = [];
    let currentLocation;
    for (const assert of asserts) {
      currentLocation = assert.name === 'ref' ? rawLocation : location;
      if (properties) {
        for (const property of properties) {
          // we can have resolvable scalar so need to resolve value here.
          const value = isRef(node[property]) ? resolve(node[property])?.node : node[property];
          results.push(
            runAssertion({
              values: value,
              rawValues: rawNode[property],
              assert,
              location: currentLocation.child(property),
            })
          );
        }
      } else {
        const value = assert.name === 'ref' ? rawNode : Object.keys(node);
        results.push(
          runAssertion({
            values: Object.keys(node),
            rawValues: value,
            assert,
            location: currentLocation,
          })
        );
      }
    }

    const problems = getAllProblems(results);
    if (problems.length) {
      const message =
        assertion.message ||
        `${colorize.blue(assertion.assertId)} failed because the ${colorize.blue(
          assertion.subject
        )} ${colorize.blue(
          (properties as string[]).join(', ')
        )} didn't meet the assertions: {{problems}}`;

      report({
        message: message.replace('{{problems}}', convertProblemsToString(problems)),
        location: currentLocation,
        forceSeverity: assertion.severity || 'error',
        suggest: assertion.suggest || [],
        ruleId: assertion.assertId,
      });
    }
  };
}

function getAllProblems(results: AssertResult[]) {
  const problems: string[] = [];

  for (const result of results) {
    if (result.length === 0) continue;

    for (const r of result) {
      if (r.isValid) continue;
      problems.push(r.message ?? '');
    }
  }
  return problems;
}

function convertProblemsToString(problems: string[]) {
  if (problems.length === 1) return problems[0];
  return problems.map((problem) => `\n- ${problem}`).join('');
}

export function getIntersectionLength(keys: string[], properties: string[]): number {
  const props = new Set(properties);
  let count = 0;
  for (const key of keys) {
    if (props.has(key)) {
      count++;
    }
  }
  return count;
}

export function isOrdered(value: any[], options: OrderOptions | OrderDirection): boolean {
  const direction = (options as OrderOptions).direction || (options as OrderDirection);
  const property = (options as OrderOptions).property;
  for (let i = 1; i < value.length; i++) {
    let currValue = value[i];
    let prevVal = value[i - 1];

    if (property) {
      if (!value[i][property] || !value[i - 1][property]) {
        return false; // property doesn't exist, so collection is not ordered
      }
      currValue = value[i][property];
      prevVal = value[i - 1][property];
    }

    const result = direction === 'asc' ? currValue >= prevVal : currValue <= prevVal;
    if (!result) {
      return false;
    }
  }
  return true;
}

type RunAssertionParams = {
  values: string | string[];
  rawValues: any;
  assert: AssertToApply;
  location: Location;
};

function runAssertion({ values, rawValues, assert, location }: RunAssertionParams) {
  return asserts[assert.name](values, assert.conditions, location, rawValues);
}

export function regexFromString(input: string): RegExp | null {
  const matches = input.match(/^\/(.*)\/(.*)|(.*)/);
  return matches && new RegExp(matches[1] || matches[3], matches[2]);
}

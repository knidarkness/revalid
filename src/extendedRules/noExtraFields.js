import AbstractRule from './utils/AbstractRule';

import { createErrorFieldNotAllowed } from '../error';
import { getClosestString } from '../utils';

class NoExtraFields extends AbstractRule {
  static get ruleName() {
    return 'no-extra-fields';
  }

  get rule() {
    return 'no-extra-fields';
  }

  any() {
    return {
      onEnter: (node, definition, ctx) => {
        const errors = [];
        const allowedChildren = [];

        if (definition.properties) {
          switch (typeof definition.properties) {
            case 'object':
              allowedChildren.push(...Object.keys(definition.properties));
              break;
            case 'function':
              allowedChildren.push(...Object.keys(definition.properties(node)));
              break;
            default:
                // do-nothing
          }
        }

        Object.keys(node).forEach((field) => {
          ctx.path.push(field);

          if (!allowedChildren.includes(field) && field.indexOf('x-') !== 0 && field !== '$ref') {
            const possibleAlternate = getClosestString(field, allowedChildren);
            errors.push(createErrorFieldNotAllowed(field, node, ctx, { fromRule: this.rule, severity: this.config.level, possibleAlternate }));
          }

          ctx.path.pop();
        });
        return errors;
      },
    };
  }
}

module.exports = NoExtraFields;

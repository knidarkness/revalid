import { getAdditionalPropertiesOption, validateExample } from '../utils.js';

import type { UserContext } from '../../walk.js';
import type { Oas3_1Schema } from '../../typings/openapi.js';

export const NoInvalidSchemaExamples: any = (opts: any) => {
  const allowAdditionalProperties = getAdditionalPropertiesOption(opts) ?? false;
  return {
    Schema: {
      leave(schema: Oas3_1Schema, ctx: UserContext) {
        if (schema.examples) {
          for (const example of schema.examples) {
            validateExample(
              example,
              schema,
              ctx.location.child(['examples', schema.examples.indexOf(example)]),
              ctx,
              allowAdditionalProperties
            );
          }
        }
        if (schema.example !== undefined) {
          validateExample(schema.example, schema, ctx.location.child('example'), ctx, true);
        }
      },
    },
  };
};

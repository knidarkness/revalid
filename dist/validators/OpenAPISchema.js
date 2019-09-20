"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _error = _interopRequireDefault(require("../error"));

var _OpenAPIExternalDocumentation = _interopRequireDefault(require("./OpenAPIExternalDocumentation"));

var _OpenAPISchemaMap = _interopRequireDefault(require("./OpenAPISchemaMap"));

var _OpenAPIDiscriminator = _interopRequireDefault(require("./OpenAPIDiscriminator"));

var _OpenAPIXML = _interopRequireDefault(require("./OpenAPIXML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-cycle */
const OpenAPISchemaObject = {
  validators: {
    title() {
      return (node, ctx) => {
        if (node && node.title) {
          if (!(typeof node.title === 'string')) return (0, _error.default)('Title of the schema must be a string', node, ctx);
        }

        return null;
      };
    },

    multipleOf() {
      return (node, ctx) => {
        if (node && node.multipleOf) {
          if (typeof node.multipleOf !== 'number') return (0, _error.default)('Value of multipleOf must be a number', node, ctx);
          if (node.multipleOf < 0) return (0, _error.default)('Value of multipleOf must be greater or equal to zero', node, ctx);
        }

        return null;
      };
    },

    maximum() {
      return (node, ctx) => {
        if (node && node.maximum && typeof node.maximum !== 'number') return (0, _error.default)('Value of maximum must be a number', node, ctx);
        return null;
      };
    },

    exclusiveMaximum() {
      return (node, ctx) => {
        if (node && node.exclusiveMaximum && typeof node.exclusiveMaximum !== 'boolean') return (0, _error.default)('Value of exclusiveMaximum must be a boolean', node, ctx);
        return null;
      };
    },

    minimum() {
      return (node, ctx) => {
        if (node && node.minimum && typeof node.minimum !== 'number') return (0, _error.default)('Value of minimum must be a number', node, ctx);
        return null;
      };
    },

    exclusiveMinimum() {
      return (node, ctx) => {
        if (node && node.exclusiveMinimum && typeof node.exclusiveMinimum !== 'boolean') return (0, _error.default)('Value of exclusiveMinimum must be a boolean', node, ctx);
        return null;
      };
    },

    maxLength() {
      return (node, ctx) => {
        if (node && node.maxLength) {
          if (typeof node.maxLength !== 'number') return (0, _error.default)('Value of maxLength must be a number', node, ctx);
          if (node.maxLength < 0) return (0, _error.default)('Value of maxLength must be greater or equal to zero', node, ctx);
        }

        return null;
      };
    },

    minLength() {
      return (node, ctx) => {
        if (node && node.minLength) {
          if (typeof node.minLength !== 'number') return (0, _error.default)('Value of minLength must be a number', node, ctx);
          if (node.minLength < 0) return (0, _error.default)('Value of minLength must be greater or equal to zero', node, ctx);
        }

        return null;
      };
    },

    pattern() {
      return (node, ctx) => {
        if (node && node.pattern) {
          // TODO: add regexp validation.
          if (typeof node.pattern !== 'string') return (0, _error.default)('Value of pattern must be a string', node, ctx);
        }

        return null;
      };
    },

    maxItems() {
      return (node, ctx) => {
        if (node && node.maxItems) {
          if (typeof node.maxItems !== 'number') return (0, _error.default)('Value of maxItems must be a number', node, ctx);
          if (node.maxItems < 0) return (0, _error.default)('Value of maxItems must be greater or equal to zero. You can`t have negative amount of something.', node, ctx);
        }

        return null;
      };
    },

    minItems() {
      return (node, ctx) => {
        if (node && node.minItems) {
          if (typeof node.minItems !== 'number') return (0, _error.default)('Value of minItems must be a number', node, ctx);
          if (node.minItems < 0) return (0, _error.default)('Value of minItems must be greater or equal to zero. You can`t have negative amount of something.', node, ctx);
        }

        return null;
      };
    },

    uniqueItems() {
      return (node, ctx) => {
        if (node && node.uniqueItems) {
          if (typeof node.uniqueItems !== 'boolean') return (0, _error.default)('Value of uniqueItems must be a boolean', node, ctx);
        }

        return null;
      };
    },

    maxProperties() {
      return (node, ctx) => {
        if (node && node.maxProperties) {
          if (typeof node.maxProperties !== 'number') return (0, _error.default)('Value of maxProperties must be a number', node, ctx);
          if (node.maxProperties < 0) return (0, _error.default)('Value of maxProperties must be greater or equal to zero. You can`t have negative amount of something.', node, ctx);
        }

        return null;
      };
    },

    minProperties() {
      return (node, ctx) => {
        if (node && node.minProperties) {
          if (typeof node.minProperties !== 'number') return (0, _error.default)('Value of minProperties must be a number', node, ctx);
          if (node.minProperties < 0) return (0, _error.default)('Value of minProperties must be greater or equal to zero. You can`t have negative amount of something.', node, ctx);
        }

        return null;
      };
    },

    required() {
      return (node, ctx) => {
        if (node && node.required) {
          if (!Array.isArray(node.required)) return (0, _error.default)('Value of required must be an array', node, ctx);
          if (node.required.filter(item => typeof item !== 'string').length !== 0) return (0, _error.default)('All values of "required" field must be strings', node, ctx);
        }

        return null;
      };
    },

    enum() {
      return (node, ctx) => {
        if (node && node.enum) {
          if (!Array.isArray(node.enum)) return (0, _error.default)('Value of enum must be an array', node, ctx);

          if (node.type && typeof node.type === 'string' // eslint-disable-next-line valid-typeof
          && node.enum.filter(item => typeof item !== node.type).length !== 0) {
            return (0, _error.default)('All values of "enum" field must be of the same type as the "type" field', node, ctx);
          }
        }

        return null;
      };
    },

    type() {
      return (node, ctx) => {
        if (node.type && !['string', 'object', 'array', 'integer', 'number', 'boolean'].includes(node.type)) {
          return (0, _error.default)('Object type can be one of following only: "string", "object", "array", "integer", "number", "boolean"', node, ctx);
        }

        return null;
      };
    },

    items() {
      return (node, ctx) => {
        if (node && node.items && Array.isArray(node.items)) return (0, _error.default)('Value of items must not be an array. It must be a Schema object', node, ctx);
        return null;
      };
    },

    additionalProperties() {
      return () => null;
    },

    description() {
      return (node, ctx) => {
        if (node && node.description && typeof node.description !== 'string') return (0, _error.default)('Value of description must be a string', node, ctx);
        return null;
      };
    },

    format() {
      return (node, ctx) => {
        if (node && node.format && typeof node.format !== 'string') return (0, _error.default)('Value of format must be a string', node, ctx);
        return null;
      };
    },

    nullable() {
      return (node, ctx) => {
        if (node && node.nullable && typeof node.nullable !== 'boolean') return (0, _error.default)('Value of nullable must be a boolean', node, ctx);
        return null;
      };
    },

    readOnly() {
      return (node, ctx) => {
        if (node && node.readOnly && typeof node.readOnly !== 'boolean') return (0, _error.default)('Value of readOnly must be a boolean', node, ctx);
        return null;
      };
    },

    writeOnly() {
      return (node, ctx) => {
        if (node && node.writeOnly && typeof node.writeOnly !== 'boolean') return (0, _error.default)('Value of writeOnly must be a boolean', node, ctx);
        return null;
      };
    },

    deprecated() {
      return (node, ctx) => {
        if (node && node.deprecated && typeof node.deprecated !== 'boolean') return (0, _error.default)('Value of deprecated must be a boolean', node, ctx);
        return null;
      };
    },

    example() {
      return () => null;
    },

    default() {
      return () => null;
    },

    allOf() {
      return () => null;
    }

  },
  properties: {
    allOf() {
      return OpenAPISchemaObject;
    },

    anyOf() {
      return OpenAPISchemaObject;
    },

    oneOf() {
      return OpenAPISchemaObject;
    },

    not() {
      return OpenAPISchemaObject;
    },

    items() {
      return OpenAPISchemaObject;
    },

    properties: _OpenAPISchemaMap.default,
    discriminator: _OpenAPIDiscriminator.default,
    externalDocs: _OpenAPIExternalDocumentation.default,
    xml: _OpenAPIXML.default
  }
};
var _default = OpenAPISchemaObject;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0b3JzL09wZW5BUElTY2hlbWEuanMiXSwibmFtZXMiOlsiT3BlbkFQSVNjaGVtYU9iamVjdCIsInZhbGlkYXRvcnMiLCJ0aXRsZSIsIm5vZGUiLCJjdHgiLCJtdWx0aXBsZU9mIiwibWF4aW11bSIsImV4Y2x1c2l2ZU1heGltdW0iLCJtaW5pbXVtIiwiZXhjbHVzaXZlTWluaW11bSIsIm1heExlbmd0aCIsIm1pbkxlbmd0aCIsInBhdHRlcm4iLCJtYXhJdGVtcyIsIm1pbkl0ZW1zIiwidW5pcXVlSXRlbXMiLCJtYXhQcm9wZXJ0aWVzIiwibWluUHJvcGVydGllcyIsInJlcXVpcmVkIiwiQXJyYXkiLCJpc0FycmF5IiwiZmlsdGVyIiwiaXRlbSIsImxlbmd0aCIsImVudW0iLCJ0eXBlIiwiaW5jbHVkZXMiLCJpdGVtcyIsImFkZGl0aW9uYWxQcm9wZXJ0aWVzIiwiZGVzY3JpcHRpb24iLCJmb3JtYXQiLCJudWxsYWJsZSIsInJlYWRPbmx5Iiwid3JpdGVPbmx5IiwiZGVwcmVjYXRlZCIsImV4YW1wbGUiLCJkZWZhdWx0IiwiYWxsT2YiLCJwcm9wZXJ0aWVzIiwiYW55T2YiLCJvbmVPZiIsIm5vdCIsIk9wZW5BUElTY2hlbWFNYXAiLCJkaXNjcmltaW5hdG9yIiwiT3BlbkFQSURpc2NyaW1pbmF0b3IiLCJleHRlcm5hbERvY3MiLCJPcGVuQVBJRXh0ZXJuYWxEb2N1bWVudGF0aW9uIiwieG1sIiwiT3BlbkFQSVhNTCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUVBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBTkE7QUFRQSxNQUFNQSxtQkFBbUIsR0FBRztBQUMxQkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLEtBQUssR0FBRztBQUNOLGFBQU8sQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEtBQWU7QUFDcEIsWUFBSUQsSUFBSSxJQUFJQSxJQUFJLENBQUNELEtBQWpCLEVBQXdCO0FBQ3RCLGNBQUksRUFBRSxPQUFPQyxJ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bUJBQVA7QUFDRCxLQUhTOztBQUlWdUMsSUFBQUEsS0FBSyxHQUFHO0FBQ04sYUFBT3ZDLG1CQUFQO0FBQ0QsS0FOUzs7QUFPVndDLElBQUFBLEtBQUssR0FBRztBQUNOLGFBQU94QyxtQkFBUDtBQUNELEtBVFM7O0FBVVZ5QyxJQUFBQSxHQUFHLEdBQUc7QUFDSixhQUFPekMsbUJBQVA7QUFDRCxLQVpTOztBQWFWMkIsSUFBQUEsS0FBSyxHQUFHO0FBQ04sYUFBTzNCLG1CQUFQO0FBQ0QsS0FmUzs7QUFnQlZzQyxJQUFBQSxVQUFVLEVBQUVJLHlCQWhCRjtBQWlCVkMsSUFBQUEsYUFBYSxFQUFFQyw2QkFqQkw7QUFrQlZDLElBQUFBLFlBQVksRUFBRUMscUNBbEJKO0FBbUJWQyxJQUFBQSxHQUFHLEVBQUVDO0FBbkJLO0FBeE1jLENBQTVCO2VBK05laEQsbUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBpbXBvcnQvbm8tY3ljbGUgKi9cbmltcG9ydCBjcmVhdGVFcnJvciBmcm9tICcuLi9lcnJvcic7XG5cbmltcG9ydCBPcGVuQVBJRXh0ZXJuYWxEb2N1bWVudGF0aW9uIGZyb20gJy4vT3BlbkFQSUV4dGVybmFsRG9jdW1lbnRhdGlvbic7XG5pbXBvcnQgT3BlbkFQSVNjaGVtYU1hcCBmcm9tICcuL09wZW5BUElTY2hlbWFNYXAnO1xuaW1wb3J0IE9wZW5BUElEaXNjcmltaW5hdG9yIGZyb20gJy4vT3BlbkFQSURpc2NyaW1pbmF0b3InO1xuaW1wb3J0IE9wZW5BUElYTUwgZnJvbSAnLi9PcGVuQVBJWE1MJztcblxuY29uc3QgT3BlbkFQSVNjaGVtYU9iamVjdCA9IHtcbiAgdmFsaWRhdG9yczoge1xuICAgIHRpdGxlKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS50aXRsZSkge1xuICAgICAgICAgIGlmICghKHR5cGVvZiBub2RlLnRpdGxlID09PSAnc3RyaW5nJykpIHJldHVybiBjcmVhdGVFcnJvcignVGl0bGUgb2YgdGhlIHNjaGVtYSBtdXN0IGJlIGEgc3RyaW5nJywgbm9kZSwgY3R4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBtdWx0aXBsZU9mKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5tdWx0aXBsZU9mKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLm11bHRpcGxlT2YgIT09ICdudW1iZXInKSByZXR1cm4gY3JlYXRlRXJyb3IoJ1ZhbHVlIG9mIG11bHRpcGxlT2YgbXVzdCBiZSBhIG51bWJlcicsIG5vZGUsIGN0eCk7XG4gICAgICAgICAgaWYgKG5vZGUubXVsdGlwbGVPZiA8IDApIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgbXVsdGlwbGVPZiBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gemVybycsIG5vZGUsIGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbWF4aW11bSgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubWF4aW11bSAmJiB0eXBlb2Ygbm9kZS5tYXhpbXVtICE9PSAnbnVtYmVyJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBtYXhpbXVtIG11c3QgYmUgYSBudW1iZXInLCBub2RlLCBjdHgpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBleGNsdXNpdmVNYXhpbXVtKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5leGNsdXNpdmVNYXhpbXVtICYmIHR5cGVvZiBub2RlLmV4Y2x1c2l2ZU1heGltdW0gIT09ICdib29sZWFuJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBleGNsdXNpdmVNYXhpbXVtIG11c3QgYmUgYSBib29sZWFuJywgbm9kZSwgY3R4KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbWluaW11bSgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubWluaW11bSAmJiB0eXBlb2Ygbm9kZS5taW5pbXVtICE9PSAnbnVtYmVyJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBtaW5pbXVtIG11c3QgYmUgYSBudW1iZXInLCBub2RlLCBjdHgpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBleGNsdXNpdmVNaW5pbXVtKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5leGNsdXNpdmVNaW5pbXVtICYmIHR5cGVvZiBub2RlLmV4Y2x1c2l2ZU1pbmltdW0gIT09ICdib29sZWFuJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBleGNsdXNpdmVNaW5pbXVtIG11c3QgYmUgYSBib29sZWFuJywgbm9kZSwgY3R4KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbWF4TGVuZ3RoKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5tYXhMZW5ndGgpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5vZGUubWF4TGVuZ3RoICE9PSAnbnVtYmVyJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBtYXhMZW5ndGggbXVzdCBiZSBhIG51bWJlcicsIG5vZGUsIGN0eCk7XG4gICAgICAgICAgaWYgKG5vZGUubWF4TGVuZ3RoIDwgMCkgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBtYXhMZW5ndGggbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIHplcm8nLCBub2RlLCBjdHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG1pbkxlbmd0aCgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubWluTGVuZ3RoKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLm1pbkxlbmd0aCAhPT0gJ251bWJlcicpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgbWluTGVuZ3RoIG11c3QgYmUgYSBudW1iZXInLCBub2RlLCBjdHgpO1xuICAgICAgICAgIGlmIChub2RlLm1pbkxlbmd0aCA8IDApIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgbWluTGVuZ3RoIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byB6ZXJvJywgbm9kZSwgY3R4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBwYXR0ZXJuKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5wYXR0ZXJuKSB7XG4gICAgICAgICAgLy8gVE9ETzogYWRkIHJlZ2V4cCB2YWxpZGF0aW9uLlxuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5wYXR0ZXJuICE9PSAnc3RyaW5nJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBwYXR0ZXJuIG11c3QgYmUgYSBzdHJpbmcnLCBub2RlLCBjdHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9LFxuICAgIG1heEl0ZW1zKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5tYXhJdGVtcykge1xuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5tYXhJdGVtcyAhPT0gJ251bWJlcicpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgbWF4SXRlbXMgbXVzdCBiZSBhIG51bWJlcicsIG5vZGUsIGN0eCk7XG4gICAgICAgICAgaWYgKG5vZGUubWF4SXRlbXMgPCAwKSByZXR1cm4gY3JlYXRlRXJyb3IoJ1ZhbHVlIG9mIG1heEl0ZW1zIG11c3QgYmUgZ3JlYXRlciBvciBlcXVhbCB0byB6ZXJvLiBZb3UgY2FuYHQgaGF2ZSBuZWdhdGl2ZSBhbW91bnQgb2Ygc29tZXRoaW5nLicsIG5vZGUsIGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbWluSXRlbXMoKSB7XG4gICAgICByZXR1cm4gKG5vZGUsIGN0eCkgPT4ge1xuICAgICAgICBpZiAobm9kZSAmJiBub2RlLm1pbkl0ZW1zKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLm1pbkl0ZW1zICE9PSAnbnVtYmVyJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBtaW5JdGVtcyBtdXN0IGJlIGEgbnVtYmVyJywgbm9kZSwgY3R4KTtcbiAgICAgICAgICBpZiAobm9kZS5taW5JdGVtcyA8IDApIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgbWluSXRlbXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIHplcm8uIFlvdSBjYW5gdCBoYXZlIG5lZ2F0aXZlIGFtb3VudCBvZiBzb21ldGhpbmcuJywgbm9kZSwgY3R4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICB1bmlxdWVJdGVtcygpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUudW5pcXVlSXRlbXMpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIG5vZGUudW5pcXVlSXRlbXMgIT09ICdib29sZWFuJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiB1bmlxdWVJdGVtcyBtdXN0IGJlIGEgYm9vbGVhbicsIG5vZGUsIGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgbWF4UHJvcGVydGllcygpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubWF4UHJvcGVydGllcykge1xuICAgICAgICAgIGlmICh0eXBlb2Ygbm9kZS5tYXhQcm9wZXJ0aWVzICE9PSAnbnVtYmVyJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBtYXhQcm9wZXJ0aWVzIG11c3QgYmUgYSBudW1iZXInLCBub2RlLCBjdHgpO1xuICAgICAgICAgIGlmIChub2RlLm1heFByb3BlcnRpZXMgPCAwKSByZXR1cm4gY3JlYXRlRXJyb3IoJ1ZhbHVlIG9mIG1heFByb3BlcnRpZXMgbXVzdCBiZSBncmVhdGVyIG9yIGVxdWFsIHRvIHplcm8uIFlvdSBjYW5gdCBoYXZlIG5lZ2F0aXZlIGFtb3VudCBvZiBzb21ldGhpbmcuJywgbm9kZSwgY3R4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBtaW5Qcm9wZXJ0aWVzKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5taW5Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBub2RlLm1pblByb3BlcnRpZXMgIT09ICdudW1iZXInKSByZXR1cm4gY3JlYXRlRXJyb3IoJ1ZhbHVlIG9mIG1pblByb3BlcnRpZXMgbXVzdCBiZSBhIG51bWJlcicsIG5vZGUsIGN0eCk7XG4gICAgICAgICAgaWYgKG5vZGUubWluUHJvcGVydGllcyA8IDApIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgbWluUHJvcGVydGllcyBtdXN0IGJlIGdyZWF0ZXIgb3IgZXF1YWwgdG8gemVyby4gWW91IGNhbmB0IGhhdmUgbmVnYXRpdmUgYW1vdW50IG9mIHNvbWV0aGluZy4nLCBub2RlLCBjdHgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHJlcXVpcmVkKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5yZXF1aXJlZCkge1xuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlLnJlcXVpcmVkKSkgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiByZXF1aXJlZCBtdXN0IGJlIGFuIGFycmF5Jywgbm9kZSwgY3R4KTtcbiAgICAgICAgICBpZiAobm9kZS5yZXF1aXJlZC5maWx0ZXIoKGl0ZW0pID0+IHR5cGVvZiBpdGVtICE9PSAnc3RyaW5nJykubGVuZ3RoICE9PSAwKSByZXR1cm4gY3JlYXRlRXJyb3IoJ0FsbCB2YWx1ZXMgb2YgXCJyZXF1aXJlZFwiIGZpZWxkIG11c3QgYmUgc3RyaW5ncycsIG5vZGUsIGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZW51bSgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuZW51bSkge1xuICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShub2RlLmVudW0pKSByZXR1cm4gY3JlYXRlRXJyb3IoJ1ZhbHVlIG9mIGVudW0gbXVzdCBiZSBhbiBhcnJheScsIG5vZGUsIGN0eCk7XG4gICAgICAgICAgaWYgKG5vZGUudHlwZVxuICAgICAgICAgICAgICAmJiB0eXBlb2Ygbm9kZS50eXBlID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgdmFsaWQtdHlwZW9mXG4gICAgICAgICAgICAgICYmIG5vZGUuZW51bS5maWx0ZXIoKGl0ZW0pID0+IHR5cGVvZiBpdGVtICE9PSBub2RlLnR5cGUpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yKCdBbGwgdmFsdWVzIG9mIFwiZW51bVwiIGZpZWxkIG11c3QgYmUgb2YgdGhlIHNhbWUgdHlwZSBhcyB0aGUgXCJ0eXBlXCIgZmllbGQnLCBub2RlLCBjdHgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICB0eXBlKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUudHlwZSAmJiAhWydzdHJpbmcnLCAnb2JqZWN0JywgJ2FycmF5JywgJ2ludGVnZXInLCAnbnVtYmVyJywgJ2Jvb2xlYW4nXS5pbmNsdWRlcyhub2RlLnR5cGUpKSB7XG4gICAgICAgICAgcmV0dXJuIGNyZWF0ZUVycm9yKCdPYmplY3QgdHlwZSBjYW4gYmUgb25lIG9mIGZvbGxvd2luZyBvbmx5OiBcInN0cmluZ1wiLCBcIm9iamVjdFwiLCBcImFycmF5XCIsIFwiaW50ZWdlclwiLCBcIm51bWJlclwiLCBcImJvb2xlYW5cIicsIG5vZGUsIGN0eCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgaXRlbXMoKSB7XG4gICAgICByZXR1cm4gKG5vZGUsIGN0eCkgPT4ge1xuICAgICAgICBpZiAobm9kZSAmJiBub2RlLml0ZW1zICYmIEFycmF5LmlzQXJyYXkobm9kZS5pdGVtcykpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgaXRlbXMgbXVzdCBub3QgYmUgYW4gYXJyYXkuIEl0IG11c3QgYmUgYSBTY2hlbWEgb2JqZWN0Jywgbm9kZSwgY3R4KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXMoKSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5kZXNjcmlwdGlvbiAmJiB0eXBlb2Ygbm9kZS5kZXNjcmlwdGlvbiAhPT0gJ3N0cmluZycpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgZGVzY3JpcHRpb24gbXVzdCBiZSBhIHN0cmluZycsIG5vZGUsIGN0eCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGZvcm1hdCgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuZm9ybWF0ICYmIHR5cGVvZiBub2RlLmZvcm1hdCAhPT0gJ3N0cmluZycpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgZm9ybWF0IG11c3QgYmUgYSBzdHJpbmcnLCBub2RlLCBjdHgpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBudWxsYWJsZSgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUubnVsbGFibGUgJiYgdHlwZW9mIG5vZGUubnVsbGFibGUgIT09ICdib29sZWFuJykgcmV0dXJuIGNyZWF0ZUVycm9yKCdWYWx1ZSBvZiBudWxsYWJsZSBtdXN0IGJlIGEgYm9vbGVhbicsIG5vZGUsIGN0eCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9LFxuICAgIHJlYWRPbmx5KCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS5yZWFkT25seSAmJiB0eXBlb2Ygbm9kZS5yZWFkT25seSAhPT0gJ2Jvb2xlYW4nKSByZXR1cm4gY3JlYXRlRXJyb3IoJ1ZhbHVlIG9mIHJlYWRPbmx5IG11c3QgYmUgYSBib29sZWFuJywgbm9kZSwgY3R4KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgd3JpdGVPbmx5KCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+IHtcbiAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS53cml0ZU9ubHkgJiYgdHlwZW9mIG5vZGUud3JpdGVPbmx5ICE9PSAnYm9vbGVhbicpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2Ygd3JpdGVPbmx5IG11c3QgYmUgYSBib29sZWFuJywgbm9kZSwgY3R4KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9O1xuICAgIH0sXG4gICAgZGVwcmVjYXRlZCgpIHtcbiAgICAgIHJldHVybiAobm9kZSwgY3R4KSA9PiB7XG4gICAgICAgIGlmIChub2RlICYmIG5vZGUuZGVwcmVjYXRlZCAmJiB0eXBlb2Ygbm9kZS5kZXByZWNhdGVkICE9PSAnYm9vbGVhbicpIHJldHVybiBjcmVhdGVFcnJvcignVmFsdWUgb2YgZGVwcmVjYXRlZCBtdXN0IGJlIGEgYm9vbGVhbicsIG5vZGUsIGN0eCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGV4YW1wbGUoKSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9LFxuICAgIGRlZmF1bHQoKSB7XG4gICAgICByZXR1cm4gKCkgPT4gbnVsbDtcbiAgICB9LFxuICAgIGFsbE9mKCkge1xuICAgICAgcmV0dXJuICgpID0+IG51bGw7XG4gICAgfSxcbiAgfSxcbiAgcHJvcGVydGllczoge1xuICAgIGFsbE9mKCkge1xuICAgICAgcmV0dXJuIE9wZW5BUElTY2hlbWFPYmplY3Q7XG4gICAgfSxcbiAgICBhbnlPZigpIHtcbiAgICAgIHJldHVybiBPcGVuQVBJU2NoZW1hT2JqZWN0O1xuICAgIH0sXG4gICAgb25lT2YoKSB7XG4gICAgICByZXR1cm4gT3BlbkFQSVNjaGVtYU9iamVjdDtcbiAgICB9LFxuICAgIG5vdCgpIHtcbiAgICAgIHJldHVybiBPcGVuQVBJU2NoZW1hT2JqZWN0O1xuICAgIH0sXG4gICAgaXRlbXMoKSB7XG4gICAgICByZXR1cm4gT3BlbkFQSVNjaGVtYU9iamVjdDtcbiAgICB9LFxuICAgIHByb3BlcnRpZXM6IE9wZW5BUElTY2hlbWFNYXAsXG4gICAgZGlzY3JpbWluYXRvcjogT3BlbkFQSURpc2NyaW1pbmF0b3IsXG4gICAgZXh0ZXJuYWxEb2NzOiBPcGVuQVBJRXh0ZXJuYWxEb2N1bWVudGF0aW9uLFxuICAgIHhtbDogT3BlbkFQSVhNTCxcbiAgfSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IE9wZW5BUElTY2hlbWFPYmplY3Q7XG4iXX0=
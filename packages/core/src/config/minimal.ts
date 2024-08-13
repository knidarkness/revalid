import type { PluginStyleguideConfig } from './types.js';

const minimal: PluginStyleguideConfig<'built-in'> = {
  rules: {
    'info-contact': 'off',
    'info-license': 'off',
    'info-license-url': 'off',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
    'parameter-description': 'off',
    'no-path-trailing-slash': 'warn',
    'no-identical-paths': 'warn',
    'no-ambiguous-paths': 'warn',
    'path-declaration-must-exist': 'warn',
    'path-not-include-query': 'warn',
    'path-parameters-defined': 'warn',
    'operation-description': 'off',
    'operation-2xx-response': 'warn',
    'operation-4xx-response': 'off',
    'operation-operationId': 'warn',
    'operation-summary': 'warn',
    'operation-operationId-unique': 'warn',
    'operation-parameters-unique': 'warn',
    'operation-tag-defined': 'off',
    'security-defined': 'warn',
    'operation-operationId-url-safe': 'warn',
    'operation-singular-tag': 'off',
    'no-unresolved-refs': 'error',
    'no-enum-type-mismatch': 'warn',
    'paths-kebab-case': 'off',
    spec: 'error',
    'spec-strict-refs': 'off',
    'no-http-verbs-in-paths': 'off',
    'no-invalid-parameter-examples': 'off',
    'no-invalid-schema-examples': 'off',
    'path-excludes-patterns': 'off',
    'path-http-verbs-order': 'off',
    'path-params-defined': 'off',
    'required-string-property-missing-min-length': 'off',
    'response-contains-header': 'off',
    'path-segment-plural': 'off',
    'scalar-property-missing-example': 'off',
    'no-required-schema-properties-undefined': 'off',
  },
  oas2Rules: {
    'boolean-parameter-prefixes': 'off',
    'request-mime-type': 'off',
    'response-contains-property': 'off',
    'response-mime-type': 'off',
  },
  oas3_0Rules: {
    'no-invalid-media-type-examples': {
      severity: 'warn',
      allowAdditionalProperties: false,
    },
    'no-server-example.com': 'warn',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'warn',
    'no-example-value-and-externalValue': 'warn',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'warn',
    'no-server-variables-empty-enum': 'error',
    'spec-components-invalid-map-name': 'warn',
    'boolean-parameter-prefixes': 'off',
    'component-name-unique': 'off',
    'operation-4xx-problem-details-rfc7807': 'off',
    'request-mime-type': 'off',
    'response-contains-property': 'off',
    'response-mime-type': 'off',
    'array-parameter-serialization': 'off',
  },
  oas3_1Rules: {
    'no-invalid-media-type-examples': 'warn',
    'no-server-example.com': 'warn',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'warn',
    'no-example-value-and-externalValue': 'warn',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'warn',
    'no-server-variables-empty-enum': 'error',
    'spec-components-invalid-map-name': 'warn',
    'boolean-parameter-prefixes': 'off',
    'component-name-unique': 'off',
    'operation-4xx-problem-details-rfc7807': 'off',
    'request-mime-type': 'off',
    'response-contains-property': 'off',
    'response-mime-type': 'off',
    'array-parameter-serialization': 'off',
  },
  async2Rules: {
    spec: 'error',
    'info-contact': 'off',
    'operation-operationId': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
    'channels-kebab-case': 'off',
    'no-channel-trailing-slash': 'off',
  },
  async3Rules: {
    spec: 'error',
    'info-contact': 'off',
    'operation-operationId': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
    'channels-kebab-case': 'off',
    'no-channel-trailing-slash': 'off',
  },
  arazzoRules: {
    spec: 'error',
  },
};

export default minimal;

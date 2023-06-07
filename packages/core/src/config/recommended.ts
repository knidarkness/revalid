import type { PluginStyleguideConfig } from './types';

export default {
  rules: {
    'info-contact': 'off',
    'info-license': 'warn',
    'info-license-url': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
    'parameter-description': 'off',
    'no-path-trailing-slash': 'error',
    'no-identical-paths': 'error',
    'no-ambiguous-paths': 'warn',
    'path-declaration-must-exist': 'error',
    'path-not-include-query': 'error',
    'path-parameters-defined': 'error',
    'operation-description': 'off',
    'operation-2xx-response': 'warn',
    assertions: 'warn',
    'operation-4xx-response': 'warn',
    'operation-operationId': 'warn',
    'operation-summary': 'error',
    'operation-operationId-unique': 'error',
    'operation-operationId-url-safe': 'error',
    'operation-parameters-unique': 'error',
    'operation-tag-defined': 'off',
    'security-defined': 'error',
    'operation-singular-tag': 'off',
    'no-unresolved-refs': 'error',
    'no-enum-type-mismatch': 'error',
    'boolean-parameter-prefixes': 'off',
    'paths-kebab-case': 'off',
    spec: 'error',
    'spec-strict-refs': 'off',
  },
  oas3_0Rules: {
    'no-invalid-media-type-examples': {
      severity: 'warn',
      allowAdditionalProperties: false,
    },
    'no-server-example.com': 'warn',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'spec-components-invalid-map-name': 'error',
  },
  oas3_1Rules: {
    'no-invalid-media-type-examples': 'warn',
    'no-server-example.com': 'warn',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'spec-components-invalid-map-name': 'error',
  },
} as PluginStyleguideConfig;

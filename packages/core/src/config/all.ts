import type { PluginStyleguideConfig } from './types';

export default {
  rules: {
    'info-contact': 'error',
    'info-license': 'error',
    'info-license-url': 'error',
    'tag-description': 'error',
    'tags-alphabetical': 'error',
    'parameter-description': 'error',
    'no-identical-paths': 'error',
    'no-ambiguous-paths': 'error',
    'no-path-trailing-slash': 'error',
    'path-segment-plural': 'error',
    'path-declaration-must-exist': 'error',
    'path-not-include-query': 'error',
    'path-parameters-defined': 'error',
    'operation-description': 'error',
    'operation-2xx-response': 'error',
    'operation-4xx-response': 'error',
    assertions: 'error',
    'operation-operationId': 'error',
    'operation-summary': 'error',
    'operation-operationId-unique': 'error',
    'operation-operationId-url-safe': 'error',
    'operation-parameters-unique': 'error',
    'operation-tag-defined': 'error',
    'security-defined': 'error',
    'operation-singular-tag': 'error',
    'no-unresolved-refs': 'error',
    'no-enum-type-mismatch': 'error',
    'boolean-parameter-prefixes': 'error',
    'paths-kebab-case': 'error',
    'no-http-verbs-in-paths': 'error',
    'path-excludes-patterns': {
      severity: 'error',
      patterns: [],
    },
    'request-mime-type': {
      severity: 'error',
      allowedValues: ['application/json'],
    },
    'response-mime-type': {
      severity: 'error',
      allowedValues: ['application/json'],
    },
    spec: 'error',
    'no-invalid-schema-examples': 'error',
    'no-invalid-parameter-examples': 'error',
    'scalar-property-missing-example': 'error',
    'spec-strict-refs': 'error',
    'component-name-unique': 'error',
  },
  oas3_0Rules: {
    'no-invalid-media-type-examples': 'error',
    'no-server-example.com': 'error',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'error',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'operation-4xx-problem-details-rfc7807': 'error',
  },
  oas3_1Rules: {
    'no-server-example.com': 'error',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'error',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'operation-4xx-problem-details-rfc7807': 'error',
  },
} as PluginStyleguideConfig;

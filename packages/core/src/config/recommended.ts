import type { PluginStyleguideConfig } from './types';

const recommended: PluginStyleguideConfig<'built-in'> = {
  rules: {
    'info-contact': 'off',
    'info-license': 'warn',
    'info-license-url': 'off',
    'info-license-strict': 'warn',
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
    'paths-kebab-case': 'off',
    spec: 'error',
    'spec-strict-refs': 'off',
    'no-http-verbs-in-paths': 'off',
    'no-invalid-parameter-examples': 'off',
    'no-invalid-schema-examples': 'off',
    'path-excludes-patterns': 'off',
    'path-http-verbs-order': 'off',
    'path-params-defined': 'off',
    'path-segment-plural': 'off',
    'required-string-property-missing-min-length': 'off',
    'response-contains-header': 'off',
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
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'spec-components-invalid-map-name': 'error',
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
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'spec-components-invalid-map-name': 'error',
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
    'info-license-strict': 'warn',
    'operation-operationId': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
    'channels-kebab-case': 'off',
    'no-channel-trailing-slash': 'off',
  },
  async3Rules: {
    spec: 'error',
    'info-contact': 'off',
    'info-license-strict': 'warn',
    'operation-operationId': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
    'channels-kebab-case': 'off',
    'no-channel-trailing-slash': 'off',
  },
  arazzoRules: {
    spec: 'error',
    'parameters-not-in-body': 'warn',
    'source-description-type': 'error',
    'version-enum': 'warn',
    'workflowId-unique': 'error',
    'stepId-unique': 'error',
    'sourceDescription-name-unique': 'error',
    'workflow-dependsOn': 'error',
    'parameters-unique': 'error',
    'step-onSuccess-unique': 'warn',
    'step-onFailure-unique': 'warn',
    'requestBody-replacements-unique': 'warn',
  },
};

export default recommended;

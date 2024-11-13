import type { PluginStyleguideConfig } from './types';

const recommended: PluginStyleguideConfig<'built-in'> = {
  rules: {
    struct: 'error',
  },
  oas2Rules: {
    'boolean-parameter-prefixes': 'off',
    'info-contact': 'off',
    'info-license': 'warn',
    'info-license-url': 'off',
    'info-license-strict': 'warn',
    'no-path-trailing-slash': 'error',
    'no-identical-paths': 'error',
    'no-ambiguous-paths': 'warn',
    'no-invalid-schema-examples': 'off',
    'no-invalid-parameter-examples': 'off',
    'no-http-verbs-in-paths': 'off',
    'no-enum-type-mismatch': 'error',
    'no-unresolved-refs': 'error',
    'no-required-schema-properties-undefined': 'off',
    'operation-summary': 'error',
    'operation-description': 'off',
    'operation-operationId': 'warn',
    'operation-operationId-unique': 'error',
    'operation-operationId-url-safe': 'error',
    'operation-2xx-response': 'warn',
    'operation-4xx-response': 'warn',
    'operation-parameters-unique': 'error',
    'operation-tag-defined': 'off',
    'operation-singular-tag': 'off',
    'parameter-description': 'off',
    'path-declaration-must-exist': 'error',
    'path-not-include-query': 'error',
    'path-parameters-defined': 'error',
    'paths-kebab-case': 'off',
    'path-excludes-patterns': 'off',
    'path-http-verbs-order': 'off',
    'path-params-defined': 'off',
    'path-segment-plural': 'off',
    'required-string-property-missing-min-length': 'off',
    'response-contains-header': 'off',
    'request-mime-type': 'off',
    'response-contains-property': 'off',
    'response-mime-type': 'off',
    'security-defined': 'error',
    'spec-strict-refs': 'off',
    'scalar-property-missing-example': 'off',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
  },
  oas3_0Rules: {
    'array-parameter-serialization': 'off',
    'boolean-parameter-prefixes': 'off',
    'component-name-unique': 'off',
    'info-contact': 'off',
    'info-license': 'warn',
    'info-license-url': 'off',
    'info-license-strict': 'warn',
    'no-path-trailing-slash': 'error',
    'no-identical-paths': 'error',
    'no-ambiguous-paths': 'warn',
    'no-invalid-schema-examples': 'off',
    'no-invalid-parameter-examples': 'off',
    'no-http-verbs-in-paths': 'off',
    'no-enum-type-mismatch': 'error',
    'no-unresolved-refs': 'error',
    'no-required-schema-properties-undefined': 'off',
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
    'operation-summary': 'error',
    'operation-operationId': 'warn',
    'operation-operationId-unique': 'error',
    'operation-operationId-url-safe': 'error',
    'operation-description': 'off',
    'operation-2xx-response': 'warn',
    'operation-4xx-response': 'warn',
    'operation-4xx-problem-details-rfc7807': 'off',
    'operation-parameters-unique': 'error',
    'operation-tag-defined': 'off',
    'operation-singular-tag': 'off',
    'parameter-description': 'off',
    'path-declaration-must-exist': 'error',
    'path-not-include-query': 'error',
    'path-parameters-defined': 'error',
    'paths-kebab-case': 'off',
    'path-excludes-patterns': 'off',
    'path-http-verbs-order': 'off',
    'path-params-defined': 'off',
    'path-segment-plural': 'off',
    'required-string-property-missing-min-length': 'off',
    'response-contains-header': 'off',
    'request-mime-type': 'off',
    'response-contains-property': 'off',
    'response-mime-type': 'off',
    'security-defined': 'error',
    'spec-strict-refs': 'off',
    'scalar-property-missing-example': 'off',
    'spec-components-invalid-map-name': 'error',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
  },
  oas3_1Rules: {
    'array-parameter-serialization': 'off',
    'boolean-parameter-prefixes': 'off',
    'component-name-unique': 'off',
    'info-contact': 'off',
    'info-license': 'warn',
    'info-license-url': 'off',
    'info-license-strict': 'warn',
    'no-path-trailing-slash': 'error',
    'no-identical-paths': 'error',
    'no-ambiguous-paths': 'warn',
    'no-invalid-schema-examples': 'off',
    'no-invalid-parameter-examples': 'off',
    'no-http-verbs-in-paths': 'off',
    'no-enum-type-mismatch': 'error',
    'no-unresolved-refs': 'error',
    'no-required-schema-properties-undefined': 'off',
    'no-invalid-media-type-examples': 'warn',
    'no-server-example.com': 'warn',
    'no-server-trailing-slash': 'error',
    'no-empty-servers': 'error',
    'no-example-value-and-externalValue': 'error',
    'no-unused-components': 'warn',
    'no-undefined-server-variable': 'error',
    'no-server-variables-empty-enum': 'error',
    'operation-summary': 'error',
    'operation-operationId': 'warn',
    'operation-operationId-unique': 'error',
    'operation-operationId-url-safe': 'error',
    'operation-description': 'off',
    'operation-2xx-response': 'warn',
    'operation-4xx-response': 'warn',
    'operation-4xx-problem-details-rfc7807': 'off',
    'operation-parameters-unique': 'error',
    'operation-tag-defined': 'off',
    'operation-singular-tag': 'off',
    'parameter-description': 'off',
    'path-declaration-must-exist': 'error',
    'path-not-include-query': 'error',
    'path-parameters-defined': 'error',
    'paths-kebab-case': 'off',
    'path-excludes-patterns': 'off',
    'path-http-verbs-order': 'off',
    'path-params-defined': 'off',
    'path-segment-plural': 'off',
    'required-string-property-missing-min-length': 'off',
    'response-contains-header': 'off',
    'request-mime-type': 'off',
    'response-contains-property': 'off',
    'response-mime-type': 'off',
    'security-defined': 'error',
    'spec-strict-refs': 'off',
    'scalar-property-missing-example': 'off',
    'spec-components-invalid-map-name': 'error',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
  },
  async2Rules: {
    'channels-kebab-case': 'off',
    'info-contact': 'off',
    'info-license-strict': 'warn',
    'no-channel-trailing-slash': 'off',
    'operation-operationId': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
  },
  async3Rules: {
    'channels-kebab-case': 'off',
    'info-contact': 'off',
    'info-license-strict': 'warn',
    'no-channel-trailing-slash': 'off',
    'operation-operationId': 'warn',
    'tag-description': 'warn',
    'tags-alphabetical': 'off',
  },
  arazzo1Rules: {
    'criteria-unique': 'warn',
    'no-criteria-xpath': 'warn',
    'no-actions-type-end': 'warn',
    'parameters-not-in-body': 'warn',
    'parameters-unique': 'error',
    'requestBody-replacements-unique': 'warn',
    'sourceDescription-type': 'error',
    'step-onSuccess-unique': 'warn',
    'step-onFailure-unique': 'warn',
    'stepId-unique': 'error',
    'sourceDescription-name-unique': 'error',
    'sourceDescriptions-not-empty': 'error',
    'version-enum': 'warn',
    'workflowId-unique': 'error',
    'workflow-dependsOn': 'error',
  },
};

export default recommended;

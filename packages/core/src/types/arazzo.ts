/* istanbul ignore file */
import { mapOf, type NodeType, listOf } from '.';
import { DependentRequired, Schema, SchemaProperties } from './oas3_1';
import { Discriminator, DiscriminatorMapping, ExternalDocs, Xml } from './oas3';

const Root: NodeType = {
  properties: {
    arazzo: { type: 'string', enum: ['1.0.0'] },
    info: 'Info',
    sourceDescriptions: 'SourceDescriptions',
    'x-parameters': 'Parameters',
    workflows: 'Workflows',
    components: 'Components',
  },
  required: ['arazzo', 'info', 'sourceDescriptions', 'workflows'],
  extensionsPrefix: 'x-',
};
const NamedParameters: NodeType = {
  properties: {},
  additionalProperties: 'Parameter',
};
const NamedSuccessActions: NodeType = {
  properties: {},
  additionalProperties: 'SuccessActionObject',
};
const NamedFailureActions: NodeType = {
  properties: {},
  additionalProperties: 'FailureActionObject',
};
const Components: NodeType = {
  properties: {
    inputs: 'NamedInputs',
    parameters: 'NamedParameters',
    successActions: 'NamedSuccessActions',
    failureActions: 'NamedFailureActions',
  },
  extensionsPrefix: 'x-',
};
const NamedInputs: NodeType = mapOf('Schema');
const Info: NodeType = {
  properties: {
    title: { type: 'string' },
    description: { type: 'string' },
    summary: { type: 'string' },
    version: { type: 'string' },
  },
  required: ['title', 'version'],
  extensionsPrefix: 'x-',
};
const SourceDescriptions: NodeType = {
  properties: {},
  items: (value: any) => {
    if (value?.type === 'openapi') {
      return 'OpenAPISourceDescription';
    } else if (value?.type === 'arazzo') {
      return 'ArazzoSourceDescription';
    } else {
      return 'NoneSourceDescription';
    }
  },
};
const OpenAPISourceDescription: NodeType = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string', enum: ['openapi'] },
    url: { type: 'string' },
    'x-serverUrl': { type: 'string' },
  },
  required: ['name', 'type', 'url'],
  extensionsPrefix: 'x-',
};
const NoneSourceDescription: NodeType = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string', enum: ['none'] },
    'x-serverUrl': { type: 'string' },
  },
  required: ['name', 'type', 'x-serverUrl'],
  extensionsPrefix: 'x-',
};
const ArazzoSourceDescription: NodeType = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string', enum: ['arazzo'] },
    url: { type: 'string' },
  },
  required: ['name', 'type', 'url'],
  extensionsPrefix: 'x-',
};
const ReusableObject: NodeType = {
  properties: {
    reference: { type: 'string' },
    value: {
      type: 'string',
    },
  },
  required: ['reference'],
  extensionsPrefix: 'x-',
};
const Parameter: NodeType = {
  properties: {
    in: { type: 'string', enum: ['header', 'query', 'path', 'cookie', 'body'] },
    name: { type: 'string' },
    value: {}, // any
  },
  required: ['name', 'value'],
  extensionsPrefix: 'x-',
};
const Parameters: NodeType = {
  properties: {},
  items: (value: any) => {
    if (value?.in) {
      return 'Parameter';
    } else {
      return 'ReusableObject';
    }
  },
};
const Workflow: NodeType = {
  properties: {
    workflowId: { type: 'string' },
    summary: { type: 'string' },
    description: { type: 'string' },
    parameters: 'Parameters',
    dependsOn: { type: 'array', items: { type: 'string' } },
    inputs: 'NamedInputs',
    outputs: 'Outputs',
    steps: 'Steps',
    successActions: 'OnSuccessActionList',
    failureActions: 'OnFailureActionList',
  },
  required: ['workflowId', 'steps'],
  extensionsPrefix: 'x-',
};
const Workflows: NodeType = listOf('Workflow');
const Steps: NodeType = listOf('Step');
const Step: NodeType = {
  properties: {
    stepId: { type: 'string' },
    description: { type: 'string' },
    operationId: { type: 'string' },
    operationPath: { type: 'string' },
    workflowId: { type: 'string' },
    parameters: 'Parameters',
    successCriteria: listOf('CriterionObject'),
    onSuccess: 'OnSuccessActionList',
    onFailure: 'OnFailureActionList',
    outputs: 'Outputs',
    'x-inherit': { enum: ['auto', 'none'] },
    'x-expect': 'ExpectSchema',
    'x-assert': { type: 'string' },
    'x-operation': 'ExtendedOperation',
    requestBody: 'RequestBody',
  },
  required: ['stepId'],
  requiredOneOf: ['x-operation', 'operationId', 'operationPath', 'workflowId'],
  extensionsPrefix: 'x-',
};
const Outputs: NodeType = {
  properties: {},
  additionalProperties: {
    type: 'string',
  },
};
const RequestBody: NodeType = {
  properties: {
    contentType: { type: 'string' },
    payload: {},
    replacements: listOf('Replacement'),
  },
  required: ['payload'],
  extensionsPrefix: 'x-',
};
const Replacement: NodeType = {
  properties: {
    target: { type: 'string' },
    value: {},
  },
  required: ['target', 'value'],
  extensionsPrefix: 'x-',
};
const ExtendedOperation: NodeType = {
  properties: {
    path: { type: 'string' },
    method: {
      enum: ['get', 'post', 'put', 'delete', 'patch'],
    },
    sourceDescriptionName: { type: 'string' },
    serverUrl: { type: 'string' },
  },
  required: ['path', 'method'],
};
const ExpectSchema: NodeType = {
  properties: {
    statusCode: { type: 'number' },
    mimeType: { type: 'string' },
    body: {},
    schema: 'Schema',
  },
  requiredOneOf: ['statusCode', 'mimeType', 'body', 'schema'],
};
const CriterionObject: NodeType = {
  properties: {
    condition: { type: 'string' },
    context: { type: 'string' },
    type: (value: any) => {
      if (!value) {
        return undefined;
      } else if (typeof value === 'string') {
        return { enum: ['regex', 'jsonpath', 'simple', 'xpath'] };
      } else if (value.type === 'jsonpath') {
        return 'JSONPathCriterion';
      } else {
        return 'XPathCriterion';
      }
    },
  },
  required: ['condition'],
};
const JSONPathCriterion: NodeType = {
  properties: {
    type: { type: 'string', enum: ['jsonpath'] },
    version: { type: 'string', enum: ['draft-goessner-dispatch-jsonpath-00'] },
  },
};
const XPathCriterion: NodeType = {
  properties: {
    type: { type: 'string', enum: ['xpath'] },
    version: { type: 'string', enum: ['xpath-30', 'xpath-20', 'xpath-10'] },
  },
};
const SuccessActionObject: NodeType = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string', enum: ['goto', 'end'] },
    stepId: { type: 'string' },
    workflowId: { type: 'string' },
    criteria: 'CriterionObject',
  },
  required: ['type', 'name'],
};
const OnSuccessActionList: NodeType = {
  properties: {},
  items: (value: any) => {
    if (value?.type && value?.name) {
      return 'SuccessActionObject';
    } else {
      return 'ReusableObject';
    }
  },
};
const FailureActionObject: NodeType = {
  properties: {
    name: { type: 'string' },
    type: { type: 'string', enum: ['goto', 'retry', 'end'] },
    workflowId: { type: 'string' },
    stepId: { type: 'string' },
    retryAfter: { type: 'number' },
    retryLimit: { type: 'number' },
    criteria: 'CriterionObject',
  },
  required: ['type', 'name'],
};
const OnFailureActionList: NodeType = {
  properties: {},
  items: (value: any) => {
    if (value?.type && value?.name) {
      return 'FailureActionObject';
    } else {
      return 'ReusableObject';
    }
  },
};

export const ArazzoTypes: Record<string, NodeType> = {
  Root,
  Info,
  SourceDescriptions,
  OpenAPISourceDescription,
  NoneSourceDescription,
  ArazzoSourceDescription,
  Parameters,
  Parameter,
  ReusableObject,
  Workflows,
  Workflow,
  Steps,
  Step,
  RequestBody,
  Replacement,
  ExtendedOperation,
  ExpectSchema,
  Outputs,
  CriterionObject,
  XPathCriterion,
  JSONPathCriterion,
  SuccessActionObject,
  OnSuccessActionList,
  FailureActionObject,
  OnFailureActionList,
  Schema,
  NamedSchemas: mapOf('Schema'),
  ExternalDocs,
  DiscriminatorMapping,
  Discriminator,
  DependentRequired,
  SchemaProperties,
  PatternProperties: SchemaProperties,
  Components,
  NamedInputs,
  NamedParameters,
  NamedSuccessActions,
  NamedFailureActions,
  Xml,
};

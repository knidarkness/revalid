/* istanbul ignore file */
export interface InfoObject {
  title: string;
  description?: string;
  summary?: string;
  version: string;
}

export interface OpenAPISourceDescription {
  name: string;
  type: 'openapi';
  url: string;
  'x-serverUrl'?: string;
}

export interface NoneSourceDescription {
  name: string;
  type: 'none';
  'x-serverUrl': string;
}

export interface ArazzoSourceDescription {
  name: string;
  type: 'arazzo';
  url: string;
}

export type SourceDescription =
  | OpenAPISourceDescription
  | NoneSourceDescription
  | ArazzoSourceDescription;

export interface Parameter {
  in?: 'header' | 'query' | 'path' | 'cookie' | 'body';
  name: string;
  value: string | number | boolean;
  reference?: string;
}

export interface ExtendedOperation {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  sourceDescriptionName?: string;
  serverUrl?: string;
}

export interface ExpectSchema {
  statusCode?: number;
  mimeType?: string;
  body?: any;
  schema?: {
    [key: string]: any;
  };
}

export interface Replacement {
  target: string;
  value: string | object | any[];
}

export interface RequestBody {
  contentType?: string;
  payload: string | object | any[];
  encoding?: string;
  replacements?: Replacement[];
}

export interface CriteriaObject {
  condition: string;
  context?: string;
  type?:
    | 'regex'
    | 'jsonpath'
    | 'simple'
    | 'xpath'
    | {
        type: 'jsonpath';
        version: 'draft-goessner-dispatch-jsonpath-00';
      }
    | {
        type: 'xpath';
        version: 'xpath-30' | 'xpath-20' | 'xpath-10';
      };
}

export interface OnSuccessObject {
  name: string;
  type: 'goto' | 'end';
  stepId?: string;
  workflowId?: string;
  criteria?: CriteriaObject[];
}

export interface OnFailureObject {
  name: string;
  type: 'goto' | 'retry' | 'end';
  workflowId?: string;
  stepId?: string;
  retryAfter?: number;
  retryLimit?: number;
  criteria?: CriteriaObject[];
}

export interface Step {
  stepId: string;
  description?: string;
  operationId?: string;
  operationPath?: string;
  workflowId?: string;
  parameters?: Parameter[];
  successCriteria?: CriteriaObject[];
  onSuccess?: OnSuccessObject[];
  onFailure?: OnFailureObject[];
  outputs?: {
    [key: string]: string | object | any[] | boolean | number;
  };
  'x-inherit'?: 'auto' | 'none';
  'x-expect'?: ExpectSchema;
  'x-assert'?: string;
  'x-operation'?: ExtendedOperation;
  requestBody?: RequestBody;
}

export interface Workflow {
  workflowId: string;
  summary?: string;
  description?: string;
  parameters?: Parameter[];
  dependsOn?: string[];
  inputs?: {
    type: 'object' | 'array' | 'string' | 'number' | 'integer' | 'boolean' | 'null';
    properties?: {
      [key: string]: any;
    };
    required?: string[];
    items?: {
      [key: string]: any;
    };
  };
  outputs?: {
    [key: string]: string;
  };
  steps: Step[];
  successActions?: OnSuccessObject[];
  failureActions?: OnFailureObject[];
}

export interface ArazzoDefinition {
  arazzo: '1.0.0';
  info: InfoObject;
  sourceDescriptions: SourceDescription[];
  'x-parameters'?: Parameter[];
  workflows: Workflow[];
  components?: {
    inputs?: {
      [key: string]: {
        type: string;
        properties?: {
          [key: string]: any;
        };
      };
    };
    parameters?: {
      [key: string]: Parameter;
    };
    successActions?: {
      [key: string]: OnSuccessObject;
    };
    failureActions?: {
      [key: string]: OnFailureObject;
    };
  };
}

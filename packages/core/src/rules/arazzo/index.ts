import { Spec } from '../common/spec';
import { Assertions } from '../common/assertions';
import { ParametersNoBodyInsideIn } from '../spot/parameters-no-body-inside-in';
import { StrictSourceDescriptionType } from '../arazzo/strict-source-description-type';
import { ArazzoVersionEnum } from '../spot/arazzo-version-enum';
import { WorkflowWorkflowIdUnique } from './workflow-workflowId-unique';
import { StepStepIdUnique } from './step-stepId-unique';
import { SourceDescriptionsNameUnique } from './sourceDescriptions-name-unique';
import { WorkflowDependsOnUnique } from './workflow-dependsOn-unique';

import type { ArazzoRule } from '../../visitors';
import type { ArazzoRuleSet } from '../../oas-types';

export const rules: ArazzoRuleSet<'built-in'> = {
  spec: Spec as ArazzoRule,
  assertions: Assertions as ArazzoRule,
  'parameters-no-body-inside-in': ParametersNoBodyInsideIn as ArazzoRule,
  'strict-source-description-type': StrictSourceDescriptionType as ArazzoRule,
  'arazzo-version-enum': ArazzoVersionEnum as ArazzoRule,
  'workflow-workflowId-unique': WorkflowWorkflowIdUnique as ArazzoRule,
  'step-stepId-unique': StepStepIdUnique as ArazzoRule,
  'sourceDescription-name-unique': SourceDescriptionsNameUnique as ArazzoRule,
  'workflow-dependsOn-unique': WorkflowDependsOnUnique as ArazzoRule,
};

export const preprocessors = {};

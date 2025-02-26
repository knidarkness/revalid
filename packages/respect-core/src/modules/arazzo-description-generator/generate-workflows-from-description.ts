import { sortMethods } from '../../utils/sort';

import type { OperationMethod, Workflow, Step } from '../../types';

export type WorkflowsFromDescriptionInput = {
  descriptionPaths: any;
  sourceDescriptionName: string;
};

export function generateWorkflowsFromDescription({
  descriptionPaths,
  sourceDescriptionName,
}: WorkflowsFromDescriptionInput): Workflow[] {
  const workflows = [] as Workflow[];

  for (const pathItemKey in descriptionPaths) {
    for (const pathItemObjectKey of Object.keys(descriptionPaths[pathItemKey]).sort(sortMethods)) {
      const keyToCheck = pathItemObjectKey.toLocaleLowerCase();

      if (
        [
          'get',
          'post',
          'put',
          'delete',
          'patch',
          'head',
          'options',
          'trace',
          'connect',
          'query',
        ].includes(keyToCheck.toLocaleLowerCase())
      ) {
        const method = keyToCheck as OperationMethod;
        const pathKey = pathItemKey
          .replace(/^\/|\/$/g, '')
          .split('/')
          .join('-');

        const resolvedOperationId =
          descriptionPaths[pathItemKey][method]?.operationId ||
          generateOperationId(pathItemKey, method);

        workflows.push({
          workflowId: pathKey ? `${method}-${pathKey}-workflow` : `${method}-workflow`,
          steps: [
            {
              stepId: pathKey ? `${method}-${pathKey}-step` : `${method}-step`,
              operationId: `$sourceDescriptions.${sourceDescriptionName}.${resolvedOperationId}`,
              ...generateParametersWithSuccessCriteria(
                descriptionPaths[pathItemKey][method].responses
              ),
            } as unknown as Step,
          ],
        });
      }
    }
  }

  return workflows;
}

function generateParametersWithSuccessCriteria(
  responses: any
): [] | { successCriteria: { condition: string }[] } {
  const responseCodesFromDescription = Object.keys(responses || {});

  if (!responseCodesFromDescription.length) {
    return [];
  }

  const firstResponseCode = responseCodesFromDescription?.[0];
  return { successCriteria: [{ condition: `$statusCode == ${firstResponseCode}` }] };
}

function generateOperationId(path: string, method: OperationMethod) {
  return `${method}@${path}`;
}
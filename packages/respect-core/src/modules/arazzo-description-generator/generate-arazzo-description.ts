import * as path from 'path';
import { bundleOpenApi } from '../description-parser';
import { generateWorkflowsFromDescription } from './generate-workflows-from-description';
import { generateInputsArazzoComponents } from './generate-inputs-arazzo-components';

import type { TestDescription } from '../../types';
import type { GenerateArazzoFileOptions } from '../../handlers/generate';

export const infoSubstitute = {
  title: '[REPLACE WITH API title]',
  version: '[REPLACE WITH API version]',
};

function resolveDescriptionNameFromPath(descriptionPath: string): string {
  return path
    .parse(descriptionPath)
    .name.replace(/\./g, '-')
    .replace(/[^A-Za-z0-9_-]/g, '');
}

export async function generateArazzoDescription({
  descriptionPath,
  'output-file': outputFile,
}: GenerateArazzoFileOptions) {
  const { paths: pathsObject, info, security, components } = (await bundleOpenApi(descriptionPath, '')) || {};
  // TODO: remove check for security on root, operation and path level and generate inputs for each workflow
  console.log('security ==> ', security);

  const sourceDescriptionName = resolveDescriptionNameFromPath(descriptionPath);
  const resolvedDescriptionPath = outputFile
    ? path.relative(path.dirname(outputFile), path.resolve(descriptionPath))
    : descriptionPath;
  const inputsComponents = components?.securitySchemes ? generateInputsArazzoComponents(components?.securitySchemes) : undefined;
  
  console.log('InputsComponents ==> ', inputsComponents);

  const testDescription: TestDescription = {
    arazzo: '1.0.1',
    info: {
      title: info?.title || infoSubstitute.title,
      version: info?.version || infoSubstitute.version,
    },
    sourceDescriptions: [
      {
        name: sourceDescriptionName,
        type: 'openapi',
        url: resolvedDescriptionPath,
      },
    ],
    workflows: generateWorkflowsFromDescription({
      descriptionPaths: pathsObject,
      sourceDescriptionName,
    }),
    ...(inputsComponents && {
      components: {
        ...inputsComponents
      }
    })
  };

  return JSON.parse(JSON.stringify(testDescription, null, 2));
}

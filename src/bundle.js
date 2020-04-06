import yaml from 'js-yaml';

import { getLintConfig } from './config';
import traverseNode from './traverse';
import createContext from './context';

import { OpenAPIRoot } from './types/OAS3';
import { OAS2Root } from './types/OAS2';

import { readFile } from './utils';

export const bundleToFile = async (fName, outputFile, force) => {
  const resolvedFileName = fName; // path.resolve(fName);
  const yamlText = readFile(resolvedFileName);
  let document;

  try {
    document = yaml.safeLoad(yamlText);
  } catch (ex) {
    throw new Error("Can't load yaml file");
  }

  if (!document.openapi) { return []; }

  const lintConfig = getLintConfig({});
  lintConfig.rules = {
    ...lintConfig.rules,
    bundler: {
      ...(lintConfig.rules && typeof lintConfig.rules.bundler === 'object' ? lintConfig.rules.bundler : null),
      output: outputFile,
      ignoreErrors: force,
    },
  };

  const ctx = createContext(document, yamlText, resolvedFileName, lintConfig);

  const rootNode = ctx.openapiVersion === 3 ? OpenAPIRoot : OAS2Root;
  await traverseNode(document, rootNode, ctx);
  return ctx.result;
};

export const bundle = async (fName, force, options) => {
  const resolvedFileName = fName; // path.resolve(fName);
  const yamlText = readFile(resolvedFileName);
  let document;

  try {
    document = yaml.safeLoad(yamlText);
  } catch (ex) {
    throw new Error("Can't load yaml file");
  }

  if (!document.openapi) { return []; }

  const config = getLintConfig(options);
  config.rules = {
    ...config.rules,
    bundler: {
      ...(config.rules && typeof config.rules.bundler === 'object' ? config.rules.bundler : null),
      outputObject: true,
      ignoreErrors: force,
    },
  };

  const ctx = createContext(document, yamlText, resolvedFileName, config);

  await traverseNode(document, OpenAPIRoot, ctx);

  return { bundle: ctx.bundlingResult, result: ctx.result, fileDependencies: ctx.fileDependencies };
};

export default bundleToFile;

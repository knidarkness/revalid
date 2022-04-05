import * as fs from 'fs';
import * as path from 'path';
import { RedoclyClient } from '../redocly';
import { isNotString, isString, loadYaml, parseYaml } from '../utils';
import { Config, DOMAINS, Region, transformConfig } from './config';
import { defaultPlugin } from './builtIn';
import { BaseResolver } from '../resolve';
import { isAbsoluteUrl } from '../ref-utils';

import type { ResolvedLintRawConfig, LintRawConfig, RawConfig } from './config';

export async function loadConfig(
  configPath: string | undefined = findConfig(),
  customExtends?: string[],
): Promise<Config> {
  const rawConfig = await getConfig(configPath);

  if (customExtends !== undefined) {
    rawConfig.lint = rawConfig.lint || {};
    rawConfig.lint.extends = customExtends;
  }

  if (rawConfig.lint?.extends) {
    rawConfig.lint = await resolveExtends(rawConfig?.lint);
  }

  const redoclyClient = new RedoclyClient();
  const tokens = await redoclyClient.getTokens();

  if (tokens.length) {
    if (!rawConfig.resolve) rawConfig.resolve = {};
    if (!rawConfig.resolve.http) rawConfig.resolve.http = {};
    rawConfig.resolve.http.headers = [...(rawConfig.resolve.http.headers ?? [])];

    for (const item of tokens) {
      const domain = DOMAINS[item.region as Region];
      rawConfig.resolve.http.headers.push({
        matches: `https://api.${domain}/registry/**`,
        name: 'Authorization',
        envVariable: undefined,
        value: item.token,
      },
      //support redocly.com domain for future compatibility
      ...(item.region === 'us' ? [{
        matches: `https://api.redoc.ly/registry/**`,
        name: 'Authorization',
        envVariable: undefined,
        value: item.token,
      }] : []));
    }
  }
  return new Config(
    {
      ...rawConfig,
      lint: {
        ...rawConfig?.lint,
        plugins: [...(rawConfig?.lint?.plugins || []), defaultPlugin], // inject default plugin
      },
    },
    configPath,
  );
}

export const CONFIG_FILE_NAMES = ['redocly.yaml', 'redocly.yml', '.redocly.yaml', '.redocly.yml'];

export function findConfig(dir?: string): string | undefined {
  if (!fs.hasOwnProperty('existsSync')) return;
  const existingConfigFiles = CONFIG_FILE_NAMES
    .map(name => dir ? path.resolve(dir, name) : name)
    .filter(fs.existsSync);
  if (existingConfigFiles.length > 1) {
    throw new Error(`
      Multiple configuration files are not allowed. 
      Found the following files: ${existingConfigFiles.join(', ')}. 
      Please use 'redocly.yaml' instead.
    `);
  }
  return existingConfigFiles[0];
}

export async function getConfig(configPath: string | undefined = findConfig()) {
  if (!configPath) return {};
  try {
    const rawConfig = ((await loadYaml(configPath)) || {}) as RawConfig;
    return transformConfig(rawConfig);
  } catch (e) {
    throw new Error(`Error parsing config file at '${configPath}': ${e.message}`);
  }
}

function getRawConfigWithMergedContentByPriority(lintConfig: ResolvedLintRawConfig): LintRawConfig {
  const extendedContent = (
    lintConfig.extends?.filter(isNotString) as LintRawConfig[]
  ).reduce<LintRawConfig>(
    (acc, { rules, preprocessors, decorators }) => ({
      rules: { ...acc.rules, ...rules },
      preprocessors: { ...acc.preprocessors, ...preprocessors },
      decorators: { ...acc.decorators, ...decorators },
    }),
    {}
  );

  return {
    ...lintConfig,
    plugins: lintConfig.plugins,
    extends: lintConfig.extends?.filter(isString) as string[], // TODO: think about unique default rules/plugins group; also perf.
    rules: { ...extendedContent.rules, ...lintConfig.rules },
    preprocessors: { ...extendedContent.preprocessors, ...lintConfig.preprocessors },
    decorators: { ...extendedContent.decorators, ...lintConfig.decorators },
  };
}

async function resolveExtends(lintConfig: LintRawConfig): Promise<LintRawConfig> {
  if (!lintConfig.extends) return lintConfig;
  if (lintConfig.extends.some(isNotString)) {
    throw Error(`Error configuration format not detected in lint.extends`); // TODO: show correct errors
  }

  const lintExtends = await Promise.all(
    lintConfig.extends
      // .filter(isString)
      .map(async (item) =>
        isAbsoluteUrl(item) || fs.existsSync(item)
          ? loadExtendLintConfig(item).then(resolveExtends)
          : item
      )
  );
  // TODO: check perf. - if lintExtends contains only strings, we can simply return lintConfig
  return getRawConfigWithMergedContentByPriority({ ...lintConfig, extends: lintExtends }); 
}

async function loadExtendLintConfig(filePath: string): Promise<LintRawConfig> {
  // TODO: should test urls and handle errors
  const fileSource = await new BaseResolver().loadExternalRef(filePath);
  return (parseYaml(fileSource.body) as RawConfig).lint || {};
}

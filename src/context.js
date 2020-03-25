/* eslint-disable no-param-reassign */
import path from 'path';

import loadRuleset, { loadRulesetExtension } from './loader';
import isRuleEnabled from './visitors/utils';
import { loadDefinitions } from './resolveDefinition';
import { messageHelpers } from './error';
import { resolveNodeNoSideEffects } from './resolver';

const validateFieldsRaw = (node, ctx, config, ruleName, validators) => {
  const result = [];

  const vals = Object.keys(validators);
  for (let i = 0; i < vals.length; i += 1) {
    if (isRuleEnabled(config, vals[i])) {
      if (validators[vals[i]]) {
        ctx.path.push(vals[i]);
        const validate = validators[vals[i]].bind({ rule: ruleName, config });
        const res = validate(node, ctx, config);
        if (res) {
          if (Array.isArray(res)) result.push(...res);
          else result.push(res);
        }
        ctx.path.pop();
      }
    }
  }
  return result;
};

const getRule = (ctx, ruleName) => {
  const result = ctx.allRules.filter((r) => r.constructor.rule === ruleName);
  return result ? result[0] : null;
};

function createContext(node, sourceFile, filePath, config, redoclyClient) {
  const [enabledRules, allRules] = loadRuleset(config);
  config.headers = config.headers || [];
  config.headers = [...(config.headers || []), {
    regexp: `https://api.${process.env.REDOCLY_DOMAIN || 'redoc.ly'}/registry.*`,
    name: 'Authorization',
    value: process.env.REDOCLY_AUTHORIZATION || (redoclyClient && redoclyClient.getAuthorizationHeader()),
  }];

  config.headers = config.headers.map((header) => ({ ...header, regexp: new RegExp(header.regexp) }));

  return {
    document: node,
    filePath: path.resolve(filePath),
    path: [],
    cache: {},
    visited: [],
    result: [],
    dependencies: [],
    definitionStack: [],
    definitions: loadDefinitions(config),
    pathStack: [],
    source: sourceFile,
    enableCodeframe: !!(config && (config.codeframes === 'on' || config.codeframes === true)),
    customRules: [
      ...loadRulesetExtension(config, 'transformingVisitors'),
      ...enabledRules, ...loadRulesetExtension(config, 'rulesExtensions'),
    ],
    allRules,
    config,
    headers: config.headers,
    messageHelpers,
    redoclyClient,
    validateFieldsRaw,
    getRule,
    resolveNode: resolveNodeNoSideEffects,

    fileDependencies: new Set(),

    resolveCache: {},
  };
}

export default createContext;

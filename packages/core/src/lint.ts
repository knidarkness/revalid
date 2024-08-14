import { rootRedoclyConfigSchema } from '@redocly/config';
import { BaseResolver, resolveDocument, makeDocumentFromString } from './resolve.js';
import { normalizeVisitors } from './visitors.js';
import { walkDocument } from './walk.js';
import { initRules } from './config/index.js';
import { normalizeTypes } from './types/index.js';
import { releaseAjvInstance } from './rules/ajv.js';
import { SpecVersion, getMajorSpecVersion, detectSpec, getTypes } from './oas-types.js';
import { createConfigTypes } from './types/redocly-yaml.js';
import { Spec } from './rules/common/spec.js';
import { NoUnresolvedRefs } from './rules/no-unresolved-refs.js';

import type { StyleguideConfig, Config } from './config/index.js';
import type { Document, ResolvedRefMap } from './resolve.js';
import type { ProblemSeverity, WalkContext } from './walk.js';
import type { NodeType } from './types/index.js';
import type {
  ArazzoVisitor,
  Async2Visitor,
  Async3Visitor,
  NestedVisitObject,
  Oas2Visitor,
  Oas3Visitor,
  RuleInstanceConfig,
} from './visitors.js';
import type { CollectFn } from './utils.js';

export async function lint(opts: {
  ref: string;
  config: Config;
  externalRefResolver?: BaseResolver;
  collectSpecData?: CollectFn;
}) {
  const { ref, externalRefResolver = new BaseResolver(opts.config.resolve) } = opts;
  const document = (await externalRefResolver.resolveDocument(null, ref, true)) as Document;
  opts.collectSpecData?.(document.parsed);

  return lintDocument({
    document,
    ...opts,
    externalRefResolver,
    config: opts.config.styleguide,
  });
}

export async function lintFromString(opts: {
  source: string;
  absoluteRef?: string;
  config: Config;
  externalRefResolver?: BaseResolver;
}) {
  const { source, absoluteRef, externalRefResolver = new BaseResolver(opts.config.resolve) } = opts;
  const document = makeDocumentFromString(source, absoluteRef || '/');

  return lintDocument({
    document,
    ...opts,
    externalRefResolver,
    config: opts.config.styleguide,
  });
}

export async function lintDocument(opts: {
  document: Document;
  config: StyleguideConfig;
  customTypes?: Record<string, NodeType>;
  externalRefResolver: BaseResolver;
}) {
  releaseAjvInstance(); // FIXME: preprocessors can modify nodes which are then cached to ajv-instance by absolute path

  const { document, customTypes, externalRefResolver, config } = opts;
  const specVersion = detectSpec(document.parsed);
  const specMajorVersion = getMajorSpecVersion(specVersion);
  const rules = config.getRulesForOasVersion(specMajorVersion);
  const types = normalizeTypes(
    config.extendTypes(customTypes ?? getTypes(specVersion), specVersion),
    config
  );

  const ctx: WalkContext = {
    problems: [],
    oasVersion: specVersion,
    visitorsData: {},
  };

  const preprocessors = initRules(rules, config, 'preprocessors', specVersion);
  const regularRules = initRules(rules, config, 'rules', specVersion);

  let resolvedRefMap = await resolveDocument({
    rootDocument: document,
    rootType: types.Root,
    externalRefResolver,
  });

  if (preprocessors.length > 0) {
    // Make additional pass to resolve refs defined in preprocessors.
    walkDocument({
      document,
      rootType: types.Root,
      normalizedVisitors: normalizeVisitors(preprocessors, types),
      resolvedRefMap,
      ctx,
    });
    resolvedRefMap = await resolveDocument({
      rootDocument: document,
      rootType: types.Root,
      externalRefResolver,
    });
  }

  const normalizedVisitors = normalizeVisitors(regularRules, types);

  walkDocument({
    document,
    rootType: types.Root,
    normalizedVisitors,
    resolvedRefMap,
    ctx,
  });
  return ctx.problems.map((problem) => config.addProblemToIgnore(problem));
}

export async function lintConfig(opts: {
  document: Document;
  config: Config;
  resolvedRefMap?: ResolvedRefMap;
  severity?: ProblemSeverity;
  externalRefResolver?: BaseResolver;
  externalConfigTypes?: Record<string, NodeType>;
}) {
  const { document, severity, externalRefResolver = new BaseResolver(), config } = opts;

  const ctx: WalkContext = {
    problems: [],
    oasVersion: SpecVersion.OAS3_0,
    visitorsData: {},
  };

  const types = normalizeTypes(
    opts.externalConfigTypes || createConfigTypes(rootRedoclyConfigSchema, config),
    { doNotResolveExamples: config.styleguide.doNotResolveExamples }
  );

  const rules: (RuleInstanceConfig & {
    visitor: NestedVisitObject<
      unknown,
      | Oas3Visitor
      | Oas3Visitor[]
      | Oas2Visitor
      | Oas2Visitor[]
      | Async2Visitor
      | Async2Visitor[]
      | Async3Visitor
      | Async3Visitor[]
      | ArazzoVisitor
      | ArazzoVisitor[]
    >;
  })[] = [
    {
      severity: severity || 'error',
      ruleId: 'configuration spec',
      visitor: Spec({ severity: 'error' }),
    },
    {
      severity: severity || 'error',
      ruleId: 'configuration no-unresolved-refs',
      visitor: NoUnresolvedRefs({ severity: 'error' }),
    },
  ];
  const normalizedVisitors = normalizeVisitors(rules, types);
  const resolvedRefMap =
    opts.resolvedRefMap ||
    (await resolveDocument({
      rootDocument: document,
      rootType: types.ConfigRoot,
      externalRefResolver,
    }));
  walkDocument({
    document,
    rootType: types.ConfigRoot,
    normalizedVisitors,
    resolvedRefMap,
    ctx,
  });

  return ctx.problems;
}

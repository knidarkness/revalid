import { bgRed, red } from 'colorette';
import { runTestFile } from '../modules/flow-runner';
import {
  displayErrors,
  displaySummary,
  displayFilesSummaryTable,
  calculateTotals,
} from '../modules/cli-output';
import { DefaultLogger } from '../utils/logger/logger';

import type { Config, RuleSeverity } from '@redocly/openapi-core';
import type { CollectFn } from '@redocly/openapi-core/src/utils';
import type { RunArgv } from '../types';

export type CommandArgs<T> = {
  argv: T;
  config: Config;
  version: string;
  collectSpecData?: CollectFn;
};

export type RespectOptions = {
  files: string[];
  input?: string;
  server?: string;
  workflow?: string[];
  skip?: string[];
  verbose?: boolean;
  'har-output'?: string;
  'json-output'?: string;
  residency?: string;
  'client-cert'?: string;
  'client-key'?: string;
  'ca-cert'?: string;
  severity?: string;
  config?: string;
  'lint-config'?: RuleSeverity;
};

const logger = DefaultLogger.getInstance();
export async function handleRun({ argv, collectSpecData }: CommandArgs<RespectOptions>) {
  const harOutputFile = argv['har-output'];
  if (harOutputFile && !harOutputFile.endsWith('.har')) {
    exitWithError('File for HAR logs should be in .har format');
  }

  const jsonOutputFile = argv['json-output'];
  if (jsonOutputFile && !jsonOutputFile.endsWith('.json')) {
    exitWithError('File for JSON logs should be in .json format');
  }

  const { skip, workflow } = argv;

  if (skip && workflow) {
    logger.printNewLine();
    logger.log(red(`Cannot use both --skip and --workflow flags at the same time.`));
    return;
  }

  const startedAt = performance.now();
  const testsRunProblemsStatus: boolean[] = [];
  const { files } = argv;
  const runAllFilesResult = [];

  if (files.length > 1 && (jsonOutputFile || harOutputFile)) {
    // TODO: implement multiple run files logs output
    exitWithError(
      'Currently only a single file can be run with --har-output or --json-output. Please run a single file at a time.'
    );
  }

  for (const path of files) {
    const result = await runFile(
      { ...argv, file: path },
      startedAt,
      {
        harFile: harOutputFile,
        jsonFile: jsonOutputFile,
      },
      collectSpecData
    );
    testsRunProblemsStatus.push(result.hasProblems);
    runAllFilesResult.push(result);
  }

  logger.printNewLine();
  displayFilesSummaryTable(runAllFilesResult);
  logger.printNewLine();

  if (testsRunProblemsStatus.some((problems) => problems)) {
    exitWithError(' Tests exited with error ');
  }
}

async function runFile(
  argv: RunArgv,
  startedAt: number,
  output: { harFile: string | undefined; jsonFile: string | undefined },
  collectSpecData?: CollectFn
) {
  const { workflows } = await runTestFile(argv, output, collectSpecData);

  const totals = calculateTotals(workflows);
  const hasProblems = totals.workflows.failed > 0;

  if (totals.steps.failed > 0 || totals.steps.warnings > 0 || totals.steps.skipped > 0) {
    displayErrors(workflows);
  }

  displaySummary(startedAt, workflows, argv);

  return { hasProblems, file: argv.file, workflows, argv };
}

const exitWithError = (message: string) => {
  logger.error(bgRed(message));
  logger.printNewLine();
  throw new Error(message);
};

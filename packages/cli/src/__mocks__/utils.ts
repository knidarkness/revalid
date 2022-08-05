export const getFallbackEntryPointsOrExit = jest.fn((entrypoints) =>
  entrypoints.map(() => ({ path: '' }))
);
export const dumpBundle = jest.fn(() => '');
export const slash = jest.fn();
export const pluralize = jest.fn();
export const getExecutionTime = jest.fn();
export const printExecutionTime = jest.fn();
export const printUnusedWarnings = jest.fn();
export const printLintTotals = jest.fn();
export const getOutputFileName = jest.fn(() => ({ outputFile: 'test.yaml', ext: 'yaml' }));
export const handleError = jest.fn();
export const exitWithError = jest.fn();

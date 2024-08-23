import fs from 'node:fs';

const content = fs.readFileSync('benchmark_check.json', 'utf8');
const json = JSON.parse(content);
const arr = json.results.map((r) => [
  r.command.replace(/^node node_modules\/([^/]+)\/.*/, (_, cliVersion) => cliVersion),
  r.mean,
]);
const min = Math.min(...arr.map(([_, mean]) => mean));
const max = Math.max(...arr.map(([_, mean]) => mean));

const constructBarForChart = (x) => {
  const MAX_BAR_LENGTH = 30;
  const length = Math.floor(x * MAX_BAR_LENGTH);
  return '▓' + '▓'.repeat(length) + ' '.repeat(MAX_BAR_LENGTH - length);
};

const bars = arr.map(
  ([cliVersion, mean]) => `| ${cliVersion} | ${constructBarForChart((mean - min) / (max - min))} |`
);

const output = [
  '| CLI Version | Performance benchmark (test duration) |',
  '|---|---|',
  ...bars,
].join('\n');

process.stdout.write(output);

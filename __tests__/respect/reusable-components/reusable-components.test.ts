import { getParams, getCommandOutput } from '../utils';
import { join } from 'path';

it('should use inputs from CLI and env to mapp with resolved refs', () => {
  process.env.AUTH_TOKEN = 'Basic Og==';

  const indexEntryPoint = join(process.cwd(), 'packages/cli/lib/index.js');
  const fixturesPath = join(__dirname, 'reusable-components.yaml');
  const args = getParams(indexEntryPoint, [
    'respect',
    fixturesPath,
    '--verbose',
    '--input',
    '{"store_id":"42","my_pet_tags":["one","two"]}',
    '--input',
    'reusable-test="123"',
  ]);

  const result = getCommandOutput(args);

  expect(result).toMatchSnapshot();
  delete process.env.AUTH_TOKEN;
});

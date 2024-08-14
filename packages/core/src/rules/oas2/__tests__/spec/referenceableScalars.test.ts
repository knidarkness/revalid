import { outdent } from 'outdent';
import {
  parseYamlToDocument,
  replaceSourceWithRef,
  makeConfig,
} from '../../../../../__tests__/utils.js';
import { lintDocument } from '../../../../lint.js';
import { BaseResolver } from '../../../../resolve.js';

describe('Referenceable scalars', () => {
  it('should not report $ref description', async () => {
    const document = parseYamlToDocument(
      outdent`
        swagger: '2.0'
        info:
          title: Test
          version: '1.0'
          description:
            $ref: fixtures/description.md
        paths: {}
      `,
      __dirname + '/foobar.yaml'
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: await makeConfig({
        spec: 'error',
      }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`[]`);
  });
});

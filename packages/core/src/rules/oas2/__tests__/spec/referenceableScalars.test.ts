import { outdent } from 'outdent';
import { parseYamlToDocument, replaceSourceWithRef } from '../../../../../__tests__/utils';
import { lintDocument } from '../../../../lint';
import { BaseResolver } from '../../../../resolve';
import { makeConfig } from '../../../__tests__/config';

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
      __dirname + '/foobar.yaml',
    );

    const results = await lintDocument({
      externalRefResolver: new BaseResolver(),
      document,
      config: makeConfig({
        spec: 'error',
      }),
    });

    expect(replaceSourceWithRef(results)).toMatchInlineSnapshot(`Array []`);
  });
});

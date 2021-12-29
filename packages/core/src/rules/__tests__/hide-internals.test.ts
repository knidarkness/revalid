import { outdent } from 'outdent';
import { bundleDocument } from '../../bundle'
import { BaseResolver } from '../../resolve';
import { parseYamlToDocument, yamlSerializer } from '../../../__tests__/utils';
import { makeConfig } from './config';

describe('oas3 hide-internals', () => {
  expect.addSnapshotSerializer(yamlSerializer);
	const testDocument = parseYamlToDocument(
		outdent`
			openapi: 3.0.0
			paths:
        /pet:
          hideit: true
          get:
            parameters:
              - $ref: '#/components/parameters/x'
			components:
        parameters:
          x:
            name: x
		`);

  it('should use `tagToHide` option to remove internal paths', async () => {
    const { bundle: res } = await bundleDocument({
      document: testDocument,
      externalRefResolver: new BaseResolver(),
      config: makeConfig({}, { 'hide-internals': { 'tagToHide': 'hideit' } })
    });
    expect(res.parsed).toMatchInlineSnapshot(
    `
    openapi: 3.0.0
    components:
      parameters:
        x:
          name: x

    `);
  });

  it('should clean unused components', async () => {
    const { bundle: res } = await bundleDocument({
      document: testDocument,
      externalRefResolver: new BaseResolver(),
      config: makeConfig({}, {
        'hide-internals': { 'tagToHide': 'hideit' },
        'clear-unused-components': 'on'
      })
    });
    expect(res.parsed).toMatchInlineSnapshot(
    `
    openapi: 3.0.0

    `
    );
  });

  it('should clean types: Server, Operation, Parameter, PathItem, Example', async () => {
    const testDoc = parseYamlToDocument(
      outdent`
        openapi: 3.1.0
        servers:
          - url: //petstore.swagger.io/v2
            description: Default server
            x-internal: true
        paths:
          /pet:
            get:
              x-internal: true
              operationId: getPet
              parameters:
                - $ref: '#/components/parameters/x'
            put:
              parameters:
                - name: Accept-Language
                  x-internal: true
                  in: header
                  example: en-US
                  required: false
                - name: cookieParam
                  x-internal: true
                  in: cookie
                  description: Some cookie
                  required: true
          /admin:
            x-internal: true
            post:
              parameters:
                - $ref: '#/components/parameters/y'
          /store/order:
            post:
              operationId: placeOrder
              responses:
                '200':
                  description: successful operation
                  content:
                    application/json:
                      examples:
                        response:
                          x-internal: true
                          value: OK
        components:
          parameters:
            x:
              name: x
            y:
              name: y
      `);
      const { bundle: res } = await bundleDocument({
        document: testDoc,
        externalRefResolver: new BaseResolver(),
        config: makeConfig({}, { 'hide-internals': 'on' })
      });
      expect(res.parsed).toMatchInlineSnapshot(
      `
      openapi: 3.1.0
      paths:
        /store/order:
          post:
            operationId: placeOrder
            responses:
              '200':
                description: successful operation
      components:
        parameters:
          x:
            name: x
          'y':
            name: 'y'

      `
      );
  });
});

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E bundle no-duplicated-components 1`] = `
openapi: 3.1.0
paths:
  /path:
    get:
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/Test'
components:
  schemas:
    Test:
      type: object

[WARNING] "max-problems" option is deprecated and will be removed in the next major release. 

bundling ./openapi.yaml...
📦 Created a bundle for ./openapi.yaml at stdout <test>ms.

`;

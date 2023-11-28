// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E miscellaneous bundle should resolve $refs in preprocessors 1`] = `
openapi: 3.0.1
info:
  title: Test
  version: 1.0.0
servers:
  - url: http://redocly-example.com:8080
security: []
paths:
  /items:
    get:
      operationId: getItems
      summary: Items
      responses:
        '200':
          $ref: '#/components/responses/successful-request.response'
        '400':
          $ref: '#/components/responses/bad-request-error.response'
  /status:
    get:
      operationId: getStatus
      summary: Status
      responses:
        '200':
          $ref: '#/components/responses/successful-request.response'
        '400':
          $ref: '#/components/responses/bad-request-error.response'
components:
  responses:
    successful-request.response:
      description: Success
      content:
        application/json:
          schema:
            type: array
            items:
              type: string
    bad-request-error.response:
      description: Failure
      content:
        application/json+problem:
          schema:
            $ref: '#/components/schemas/error-schema'
  schemas:
    error-schema:
      type: object
      properties:
        message:
          type: string
        error_code:
          type: number

[WARNING] "lint" option is deprecated and will be removed in the next major release. 

[WARNING] "max-problems" option is deprecated and will be removed in the next major release. 

[1] openapi.yaml:4:1 at #/info

Info object should contain \`license\` field.

2 | servers:
3 |   - url: http://redocly-example.com:8080
4 | info:
  | ^^^^
5 |   title: Test
6 |   version: 1.0.0

Warning was generated by the info-license rule.


Woohoo! Your API descriptions are valid. 🎉
You have 1 warning.

bundling openapi.yaml...
📦 Created a bundle for openapi.yaml at stdout <test>ms.

`;

exports[`E2E miscellaneous lint should resolve $refs in preprocessors 1`] = `

validating openapi.yaml...
[1] openapi.yaml:4:1 at #/info

Info object should contain \`license\` field.

2 | servers:
3 |   - url: http://redocly-example.com:8080
4 | info:
  | ^^^^
5 |   title: Test
6 |   version: 1.0.0

Warning was generated by the info-license rule.


openapi.yaml: validated in <test>ms

Woohoo! Your API description is valid. 🎉
You have 1 warning.


`;

exports[`E2E miscellaneous stat should print the correct summary with $refs in preprocessors 1`] = `

Document: openapi.yaml stats:

🚗 References: 3 
📦 External Documents: 0 
📈 Schemas: 1 
👉 Parameters: 0 
🔗 Links: 0 
➡️  Path Items: 2 
👷 Operations: 2 
🔖 Tags: 0 

openapi.yaml: stats processed in <test>ms


`;

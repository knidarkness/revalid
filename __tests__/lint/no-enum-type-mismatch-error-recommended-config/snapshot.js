// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint no-enum-type-mismatch-error-recommended-config 1`] = `

The apiDefinitions field is deprecated. Use apis instead. Read more about this change: https://redocly.com/docs/api-registry/guides/migration-guide-config-file/#changed-properties
validating /openapi.yaml...
[1] openapi.yaml:1:1 at #/openapi

Servers must be present.

1 | openapi: 3.0.0
  | ^^^^^^^
2 | info:
3 |   title: Petstore API

Error was generated by the no-empty-servers rule.


[2] openapi.yaml:11:5 at #/paths/~1v1~1pets~1{petId}/get/summary

Operation object should contain \`summary\` field.

 9 |
10 | /v1/pets/{petId}:
11 |   get:
   |   ^^^
12 |     operationId: getPet
13 |     parameters:

Error was generated by the operation-summary rule.


[3] openapi.yaml:47:17 at #/components/schemas/Pet/properties/status/enum

Expected type \`array\` but got \`string\`.

45 | status:
46 |   type: string
47 |   enum: string
   |         ^^^^^^

Error was generated by the spec rule.


[4] openapi.yaml:2:1 at #/info

Info object should contain \`license\` field.

1 | openapi: 3.0.0
2 | info:
  | ^^^^
3 |   title: Petstore API
4 |   version: 1.0.0

Warning was generated by the info-license rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 3 errors and 1 warning.
run \`openapi lint --generate-ignore-file\` to add all problems to the ignore file.


`;

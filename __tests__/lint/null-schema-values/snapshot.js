// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint null-schema-values 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:2:1 at #/info

Expected type \`Info\` (object) but got \`null\`

1 | openapi: 3.0.0
2 | info: 
  | ^^^^^
3 | paths:
4 |   /test:

Error was generated by the spec rule.


[2] openapi.yaml:15:5 at #/components/schemas/EmptySchema

Expected type \`Schema\` (object) but got \`null\`

13 | components:
14 |   schemas:
15 |     EmptySchema:
   |     ^^^^^^^^^^^^
16 |

referenced from openapi.yaml:12:17 at #/paths/~1test/get/responses/200/content/application~1json/schema 

Error was generated by the spec rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 2 errors.
run \`openapi lint --generate-ignore-file\` to add all problems to the ignore file.


`;

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint no-invalid-media-type-examples-invalid-schema 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:16:17 at #/components/schemas/Test/nullable

The \`type\` field must be defined when the \`nullable\` field is used.

14 |   schemas:
15 |     Test:
16 |       nullable: true
   |                 ^^^^
17 | paths:
18 |   "/test":

Error was generated by the spec rule.


[2] openapi.yaml:28:17 at #/paths/~1test/get/responses/202/content/application~1json/schema

Example validation errored: "nullable" cannot be used without "type".

26 |     application/json:
27 |       schema:
28 |         $ref: "#/components/schemas/Test"
   |         ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
29 |       example: {}
30 | '400':

referenced from openapi.yaml:27:15 at #/paths/~1test/get/responses/202/content/application~1json 

Warning was generated by the no-invalid-media-type-examples rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 1 error and 1 warning.
run \`openapi lint --generate-ignore-file\` to add all problems to the ignore file.


`;

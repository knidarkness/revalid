// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint example-schema-string-number-error 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:30:28 at #/paths/~1my_post/post/requestBody/content/application~1json/schema/properties/prop_string/example

Expected type \`string\` but got \`number\`.

28 | prop_string:
29 |   type: string
30 |   example: 56
   |            ^^
31 | prop_number:
32 |   type: number

Error was generated by the schema-example rule.


[2] openapi.yaml:33:28 at #/paths/~1my_post/post/requestBody/content/application~1json/schema/properties/prop_number/example

Expected type \`number\` but got \`string\`.

31 | prop_number:
32 |   type: number
33 |   example: test
   |            ^^^^
34 | prop_integer:
35 |   type: integer

Error was generated by the schema-example rule.


[3] openapi.yaml:36:28 at #/paths/~1my_post/post/requestBody/content/application~1json/schema/properties/prop_integer/example

Expected type \`integer\` but got \`number\`.

34 |           prop_integer:
35 |             type: integer
36 |             example: 5.34
   |                      ^^^^
37 |
38 | responses:

Error was generated by the schema-example rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 3 errors.
run with \`--generate-ignore-file\` to add all problems to ignore file.


`;

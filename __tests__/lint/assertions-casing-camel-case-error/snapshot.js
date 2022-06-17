// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint assertions-casing-camel-case-error 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:19:20 at #/paths/~1pet~1findByStatus/get/operationId/GetExampleId

Operation id for get operation should be camelCase

17 | /pet/findByStatus:
18 |   get:
19 |     operationId: GetExampleId
   |                  ^^^^^^^^^^^^
20 |     summary: summary example
21 |     tags:

Error was generated by the operation-get assertion rule.


[2] openapi.yaml:19:20 at #/paths/~1pet~1findByStatus/get/operationId/GetExampleId

Operation id should be camelCase

17 | /pet/findByStatus:
18 |   get:
19 |     operationId: GetExampleId
   |                  ^^^^^^^^^^^^
20 |     summary: summary example
21 |     tags:

Error was generated by the operation-id-camel-case assertion rule.


[3] openapi.yaml:31:20 at #/paths/~1pet~1findByStatus/post/operationId/PostExampleId

Operation id should be camelCase

29 |       description: example description
30 | post:
31 |   operationId: PostExampleId
   |                ^^^^^^^^^^^^^
32 |   summary: summary example
33 |   responses:

Error was generated by the operation-id-camel-case assertion rule.


[4] openapi.yaml:46:5 at #/components/parameters/Wrong_casE

Named Parameters should be camelCase

44 |   schema:
45 |     type: string
46 | Wrong_casE:
   | ^^^^^^^^^^
47 |   in: query
48 |   name: per_page

Error was generated by the camel-case-on-value assertion rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 4 errors.
run \`openapi lint --generate-ignore-file\` to add all problems to the ignore file.


`;

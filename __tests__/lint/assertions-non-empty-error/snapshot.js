// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint assertions-non-empty-error 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:20:7 at #/paths/~1pet~1findByStatus/get/summary

Operation summary should not be empty

18 | get:
19 |   operationId: example
20 |   summary:
   |   ^^^^^^^^
21 |   tags:
22 |     - foo

Error was generated by the rule/summary-non-empty rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 1 error.
run \`redocly lint --generate-ignore-file\` to add all problems to the ignore file.


`;

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint assertions-pattern-with-object 1`] = `

validating /openapi.yaml...
[1] openapi.yaml:29:34 at #/paths/~1pet~1findByStatus/get/responses/200/content/application~1json/schema/properties/id/description

rule/no-description-future-past failed because the any description didn't meet the assertions: "Will be use." should not match a regex /(was|will|were)/i

27 | properties:
28 |   id:
29 |     description: Will be use.
   |                  ^^^^^^^^^^^^
30 |     type: string
31 |   description:

Error was generated by the rule/no-description-future-past rule.


/openapi.yaml: validated in <test>ms

❌ Validation failed with 1 error.
run \`redocly lint --generate-ignore-file\` to add all problems to the ignore file.


`;

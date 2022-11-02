// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint deprecated-apiDefinitions 1`] = `

[1] .redocly.yaml:1:1 at #/apiDefinitions

Property \`apiDefinitions\` is not expected here.

1 | apiDefinitions:
  | ^^^^^^^^^^^^^^
2 |   main: ./openapi.yaml
3 | lint:

Warning was generated by the configuration spec rule.


[2] .redocly.yaml:3:1 at #/lint

Property \`lint\` is not expected here.

1 | apiDefinitions:
2 |   main: ./openapi.yaml
3 | lint:
  | ^^^^
4 |   rules:
5 |     info-contact: warn

Warning was generated by the configuration spec rule.


You have 2 warnings.
The 'apiDefinitions' field is deprecated. Use apis instead. Read more about this change: https://redocly.com/docs/api-registry/guides/migration-guide-config-file/#changed-properties
The 'lint' field is deprecated. Read more about this change: https://redocly.com/docs/api-registry/guides/migration-guide-config-file/#changed-properties
validating /openapi.yaml...
[1] openapi.yaml:2:1 at #/info/contact

Info object should contain \`contact\` field.

1 | openapi: 3.1.0
2 | info:
  | ^^^^
3 |   title: Example OpenAPI 3 definition.
4 |   version: 1.0

Warning was generated by the info-contact rule.


/openapi.yaml: validated in <test>ms

Woohoo! Your OpenAPI definition is valid. 🎉
You have 1 warning.


`;

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E bundle lint format bundle lint: no format parameter or empty value should be formatted as codeframe 1`] = `

[WARNING] "lint" option is deprecated and will be removed in a future release. 

[WARNING] "max-problems" option is deprecated and will be removed in a future release. 

[1] openapi.yaml:20:11 at #/paths/~1my_post/post/requestBody/content/application~1json

Expected type \`MediaType\` (object) but got \`null\`

18 | requestBody:
19 |   content:
20 |     application/json:
   |     ^^^^^^^^^^^^^^^^^
21 |

Error was generated by the spec rule.


❌ Validation failed with 1 error.
run \`redocly lint --generate-ignore-file\` to add all problems to the ignore file.

bundling ./openapi.yaml...
📦 Created a bundle for ./openapi.yaml at /tmp/null.yaml <test>ms.

`;

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E bundle tag-description-override-error 1`] = `

bundling ./main.yaml...
[1] main.yaml:17:5 at #/tags/0

Failed to read markdown override file for tag "pet".
ENOENT: no such file or directory, open './pet-tag-description.md'

15 |     email: email@redoc.ly
16 | tags:
17 |   - name: pet
   |     ^^^^^^^^^
18 |     description: Everything about your Pets
   |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
19 |   - name: store
20 |     description: Access to Petstore orders

Error was generated by the tag-description-override rule.


❌ Errors encountered while bundling ./main.yaml: bundle not created (use --force to ignore errors).

`;

// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`E2E lint-config test with option: { dirName: 'config-with-refs-extended', option: 'error' } 1`] = `


Property 'theme' is specific to Redoc v1 or Reference Docs and not supported by Redoc v2.

[1] .redocly.yaml:1:1 at #/unexpected-property

Property \`unexpected-property\` is not expected here.

1 | unexpected-property: Should fail
  | ^^^^^^^^^^^^^^^^^^^
2 |
3 | apis:

Error was generated by the configuration spec rule.


[2] .redocly.yaml:13:15 at #/organization

Expected type \`string\` but got \`boolean\`.

11 |     $ref: theme-openapi.yaml
12 |
13 | organization: false # wrong, expected string
   |               ^^^^^
14 |
15 | seo:

Error was generated by the configuration spec rule.


[3] seo.yaml:1:8 at #/title

Expected type \`string\` but got \`integer\`.

1 | title: 222 # wrong, expected string
  |        ^^^
2 |

referenced from .redocly.yaml:16:3 at #/seo 

Error was generated by the configuration spec rule.


[4] v1.yaml:1:7 at #/root

Expected type \`string\` but got \`boolean\`.

1 | root: true # wrong, expected string
  |       ^^^^
2 |

referenced from apis.yaml:2:3 at #/test@v1 

Error was generated by the configuration spec rule.


[5] rules.yaml:2:1 at #/wrong-rule

Property \`wrong-rule\` is not expected here.

1 | info-contact: error
2 | wrong-rule: warn
  | ^^^^^^^^^^
3 |

referenced from .redocly.yaml:7:3 at #/rules 

Error was generated by the configuration spec rule.


[6] theme-openapi.yaml:3:15 at #/theme/logo/maxWidth

Expected type \`string\` but got \`integer\`.

1 | theme:
2 |   logo:
3 |     maxWidth: 100
  |               ^^^
4 |

Error was generated by the configuration spec rule.


❌ Your config has 6 errors.


`;

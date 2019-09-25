// @ts-check
/** @typedef {'string'|'number'|'integer'|'boolean'|'null'|'object'|'array'} JSONSchemaType */

/* eslint-disable import/prefer-default-export */
const urlPattern = new RegExp('^(https?:\\/\\/)?' // protocol
+ '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
+ '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
+ '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
+ '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
+ '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

export const isUrl = (string) => urlPattern.test(string);
export const outputRed = (str) => `\u001b[31m${str}\u001b[39m`;
export const outputUnderline = (str) => `\u001b[4m${str}\u001b[24m`;
export const outputBgLightBlue = (str) => `[44m${str}[49m`;
export const outputLightBlue = (str) => `[94m${str}[39m`;
export const outputGrey = (str) => `[90m${str}[39m`;
export const outputBgRed = (str) => `\u001b[41m${str}\u001b[49m`;
export const getLineNumberFromId = (source, charId) => {
  let lineNum = 1;
  let posNum = 0;
  for (let i = 0; i < charId; i += 1) {
    if (source[i] === '\n') {
      lineNum += 1;
      posNum = charId - i;
    }
  }
  return {
    lineNum,
    posNum,
  };
};

/**
 * Checks if value matches specified JSON schema type
 *
 * @param {*} value - value to check
 * @param {JSONSchemaType} type - JSON Schema type
 * @returns string
 */
export function matchesJsonSchemaType(value, type) {
  switch (type) {
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    case 'null':
      return value === null;
    case 'integer':
      return Number.isInteger(value);
    default:
      // eslint-disable-next-line valid-typeof
      return typeof value === type;
  }
}

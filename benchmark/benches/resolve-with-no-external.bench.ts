import * as path from 'path';
import { readFileSync } from 'fs';

import { resolveDocument, BaseResolver } from '../../src/resolve';
import { parseYamlToDocument } from '../../src/__tests__/utils';
import { OAS3Types } from '../../src/types/oas3';
import { normalizeTypes } from "../../src/types";

export const name = 'Resolve with no external refs';
export const count = 10;

const rebillyDefinitionRef = path.resolve(path.join(__dirname, 'rebilly.yaml'));
const rebillyDocument = parseYamlToDocument(
  readFileSync(rebillyDefinitionRef, 'utf-8'),
  rebillyDefinitionRef,
);
const externalRefResolver = new BaseResolver();

export function measureAsync() {
  return resolveDocument({
    rootDocument: rebillyDocument,
    externalRefResolver,
    rootType: normalizeTypes(OAS3Types).DefinitionRoot,
  });
}

import fs from 'fs';
import yaml from 'js-yaml';
import { XMLHttpRequest } from 'xmlhttprequest';
import createError from './error';
import { isUrl } from './utils';

/**
 *
 * Here we go over each of the steps in the link and try to retreive the value
 * for it. If failed (e.g. because of undefined value) -- return null, to indicate that such
 * reference does not exist.
 *
 * @param {string} link A path in the yaml document which is to be resolved
 * @param {*} ctx JSON Object with the document field which represents the YAML structure
 */
const resolve = (link, ctx) => {
  const linkSplitted = link.split('#/');
  const [filePath, docPath] = linkSplitted;
  let fullFileName;

  let target;
  let fData;
  if (filePath) {
    const path = ctx.filePath.substring(0, Math.max(ctx.filePath.lastIndexOf('/'), ctx.filePath.lastIndexOf('\\')));
    fullFileName = path ? `${path}/${filePath}` : filePath;

    if (fs.existsSync(fullFileName)) {
      fData = fs.readFileSync(fullFileName, 'utf-8');
      target = yaml.safeLoad(fData);
    } else if (isUrl(filePath) && !fs.existsSync(fullFileName)) {
      try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', filePath, false);
        xhr.send();

        if (xhr.status !== 200) {
          return null;
        }

        target = yaml.safeLoad(xhr.responseText);
        fullFileName = filePath;
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  } else {
    target = ctx.document;
  }

  if (docPath) {
    const steps = docPath.split('/').filter((el) => el !== '');
    Object.keys(steps).forEach((step) => {
      target = target && steps[step] && target[steps[step]] ? target[steps[step]] : null;
    });
  }

  return {
    node: target,
    updatedSource: filePath ? fData : null,
    docPath: docPath ? docPath.split('/') : [],
    filePath: fullFileName || null,
  };
};

const resolveNode = (node, ctx) => {
  if (!node || typeof node !== 'object') return { node, nextPath: null };
  let nextPath;
  let resolved = {
    node,
  };
  Object.keys(node).forEach((p) => {
    if (p === '$ref') {
      resolved = resolve(node[p], ctx);
      if (resolved && resolved.node) {
        nextPath = resolved.docPath;
      } else {
        ctx.path.push('$ref');
        ctx.result.push(createError('Reference does not exist.', node, ctx, { fromRule: 'resolve-ref' }));
        ctx.path.pop();
        resolved = {};
        resolved.node = node;
        nextPath = null;
        resolved.updatedSource = null;
        resolved.filePath = null;
      }
    }
  });
  return {
    node: resolved.node,
    nextPath,
    updatedSource: resolved.updatedSource,
    filePath: resolved.filePath,
  };
};

export default resolveNode;

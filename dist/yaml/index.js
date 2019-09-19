"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.getCodeFrameForLocation = exports.getLocationByPath = void 0;

var _yamlAstParser = require("yaml-ast-parser");

var _utils = require("../utils");

const parseAST = ctx => {
  if (ctx.AST) return ctx.AST;
  ctx.AST = (0, _yamlAstParser.safeLoad)(ctx.source);
  return ctx.AST;
};

const getMappingChild = (mapping, childName) => {
  const mappings = mapping.value ? mapping.value.mappings : mapping.mappings;
  const target = mappings.filter(child => child.key.value === childName);
  return target ? target[0] : null;
};

const getSequenceElement = (seq, id) => seq.value ? seq.value.items[id] : seq.items[id];

const getNodeByPath = (tree, path, target = 'value') => {
  if (path.length === 0) return target === 'value' ? tree : tree.key;
  const nextKey = path.pop();
  let next;

  if (tree.value && tree.value.mappings || tree.mappings) {
    next = getMappingChild(tree, nextKey);
  } else if (tree.value && tree.value.items || tree.items) {
    next = getSequenceElement(tree, nextKey);
  }

  return getNodeByPath(next, path, target);
};

const getLocationByPath = (path, ctx, target) => {
  const AST = parseAST(ctx);
  const node = getNodeByPath(AST, path.reverse(), target); // console.log(node);

  const positionStart = (0, _utils.getLineNumberFromId)(ctx.source, node.startPosition);
  const endPosition = (0, _utils.getLineNumberFromId)(ctx.source, node.endPosition);
  return {
    startLine: positionStart.lineNum,
    startCol: positionStart.posNum,
    endLine: endPosition.lineNum,
    endCol: endPosition.posNum,
    startIndex: node.startPosition,
    endIndex: node.endPosition
  };
};

exports.getLocationByPath = getLocationByPath;

const getCodeFrameForLocation = (start, end, source, linesBefore = 3, linesAfter = 2) => {
  let frameStart = start;
  let frameEnd = end;
  let actualLinesBefore = -1;
  let actualLinesAfter = -1;

  while (actualLinesBefore !== linesBefore && frameStart !== 0) {
    if (source[frameStart] === '\n') actualLinesBefore += 1;
    frameStart -= 1;
  }

  while (actualLinesAfter !== linesAfter && frameEnd !== source.length) {
    if (source[frameEnd] === '\n') actualLinesAfter += 1;
    frameEnd += 1;
  }

  const codeFrame = source.substring(frameStart + 1, frameEnd + 1);
  const startOffset = start - frameStart;
  const endOffset = startOffset + end - start;
  return `${codeFrame.substring(0, startOffset - 1)}${(0, _utils.outputUnderline)((0, _utils.outputRed)(codeFrame.substring(startOffset - 1, endOffset)))}${codeFrame.substring(endOffset)}`;
};

exports.getCodeFrameForLocation = getCodeFrameForLocation;
var _default = getLocationByPath;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy95YW1sL2luZGV4LmpzIl0sIm5hbWVzIjpbInBhcnNlQVNUIiwiY3R4IiwiQVNUIiwic291cmNlIiwiZ2V0TWFwcGluZ0NoaWxkIiwibWFwcGluZyIsImNoaWxkTmFtZSIsIm1hcHBpbmdzIiwidmFsdWUiLCJ0YXJnZXQiLCJmaWx0ZXIiLCJjaGlsZCIsImtleSIsImdldFNlcXVlbmNlRWxlbWVudCIsInNlcSIsImlkIiwiaXRlbXMiLCJnZXROb2RlQnlQYXRoIiwidHJlZSIsInBhdGgiLCJsZW5ndGgiLCJuZXh0S2V5IiwicG9wIiwibmV4dCIsImdldExvY2F0aW9uQnlQYXRoIiwibm9kZSIsInJldmVyc2UiLCJwb3NpdGlvblN0YXJ0Iiwic3RhcnRQb3NpdGlvbiIsImVuZFBvc2l0aW9uIiwic3RhcnRMaW5lIiwibGluZU51bSIsInN0YXJ0Q29sIiwicG9zTnVtIiwiZW5kTGluZSIsImVuZENvbCIsInN0YXJ0SW5kZXgiLCJlbmRJbmRleCIsImdldENvZGVGcmFtZUZvckxvY2F0aW9uIiwic3RhcnQiLCJlbmQiLCJsaW5lc0JlZm9yZSIsImxpbmVzQWZ0ZXIiLCJmcmFtZVN0YXJ0IiwiZnJhbWVFbmQiLCJhY3R1YWxMaW5lc0JlZm9yZSIsImFjdHVhbExpbmVzQWZ0ZXIiLCJjb2RlRnJhbWUiLCJzdWJzdHJpbmciLCJzdGFydE9mZnNldCIsImVuZE9mZnNldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBOztBQUVBLE1BQU1BLFFBQVEsR0FBSUMsR0FBRCxJQUFTO0FBQ3hCLE1BQUlBLEdBQUcsQ0FBQ0MsR0FBUixFQUFhLE9BQU9ELEdBQUcsQ0FBQ0MsR0FBWDtBQUNiRCxFQUFBQSxHQUFHLENBQUNDLEdBQUosR0FBVSw2QkFBU0QsR0FBRyxDQUFDRSxNQUFiLENBQVY7QUFDQSxTQUFPRixHQUFHLENBQUNDLEdBQVg7QUFDRCxDQUpEOztBQU1BLE1BQU1FLGVBQWUsR0FBRyxDQUFDQyxPQUFELEVBQVVDLFNBQVYsS0FBd0I7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YWQgfSBmcm9tICd5YW1sLWFzdC1wYXJzZXInO1xuXG5pbXBvcnQgeyBvdXRwdXRSZWQsIG91dHB1dFVuZGVybGluZSwgZ2V0TGluZU51bWJlckZyb21JZCB9IGZyb20gJy4uL3V0aWxzJztcblxuY29uc3QgcGFyc2VBU1QgPSAoY3R4KSA9PiB7XG4gIGlmIChjdHguQVNUKSByZXR1cm4gY3R4LkFTVDtcbiAgY3R4LkFTVCA9IHNhZmVMb2FkKGN0eC5zb3VyY2UpO1xuICByZXR1cm4gY3R4LkFTVDtcbn07XG5cbmNvbnN0IGdldE1hcHBpbmdDaGlsZCA9IChtYXBwaW5nLCBjaGlsZE5hbWUpID0+IHtcbiAgY29uc3QgbWFwcGluZ3MgPSBtYXBwaW5nLnZhbHVlID8gbWFwcGluZy52YWx1ZS5tYXBwaW5ncyA6IG1hcHBpbmcubWFwcGluZ3M7XG4gIGNvbnN0IHRhcmdldCA9IG1hcHBpbmdzXG4gICAgLmZpbHRlcigoY2hpbGQpID0+IGNoaWxkLmtleS52YWx1ZSA9PT0gY2hpbGROYW1lKTtcbiAgcmV0dXJuIHRhcmdldCA/IHRhcmdldFswXSA6IG51bGw7XG59O1xuXG5jb25zdCBnZXRTZXF1ZW5jZUVsZW1lbnQgPSAoc2VxLCBpZCkgPT4gKHNlcS52YWx1ZSA/IHNlcS52YWx1ZS5pdGVtc1tpZF0gOiBzZXEuaXRlbXNbaWRdKTtcblxuY29uc3QgZ2V0Tm9kZUJ5UGF0aCA9ICh0cmVlLCBwYXRoLCB0YXJnZXQgPSAndmFsdWUnKSA9PiB7XG4gIGlmIChwYXRoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRhcmdldCA9PT0gJ3ZhbHVlJyA/IHRyZWUgOiB0cmVlLmtleTtcbiAgY29uc3QgbmV4dEtleSA9IHBhdGgucG9wKCk7XG4gIGxldCBuZXh0O1xuICBpZiAoKHRyZWUudmFsdWUgJiYgdHJlZS52YWx1ZS5tYXBwaW5ncykgfHwgdHJlZS5tYXBwaW5ncykge1xuICAgIG5leHQgPSBnZXRNYXBwaW5nQ2hpbGQodHJlZSwgbmV4dEtleSk7XG4gIH0gZWxzZSBpZiAoKHRyZWUudmFsdWUgJiYgdHJlZS52YWx1ZS5pdGVtcykgfHwgdHJlZS5pdGVtcykge1xuICAgIG5leHQgPSBnZXRTZXF1ZW5jZUVsZW1lbnQodHJlZSwgbmV4dEtleSk7XG4gIH1cbiAgcmV0dXJuIGdldE5vZGVCeVBhdGgobmV4dCwgcGF0aCwgdGFyZ2V0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRMb2NhdGlvbkJ5UGF0aCA9IChwYXRoLCBjdHgsIHRhcmdldCkgPT4ge1xuICBjb25zdCBBU1QgPSBwYXJzZUFTVChjdHgpO1xuICBjb25zdCBub2RlID0gZ2V0Tm9kZUJ5UGF0aChBU1QsIHBhdGgucmV2ZXJzZSgpLCB0YXJnZXQpO1xuICAvLyBjb25zb2xlLmxvZyhub2RlKTtcbiAgY29uc3QgcG9zaXRpb25TdGFydCA9IGdldExpbmVOdW1iZXJGcm9tSWQoY3R4LnNvdXJjZSwgbm9kZS5zdGFydFBvc2l0aW9uKTtcbiAgY29uc3QgZW5kUG9zaXRpb24gPSBnZXRMaW5lTnVtYmVyRnJvbUlkKGN0eC5zb3VyY2UsIG5vZGUuZW5kUG9zaXRpb24pO1xuICByZXR1cm4ge1xuICAgIHN0YXJ0TGluZTogcG9zaXRpb25TdGFydC5saW5lTnVtLFxuICAgIHN0YXJ0Q29sOiBwb3NpdGlvblN0YXJ0LnBvc051bSxcbiAgICBlbmRMaW5lOiBlbmRQb3NpdGlvbi5saW5lTnVtLFxuICAgIGVuZENvbDogZW5kUG9zaXRpb24ucG9zTnVtLFxuICAgIHN0YXJ0SW5kZXg6IG5vZGUuc3RhcnRQb3NpdGlvbixcbiAgICBlbmRJbmRleDogbm9kZS5lbmRQb3NpdGlvbixcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRDb2RlRnJhbWVGb3JMb2NhdGlvbiA9IChzdGFydCwgZW5kLCBzb3VyY2UsIGxpbmVzQmVmb3JlID0gMywgbGluZXNBZnRlciA9IDIpID0+IHtcbiAgbGV0IGZyYW1lU3RhcnQgPSBzdGFydDtcbiAgbGV0IGZyYW1lRW5kID0gZW5kO1xuICBsZXQgYWN0dWFsTGluZXNCZWZvcmUgPSAtMTtcbiAgbGV0IGFjdHVhbExpbmVzQWZ0ZXIgPSAtMTtcbiAgd2hpbGUgKGFjdHVhbExpbmVzQmVmb3JlICE9PSBsaW5lc0JlZm9yZSAmJiBmcmFtZVN0YXJ0ICE9PSAwKSB7XG4gICAgaWYgKHNvdXJjZVtmcmFtZVN0YXJ0XSA9PT0gJ1xcbicpIGFjdHVhbExpbmVzQmVmb3JlICs9IDE7XG4gICAgZnJhbWVTdGFydCAtPSAxO1xuICB9XG4gIHdoaWxlIChhY3R1YWxMaW5lc0FmdGVyICE9PSBsaW5lc0FmdGVyICYmIGZyYW1lRW5kICE9PSBzb3VyY2UubGVuZ3RoKSB7XG4gICAgaWYgKHNvdXJjZVtmcmFtZUVuZF0gPT09ICdcXG4nKSBhY3R1YWxMaW5lc0FmdGVyICs9IDE7XG4gICAgZnJhbWVFbmQgKz0gMTtcbiAgfVxuICBjb25zdCBjb2RlRnJhbWUgPSBzb3VyY2Uuc3Vic3RyaW5nKGZyYW1lU3RhcnQgKyAxLCBmcmFtZUVuZCArIDEpO1xuICBjb25zdCBzdGFydE9mZnNldCA9IHN0YXJ0IC0gZnJhbWVTdGFydDtcbiAgY29uc3QgZW5kT2Zmc2V0ID0gc3RhcnRPZmZzZXQgKyBlbmQgLSBzdGFydDtcbiAgcmV0dXJuIGAke2NvZGVGcmFtZS5zdWJzdHJpbmcoMCwgc3RhcnRPZmZzZXQgLSAxKX0ke291dHB1dFVuZGVybGluZShvdXRwdXRSZWQoY29kZUZyYW1lLnN1YnN0cmluZyhzdGFydE9mZnNldCAtIDEsIGVuZE9mZnNldCkpKX0ke2NvZGVGcmFtZS5zdWJzdHJpbmcoZW5kT2Zmc2V0KX1gO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2V0TG9jYXRpb25CeVBhdGg7XG4iXX0=
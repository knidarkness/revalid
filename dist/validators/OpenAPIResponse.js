"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenAPIResponseMap = exports.OpenAPIResponse = void 0;

var _error = _interopRequireDefault(require("../error"));

var _OpenAPIMediaObject = require("./OpenAPIMediaObject");

var _OpenAPIHeader = require("./OpenAPIHeader");

var _OpenAPILink = require("./OpenAPILink");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OpenAPIResponse = {
  validators: {
    description() {
      return (node, ctx) => !node.description ? (0, _error.default)('Description is required part of a Response definition.', node, ctx) : null;
    }

  },
  properties: {
    content: _OpenAPIMediaObject.OpenAPIMediaTypeObject,
    headers: _OpenAPIHeader.OpenAPIHeaderMap,
    links: _OpenAPILink.OpenAPILinkMap
  }
};
exports.OpenAPIResponse = OpenAPIResponse;
const OpenAPIResponseMap = {
  properties(node) {
    const props = {};
    Object.keys(node).forEach(k => {
      props[k] = OpenAPIResponse;
    });
    return props;
  }

};
exports.OpenAPIResponseMap = OpenAPIResponseMap;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy92YWxpZGF0b3JzL09wZW5BUElSZXNwb25zZS5qcyJdLCJuYW1lcyI6WyJPcGVuQVBJUmVzcG9uc2UiLCJ2YWxpZGF0b3JzIiwiZGVzY3JpcHRpb24iLCJub2RlIiwiY3R4IiwicHJvcGVydGllcyIsImNvbnRlbnQiLCJPcGVuQVBJTWVkaWFUeXBlT2JqZWN0IiwiaGVhZGVycyIsIk9wZW5BUElIZWFkZXJNYXAiLCJsaW5rcyIsIk9wZW5BUElMaW5rTWFwIiwiT3BlbkFQSVJlc3BvbnNlTWFwIiwicHJvcHMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7QUFDQTs7OztBQUVPLE1BQU1BLGVBQWUsR0FBRztBQUM3QkMsRUFBQUEsVUFBVSxFQUFFO0FBQ1ZDLElBQUFBLFdBQVcsR0FBRztBQUNaLGFBQU8sQ0FBQ0MsSUFBRCxFQUFPQyxHQUFQLEtBQWdCLENBQUNELElBQUksQ0FBQ0QsV0FBTixHQUFvQixvQkFBWSx3REFBWixFQUFzRUMsSUFBdEUsRUFBNEVDLEdBQTVFLENBQXBCLEdBQXVHLElBQTlIO0FBQ0Q7O0FBSFMsR0FEaUI7QUFNN0JDLEVBQUFBLFVBQVUsRUFBRTtBQUNWQyxJQUFBQSxPQUFPLEVBQUVDLDBDQURDO0FBRVZDLElBQUFBLE9BQU8sRUFBRUMsK0JBRkM7QUFHVkMsSUFBQUEsS0FBSyxFQUFFQztBQUhHO0FBTmlCLENBQXhCOztBQWFBLE1BQU1DLGtCQUFrQixHQUFHO0FBQ2hDUCxFQUFBQSxVQUFVLENBQUNGLElBQUQsRUFBTztBQUNmLFVBQU1VLEtBQUssR0FBRyxFQUFkO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZWixJQUFaLEVBQWtCYSxPQUFsQixDQUEyQkMsQ0FBRCxJQUFPO0FBQy9CSixNQUFBQSxLQUFLLENBQUNJLENBQUQsQ0FBTCxHQUFXakIsZUFBWDtBQUNELEtBRkQ7QUFHQSxXQUFPYSxLQUFQO0FBQ0Q7O0FBUCtCLENBQTNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNyZWF0ZUVycm9yIGZyb20gJy4uL2Vycm9yJztcblxuaW1wb3J0IHsgT3BlbkFQSU1lZGlhVHlwZU9iamVjdCB9IGZyb20gJy4vT3BlbkFQSU1lZGlhT2JqZWN0JztcbmltcG9ydCB7IE9wZW5BUElIZWFkZXJNYXAgfSBmcm9tICcuL09wZW5BUElIZWFkZXInO1xuaW1wb3J0IHsgT3BlbkFQSUxpbmtNYXAgfSBmcm9tICcuL09wZW5BUElMaW5rJztcblxuZXhwb3J0IGNvbnN0IE9wZW5BUElSZXNwb25zZSA9IHtcbiAgdmFsaWRhdG9yczoge1xuICAgIGRlc2NyaXB0aW9uKCkge1xuICAgICAgcmV0dXJuIChub2RlLCBjdHgpID0+ICghbm9kZS5kZXNjcmlwdGlvbiA/IGNyZWF0ZUVycm9yKCdEZXNjcmlwdGlvbiBpcyByZXF1aXJlZCBwYXJ0IG9mIGEgUmVzcG9uc2UgZGVmaW5pdGlvbi4nLCBub2RlLCBjdHgpIDogbnVsbCk7XG4gICAgfSxcbiAgfSxcbiAgcHJvcGVydGllczoge1xuICAgIGNvbnRlbnQ6IE9wZW5BUElNZWRpYVR5cGVPYmplY3QsXG4gICAgaGVhZGVyczogT3BlbkFQSUhlYWRlck1hcCxcbiAgICBsaW5rczogT3BlbkFQSUxpbmtNYXAsXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgT3BlbkFQSVJlc3BvbnNlTWFwID0ge1xuICBwcm9wZXJ0aWVzKG5vZGUpIHtcbiAgICBjb25zdCBwcm9wcyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKG5vZGUpLmZvckVhY2goKGspID0+IHtcbiAgICAgIHByb3BzW2tdID0gT3BlbkFQSVJlc3BvbnNlO1xuICAgIH0pO1xuICAgIHJldHVybiBwcm9wcztcbiAgfSxcbn07XG4iXX0=
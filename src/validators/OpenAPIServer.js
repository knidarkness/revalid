import createError from '../error';

const OpenAPIServerVariable = {
  validators: {
    default() {
      return (node, ctx) => {
        if (!node || !node.default) return createError('The default field is required for the Server Variable', node, ctx);
        if (typeof node.default !== 'string') return createError('default field of the Server Variable must be a string', node, ctx);
        return null;
      };
    },
    description() {
      return (node, ctx) => (node && node.description && typeof node.description !== 'string'
        ? createError('description field of the Server Variable object must be a string', node, ctx) : null);
    },
    enum() {
      return (node, ctx) => {
        if (node && node.enum) {
          if (!Array.isArray(node.enum)) return createError('Value of enum must be an array', node, ctx);
          if (node.type && node.enum.filter((item) => typeof item !== 'string').length !== 0) return createError('All values of "enum" field must be strings', node, ctx);
        }
        return null;
      };
    },
  },
};

const OpenAPIServerVariableMap = {
  properties(node) {
    const props = {};
    Object.keys(node).forEach((k) => {
      props[k] = OpenAPIServerVariable;
    });
    return props;
  },
};

const OpenAPIServer = {
  validators: {
    url() {
      return (node, ctx) => {
        if (!node || !node.url || typeof node.url !== 'string') return createError('url is required for a server object and must be a string', node, ctx);
        return null;
      };
    },
    description() {
      return (node, ctx) => (node && node.description && typeof node.description !== 'string'
        ? createError('description field of the Server object must be a string', node, ctx) : null);
    },
  },
  properties: {
    variables() {
      return OpenAPIServerVariableMap;
    },
  },
};

export default OpenAPIServer;

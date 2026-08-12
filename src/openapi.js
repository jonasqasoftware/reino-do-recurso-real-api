const schemas = {
  Error: {
    type: 'object',
    required: ['code', 'message'],
    properties: {
      code: { type: 'string', example: 'RESOURCE_NOT_FOUND' },
      message: { type: 'string', example: 'Scroll not found' },
    },
  },
};

const listResponse = (description) => ({
  description,
  content: {
    'application/json': {
      schema: { type: 'array', items: { type: 'object' } },
    },
  },
});

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'Reino do Recurso Real API',
    version: '2.0.0',
    description: 'A small REST API used as a risk-based API Quality Engineering case study.',
  },
  servers: [{ url: '/', description: 'Current environment' }],
  paths: {
    '/health': {
      get: {
        summary: 'Check service readiness',
        responses: {
          200: {
            description: 'Service is ready',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['status'],
                  properties: { status: { type: 'string', enum: ['ok'] } },
                },
              },
            },
          },
        },
      },
    },
    '/convocarMago': {
      get: { summary: 'List programming tips', responses: { 200: listResponse('Tips returned') } },
    },
    '/dominarEncantamento': {
      get: { summary: 'List data skills', responses: { 200: listResponse('Skills returned') } },
    },
    '/elixir': {
      get: { summary: 'List elixirs', responses: { 200: listResponse('Elixirs returned') } },
    },
    '/runas': {
      get: { summary: 'List runes', responses: { 200: listResponse('Runes returned') } },
    },
    '/examinarPergaminho/{id}': {
      get: {
        summary: 'Get a scroll collection by numeric identifier',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          200: {
            description: 'Scroll collection returned',
            content: {
              'application/json': {
                schema: { type: 'object', additionalProperties: { type: 'object' } },
              },
            },
          },
          400: {
            description: 'Identifier is not a positive integer',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          404: {
            description: 'Scroll was not found',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
  },
  components: { schemas },
};

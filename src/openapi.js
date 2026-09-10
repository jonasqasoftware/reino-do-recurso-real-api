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
    description:
      'Uma pequena API REST usada como estudo de caso de Quality Engineering para APIs, orientado a risco.',
  },
  servers: [{ url: '/', description: 'Ambiente atual' }],
  paths: {
    '/health': {
      get: {
        summary: 'Verifica a disponibilidade do serviço',
        responses: {
          200: {
            description: 'Serviço disponível',
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
      get: {
        summary: 'Lista dicas de programação',
        responses: { 200: listResponse('Dicas retornadas') },
      },
    },
    '/dominarEncantamento': {
      get: {
        summary: 'Lista habilidades de dados',
        responses: { 200: listResponse('Habilidades retornadas') },
      },
    },
    '/elixir': {
      get: { summary: 'Lista elixires', responses: { 200: listResponse('Elixires retornados') } },
    },
    '/runas': {
      get: { summary: 'Lista runas', responses: { 200: listResponse('Runas retornadas') } },
    },
    '/examinarPergaminho/{id}': {
      get: {
        summary: 'Obtém uma coleção de pergaminho por identificador numérico',
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer', minimum: 1 } },
        ],
        responses: {
          200: {
            description: 'Coleção de pergaminho retornada',
            content: {
              'application/json': {
                schema: { type: 'object', additionalProperties: { type: 'object' } },
              },
            },
          },
          400: {
            description: 'Identificador não é um inteiro positivo',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          404: {
            description: 'Pergaminho não encontrado',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
  },
  components: { schemas },
};

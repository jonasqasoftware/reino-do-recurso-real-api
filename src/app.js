const crypto = require('node:crypto');
const path = require('node:path');
const express = require('express');
const swaggerUi = require('swagger-ui-express');

const convocarMago = require('../data/convocarMago.json');
const dominarEncantamento = require('../data/dominarEncantamento.json');
const elixir = require('../data/elixir.json');
const runas = require('../data/runas.json');
const openapi = require('./openapi');

const app = express();
const scrollDirectory = path.join(__dirname, '..', 'data', 'examinarPergaminho');

app.disable('x-powered-by');
app.use((request, response, next) => {
  const startedAt = process.hrtime.bigint();
  const requestId = request.get('x-request-id') || crypto.randomUUID();
  response.set('x-request-id', requestId);
  response.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - startedAt) / 1e6;
    if (process.env.NODE_ENV !== 'test') {
      console.log(
        JSON.stringify({
          event: 'request.completed',
          requestId,
          method: request.method,
          path: request.path,
          status: response.statusCode,
          durationMs: Number(durationMs.toFixed(2)),
        }),
      );
    }
  });
  next();
});

app.use((request, response, next) => {
  if (/%2e/i.test(request.originalUrl)) {
    return response
      .status(400)
      .json({ code: 'INVALID_PATH', message: 'Encoded dot segments are not allowed' });
  }
  return next();
});

app.get('/health', (_request, response) => response.status(200).json({ status: 'ok' }));
app.get('/', (_request, response) =>
  response.status(200).type('html').send(`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Reino API documentation</title>
  </head>
  <body>
    <main>
      <h1>Reino do Recurso Real API</h1>
      <p>A risk-based API Quality Engineering case study.</p>
      <nav aria-label="API documentation">
        <ul>
          <li><a href="/api-docs/">Explore the interactive API documentation</a></li>
          <li><a href="/openapi.json">Download the OpenAPI contract</a></li>
          <li><a href="/health">Check service readiness</a></li>
        </ul>
      </nav>
    </main>
  </body>
</html>`),
);
app.get('/convocarMago', (_request, response) => response.status(200).json(convocarMago));
app.get('/dominarEncantamento', (_request, response) =>
  response.status(200).json(dominarEncantamento),
);
app.get('/elixir', (_request, response) => response.status(200).json(elixir));
app.get('/runas', (_request, response) => response.status(200).json(runas));

app.get('/examinarPergaminho/:id', (request, response) => {
  const { id } = request.params;
  if (!/^[1-9]\d*$/.test(id)) {
    return response
      .status(400)
      .json({ code: 'INVALID_SCROLL_ID', message: 'Scroll id must be a positive integer' });
  }

  try {
    const scroll = require(path.join(scrollDirectory, `${id}.json`));
    return response.status(200).json(scroll);
  } catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
      return response.status(404).json({ code: 'RESOURCE_NOT_FOUND', message: 'Scroll not found' });
    }
    throw error;
  }
});

app.get('/openapi.json', (_request, response) => response.status(200).json(openapi));
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(openapi, { customSiteTitle: 'Reino API documentation' }),
);

app.use((_request, response) =>
  response.status(404).json({ code: 'ROUTE_NOT_FOUND', message: 'Route not found' }),
);

module.exports = app;

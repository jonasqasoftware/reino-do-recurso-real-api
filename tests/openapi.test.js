const assert = require('node:assert/strict');
const { describe, test } = require('node:test');
const request = require('supertest');
process.env.NODE_ENV = 'test';
const app = require('../src/app');
const openapi = require('../src/openapi');

describe('Contrato OpenAPI', () => {
  test('publica o contrato legível por máquina', async () => {
    const response = await request(app).get('/openapi.json').expect(200);
    assert.equal(response.body.openapi, '3.0.3');
    assert.deepEqual(response.body.paths, openapi.paths);
  });

  test('documenta toda rota pública da API e a resposta esperada', () => {
    const expectedRoutes = [
      '/health',
      '/convocarMago',
      '/dominarEncantamento',
      '/elixir',
      '/runas',
      '/examinarPergaminho/{id}',
    ];
    assert.ok(expectedRoutes.every((route) => Object.hasOwn(openapi.paths, route)));
    for (const route of expectedRoutes) {
      assert.ok(openapi.paths[route].get.responses['200']);
    }
    assert.ok(openapi.paths['/examinarPergaminho/{id}'].get.responses['400']);
    assert.ok(openapi.paths['/examinarPergaminho/{id}'].get.responses['404']);
  });

  test('serve a documentação interativa', async () => {
    const response = await request(app).get('/api-docs/').expect(200);
    assert.match(response.text, /Documentação da API/);
    assert.match(response.text, /swagger-ui/);
  });

  test('serve uma página de documentação acessível', async () => {
    const response = await request(app).get('/').expect(200).expect('Content-Type', /html/);
    assert.match(response.text, /<main>/);
    assert.match(response.text, /<h1>Reino do Recurso Real API<\/h1>/);
    assert.match(response.text, /aria-label="Documentação da API"/);
  });
});

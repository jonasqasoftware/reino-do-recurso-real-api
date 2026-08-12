const assert = require('node:assert/strict');
const { describe, test } = require('node:test');
const request = require('supertest');
process.env.NODE_ENV = 'test';
const app = require('../src/app');

describe('Reino API', () => {
  test('reports readiness without exposing framework details', async () => {
    const response = await request(app).get('/health').expect(200).expect('Content-Type', /json/);
    assert.deepEqual(response.body, { status: 'ok' });
    assert.equal(response.headers['x-powered-by'], undefined);
    assert.ok(response.headers['x-request-id']);
  });

  for (const [route, field] of [
    ['/convocarMago', 'dica'],
    ['/dominarEncantamento', 'habilidade'],
    ['/elixir', 'efeito'],
    ['/runas', 'simbolo'],
  ]) {
    test(`${route} returns its expected resource collection`, async () => {
      const response = await request(app).get(route).expect(200).expect('Content-Type', /json/);
      assert.equal(response.body.length, 3);
      assert.ok(Object.hasOwn(response.body[0], field));
    });
  }

  test('returns an existing scroll collection', async () => {
    const response = await request(app).get('/examinarPergaminho/1').expect(200);
    assert.ok(response.body['1'].conteudo);
  });

  for (const route of ['/examinarPergaminho/0', '/examinarPergaminho/not-a-number']) {
    test(`rejects unsafe or invalid scroll id ${route}`, async () => {
      const response = await request(app).get(route).expect(400);
      assert.deepEqual(response.body, {
        code: 'INVALID_SCROLL_ID',
        message: 'Scroll id must be a positive integer',
      });
    });
  }

  test('does not route an encoded traversal attempt to the file-backed handler', async () => {
    const response = await request(app).get('/examinarPergaminho/..%2f..').expect(400);
    assert.deepEqual(response.body, {
      code: 'INVALID_SCROLL_ID',
      message: 'Scroll id must be a positive integer',
    });
  });

  test('returns a stable error contract for a missing scroll', async () => {
    const response = await request(app).get('/examinarPergaminho/999').expect(404);
    assert.deepEqual(response.body, { code: 'RESOURCE_NOT_FOUND', message: 'Scroll not found' });
  });

  test('returns a stable error contract for an unknown route', async () => {
    const response = await request(app).get('/unknown').expect(404);
    assert.equal(response.body.code, 'ROUTE_NOT_FOUND');
  });
});

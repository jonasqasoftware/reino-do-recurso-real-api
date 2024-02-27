const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;
// Importa dados para as rotas
const convocarMagoData = require('./data/convocarMago.json');
const dominarEncantamentoData = require('./data/examinarPergaminho/dominarEncantamento..json');
const elixirData = require('./data/elixir.json');
const runasData = require('./data/runas.json');

// Configuração do Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reino do Recurso Real API',
      version: '1.0.0',
      description: 'API encantada do Reino do Recurso Real',
    },
  },
  apis: ['index.js'],
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Função para adicionar detalhes ao Swagger
const addSwaggerDetails = (path, description, responses) => ({
  [path]: {
    get: {
      description,
      responses,
    },
  },
});

// Rotas
/**
 * @swagger
 * /convocarMago:
 *   get:
 *     description: Chame um mago sábio para iluminar o caminho da programação.
 *     responses:
 *       200:
 *         description: Feitiço bem-sucedido, dados prontos para serem explorados.
 */
app.get('/convocarMago', (req, res) => {
  res.status(200).json(convocarMagoData);
});

/**
 * @swagger
 * /dominarEncantamento:
 *   get:
 *     description: Rota para a maestria do encantamento de dados.
 *     responses:
 *       200:
 *         description: Feitiço bem-sucedido, dados prontos para serem explorados.
 */
app.get('/dominarEncantamento', (req, res) => {
  res.status(200).json(dominarEncantamentoData);
});

/**
 * @swagger
 * /elixir:
 *   get:
 *     description: Visite a fonte do elixir, onde os desenvolvedores podem saciar sua sede por informações vitais.
 *     responses:
 *       200:
 *         description: Feitiço bem-sucedido, dados prontos para serem explorados.
 */
app.get('/elixir', (req, res) => {
  res.status(200).json(elixirData);
});

/**
 * @swagger
 * /runas:
 *   get:
 *     description: Explore as runas antigas que guardam os segredos do "Reino do Recurso Real".
 *     responses:
 *       200:
 *         description: Feitiço bem-sucedido, dados prontos para serem explorados.
 */
app.get('/runas', (req, res) => {
  res.status(200).json(runasData);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

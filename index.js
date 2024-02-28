const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;
// Importa dados para as rotas
const convocarMagoData = require('./data/convocarMago.json');
const dominarEncantamentoData = require('./data/examinarPergaminho/1.json');
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

// Ajuste os caminhos relativos para apontar para as pastas corretas
const swaggerUiPath = 'caminho/para/swagger-ui-dist';  // Substitua pelo caminho correto

app.use('/', swaggerUi.serve, swaggerUi.setup(specs, { swaggerUiPath }));

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
 * /examinarPergaminho/{id}:
 *   get:
 *     description: Desvenda os mistérios de um pergaminho específico no reino.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID único do pergaminho.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Feitiço bem-sucedido, dados prontos para serem explorados.
 */
app.get('/examinarPergaminho/:id', (req, res) => {
  const pergaminhoId = req.params.id;
  const filePath = `./data/examinarPergaminho/${pergaminhoId}.json`;

  try {
    const examinarPergaminhoData = require(filePath);
    res.status(200).json(examinarPergaminhoData);
  } catch (error) {
    res.status(404).json({ mensagem: 'Pergaminho não encontrado' });
  }
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

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = 3000;

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
  res.status(200).json({ mensagem: 'Chamando o mago sábio. Prepare-se para a iluminação!' });
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
  res.status(200).json({ mensagem: 'Dominando o encantamento de dados. O conhecimento é o verdadeiro poder!' });
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
  res.status(200).json({ mensagem: `Examinando o pergaminho com ID ${pergaminhoId}. Prepare-se para a sabedoria ancestral!` });
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
  res.status(200).json({ mensagem: 'Beba do elixir da sabedoria. Transforme dados ordinários em néctar da programação!' });
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
  res.status(200).json({ mensagem: 'Explorando as runas antigas. Desbloqueie a magia oculta nos dados do reino!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

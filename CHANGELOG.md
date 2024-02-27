# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.1.0 (2024-02-27)


### Features

* **convocarmago.json:** adiciona arquivo convocarMago.json ([487ff22](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/487ff22a3aa86b367060b7a73d8dfc2d685f4eb6))
* **dominarencantamento.json:** adiciona arquivo dominarEncantamento.json" ([a2a25f5](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/a2a25f5cfbb498a0ed01dc133e2714b8e79bbefe))
* **elixir.json:** adiciona arquivo elixir.json ([65b2c68](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/65b2c6883de9b6a126be7fd7df1db94e93166b45))
* **examinarpergaminho/:id.json:** adiciona arquivo examinarPergaminho/:id.json ([619ad02](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/619ad02ece3d37e033e94df6f0facd642a8ea515))
* **index.js:** implementa lógica de manipulação de dados mágicos ([7446cfa](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/7446cfa1373694a9021c67c4ea01d2df7209da5d))
* **runas.json:** adiciona arquivo runas.json ([04a5db0](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/04a5db0566556df1cd194a66678caf2ad0206658))


### Bug Fixes

* **readme.md:** corrige nomenclatura para README.md ([5417083](https://github.com/jonasqasoftware/reino-do-recurso-real-api/commit/541708392c83d85d86fb4119367ab8e9cfb3a439))

# Changelog

Todas as alterações notáveis no "Reino do Recurso Real" API serão documentadas neste arquivo.

## [Versão 1.0.0] - Data

### Adicionado

- Rota `GET /convocarMago` para chamar um mago sábio.
- Rota `GET /dominarEncantamento` para a maestria do encantamento de dados.
- Rota `GET /examinarPergaminho/:id` para desvendar os mistérios de um pergaminho específico.
- Recurso `/elixir` para visitar a fonte do elixir.
- Recurso `/runas` para explorar as runas antigas.

### Modificado

- Atualizadas as respostas HTTP para incluir mais detalhes.

### Corrigido

- Corrigido um bug na rota `GET /convocarMago` que causava uma resposta incorreta.

## [Versão 0.1.0] - Data Inicial

### Adicionado

- Estrutura inicial da API com as rotas principais.
- Configuração do Swagger para documentação.

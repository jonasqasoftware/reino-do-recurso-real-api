# API Quality Engineering Lab

**Laboratório de Quality Engineering para APIs**

Uma pequena API REST e um **estudo de caso de API Quality Engineering** orientado a evidências. O domínio de fantasia ("Reino do Recurso Real") mantém os dados simples e fáceis de acompanhar; o foco de engenharia está em análise de risco, contratos executáveis, testes negativos de segurança, limites de performance, acessibilidade, gates de CI e requisições observáveis.

> Este é um projeto de demonstração, não uma alegação de capacidade de produção.

## O que é

Uma API pequena, deliberadamente simples, construída para ser uma evidência técnica verificável de Quality Engineering aplicado a APIs — não um produto em si. O domínio sintético (rotas com nomes de fantasia) existe só para manter os dados leves e fáceis de entender; o que este repositório realmente demonstra é a estratégia de qualidade por trás dele.

## O problema de qualidade

É fácil listar "testes de API" ou "OpenAPI" no currículo. Este repositório responde a uma pergunta mais específica: essa pessoa sabe priorizar risco em uma API real, escrever testes negativos de segurança que não sejam genéricos, manter um contrato OpenAPI que não diverge do comportamento real, e decidir o que fica de fora do escopo em vez de fingir cobertura total?

## O que este projeto demonstra

- Estratégia de qualidade baseada em risco, com critérios explícitos de release e risco residual
- Testes funcionais, negativos e de contrato OpenAPI na fronteira HTTP
- Validação de entrada que previne path traversal em recursos baseados em arquivo
- Logs estruturados de conclusão de requisição e correlação de requisição
- Limites de regressão via k6 (smoke) como sinal, não como capacidade de produção
- Checagem automatizada de acessibilidade (Axe) na página própria de documentação
- CI reproduzível com instalação a partir de lockfile

## Como executar localmente

Requisitos: Node.js 20 ou mais recente. O CI usa Node.js 24 LTS; suporte a Node 20 é mantido por compatibilidade local.

```bash
git clone https://github.com/jonasqasoftware/api-quality-engineering-lab.git
cd api-quality-engineering-lab
npm ci
npm start
```

Abra a página própria e acessível de documentação em [http://localhost:3000/](http://localhost:3000/). Ela linka para o Swagger UI e para o contrato legível por máquina.

## Quality gates

```bash
npm run validate
npm run test:accessibility
```

Rode o teste opcional de performance (smoke) em um segundo terminal, depois de iniciar a API:

```bash
k6 run performance/smoke.js
```

O perfil usa 5 usuários virtuais por 15 segundos e exige menos de 1% de erros HTTP, mais de 99% de checks bem-sucedidos, e p95 abaixo de 300 ms. Esses limites detectam regressão em um ambiente controlado; eles não estabelecem capacidade de produção.

## Superfície da API

| Método | Rota                      | Propósito                                       |
| ------ | ------------------------- | ----------------------------------------------- |
| GET    | `/`                       | Página própria e acessível de documentação      |
| GET    | `/health`                 | Sinal de prontidão                              |
| GET    | `/convocarMago`           | Dicas de programação                            |
| GET    | `/dominarEncantamento`    | Habilidades de dados                            |
| GET    | `/examinarPergaminho/:id` | Conteúdo de pergaminho por ID numérico positivo |
| GET    | `/elixir`                 | Coleção de elixires                             |
| GET    | `/runas`                  | Coleção de runas                                |
| GET    | `/openapi.json`           | Contrato OpenAPI 3.0                            |
| GET    | `/api-docs/`              | Swagger UI interativo                           |

## Arquitetura e decisões

```text
index.js              Ponto de entrada serverless (Vercel)
src/app.js            Composição Express, rotas, validação, observabilidade
src/server.js         Ponto de entrada do processo local
src/openapi.js        Contrato executável da API
tests/                Testes HTTP e de contrato
performance/          Perfil de regressão k6
docs/                 Estratégia de qualidade e modelo de ameaças
```

A API usa deliberadamente uma estrutura funcional pequena, em vez de controllers, repositórios ou banco de dados. Com cinco rotas de recurso somente leitura, camadas extras esconderiam comportamento sem reduzir acoplamento de fato. O Supertest exercita a fronteira real do Express sem abrir porta de rede, mantendo os testes rápidos e isolados.

## Estratégia de qualidade

Os riscos principais são acesso arbitrário a arquivo através do identificador de pergaminho, desvio silencioso do contrato, indisponibilidade de recursos críticos, e regressão não detectada de latência/erro. Riscos P0 bloqueiam o release em qualquer falha. O CI roda instalação, análise estática, formatação, testes de integração HTTP, checagem de contrato, cobertura, acessibilidade e um perfil k6.

Rastreabilidade detalhada:

- [Estratégia de qualidade](docs/QUALITY_STRATEGY.md)
- [Modelo de ameaças](docs/THREAT_MODEL.md)

## Evidências e limitações

Os artefatos de CI retêm o relatório de cobertura por sete dias. Comandos e resultados ficam registrados no pull request que introduziu a linha de base de qualidade.

Limitações conhecidas:

- Os dados são estáticos e baseados em arquivo; não há persistência nem concorrência de escrita.
- Não há autenticação nem dado pessoal, então testes de autorização seriam artificiais.
- Resultados locais de k6 não são evidência de performance em escala de internet ou de produção.
- Os logs de requisição dão correlação, não uma plataforma completa de observabilidade distribuída.
- O Swagger UI é mantido como um explorador interativo de terceiros; o gate de acessibilidade (Axe) mira a página própria de documentação porque o HTML gerado pelo Swagger tem violações de acessibilidade conhecidas.

## Registro técnico

```text
Ferramentas: Node.js / Express, testes nativos do Node + Supertest, k6, Playwright + Axe
Versão: Node.js 24 LTS no CI; versões de pacote travadas em package-lock.json
Tipos de teste: integração de API, contrato, negativo de segurança, acessibilidade, smoke de performance
Complexidade: API pequena de demonstração, somente leitura
Arquitetura: app Express composto, com pontos de entrada local/serverless separados
Motivo: mantém o comportamento HTTP testável sem introduzir camadas não usadas
```

## Licença

[MIT](LICENSE) © 2024 Jonas Davila da Silva.

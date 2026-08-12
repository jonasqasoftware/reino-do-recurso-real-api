# Reino do Recurso Real API

A small REST API and an evidence-driven **API Quality Engineering case study**. The fantasy domain keeps the data approachable; the engineering focus is risk analysis, executable contracts, negative security testing, performance thresholds, accessibility, CI gates, and observable requests.

> Portuguese summary: laboratório de Quality Engineering para APIs, com estratégia baseada em riscos e evidências reproduzíveis. It is a demonstration project, not a production-capacity claim.

## What this demonstrates

- Risk-based quality strategy with explicit release criteria and residual risk
- Functional, negative, and OpenAPI contract tests at the HTTP boundary
- Input validation that prevents path traversal in file-backed resources
- Structured request-completion logs and request correlation
- k6 smoke thresholds used as a regression signal
- Automated Axe accessibility check for the documentation entry page
- Reproducible CI using a clean lockfile installation

## Run locally

Requirements: Node.js 20 or newer. CI uses Node.js 24 LTS; Node 20 support is retained for local compatibility.

```bash
git clone https://github.com/jonasqasoftware/reino-do-recurso-real-api.git
cd reino-do-recurso-real-api
npm ci
npm start
```

Open the accessible documentation entry page at [http://localhost:3000/](http://localhost:3000/). It links to Swagger UI and the machine-readable contract.

## Quality gates

```bash
npm run validate
npm run test:accessibility
```

Run the optional performance smoke test in a second terminal after starting the API:

```bash
k6 run performance/smoke.js
```

The profile uses 5 virtual users for 15 seconds and requires less than 1% HTTP errors, more than 99% successful checks, and p95 below 300 ms. These thresholds detect regression in a controlled environment; they do not establish production capacity.

## API surface

| Method | Route                     | Purpose                               |
| ------ | ------------------------- | ------------------------------------- |
| GET    | `/`                       | Accessible documentation entry point  |
| GET    | `/health`                 | Readiness signal                      |
| GET    | `/convocarMago`           | Programming tips                      |
| GET    | `/dominarEncantamento`    | Data skills                           |
| GET    | `/examinarPergaminho/:id` | Scroll content by positive numeric ID |
| GET    | `/elixir`                 | Elixir collection                     |
| GET    | `/runas`                  | Rune collection                       |
| GET    | `/openapi.json`           | OpenAPI 3.0 contract                  |
| GET    | `/api-docs/`              | Interactive Swagger UI                |

## Architecture and decisions

```text
index.js              Vercel serverless entry point
src/app.js            Express composition, routes, validation, observability
src/server.js         Local process entry point
src/openapi.js        Executable API contract
tests/                HTTP and contract tests
performance/          k6 regression profile
docs/                 Quality strategy and threat model
```

The API deliberately uses a small functional structure instead of controllers, repositories, or a database. With five read-only resource routes, extra layers would hide behavior without reducing meaningful coupling. Supertest exercises the real Express boundary without a network port, keeping tests fast and isolated.

## Quality Strategy

The primary risks are arbitrary file access through the scroll identifier, silent contract drift, unavailable critical resources, and undetected latency/error regression. P0 risks block release on any failure. CI runs installation, static analysis, formatting, HTTP integration tests, contract checks, coverage, accessibility, and a k6 profile.

Detailed traceability:

- [Quality strategy](docs/QUALITY_STRATEGY.md)
- [Threat model](docs/THREAT_MODEL.md)

## Evidence and limitations

CI artifacts retain the coverage report for seven days. Commands and results are recorded in the pull request that introduced the quality baseline.

Known limitations:

- Data is static and file-backed; there is no persistence or write concurrency.
- There is no authentication or personal data, so authorization tests would be artificial.
- Local k6 results are not evidence of internet-scale or production performance.
- Request logs provide correlation, not a full distributed observability platform.
- Swagger UI is retained as a third-party interactive explorer; the Axe gate targets the owned documentation entry page because the generated Swagger markup has known accessibility violations.

## Technology record

```text
Tool: Node.js / Express, Jest + Supertest, k6, Playwright + Axe
Version: Node.js 24 LTS in CI; package versions are locked in package-lock.json
Test type: API integration, contract, security-negative, accessibility, performance smoke
Complexity: Small read-only demonstration API
Architecture: Composed Express app with separate local/serverless entry points
Reason: Keeps HTTP behavior testable without introducing unused layers
Official documentation consulted: Node.js release schedule and official GitHub Actions repositories
```

## License

[MIT](LICENSE) © 2024 Jonas Davila da Silva.

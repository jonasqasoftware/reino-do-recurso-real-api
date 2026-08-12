# Lightweight threat model

## Scope and assets

This demonstration API serves public, static JSON resources. The assets are service availability, response integrity, the OpenAPI contract, and logs that do not leak user input or secrets. It has no authentication, personal data, database, or write endpoint.

## Principal risks and controls

| Risk                                         | Impact                                   | Control                                                                | Evidence                  |
| -------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------------- | ------------------------- |
| Path traversal through the scroll identifier | Read unintended local files              | Accept positive integers only and resolve from a fixed directory       | Negative API tests        |
| Contract drift                               | Consumers receive undocumented responses | OpenAPI contract is exported from application code and contract-tested | `tests/openapi.test.js`   |
| Framework disclosure                         | Unnecessary reconnaissance data          | Disable `x-powered-by`                                                 | API test                  |
| Traffic spike                                | Increased latency or unavailability      | Small stateless handlers; performance thresholds detect regression     | k6 smoke profile          |
| Untraceable failures                         | Slow incident diagnosis                  | Propagate or generate `x-request-id`; structured completion log        | API test and runtime logs |

## Residual risks

- Rate limiting and distributed tracing are intentionally absent because there is no production infrastructure or authenticated workload.
- Static JSON is loaded by the process. A much larger dataset would require a storage strategy and capacity test.
- The k6 profile is a local regression signal, not evidence of production capacity.
- Dependency and platform vulnerabilities remain subject to continuous scanning and maintenance.

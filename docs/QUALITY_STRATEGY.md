# Quality Strategy

## Context

This repository is a technical case study: a small Express API whose value is the traceable quality strategy rather than feature count. Its consumers depend on stable JSON contracts, safe path handling, discoverable documentation, and reproducible execution.

## Risk-based approach

| Priority | Risk                                        | Test level            | Decision signal                                                               |
| -------- | ------------------------------------------- | --------------------- | ----------------------------------------------------------------------------- |
| P0       | Arbitrary local-file access through `id`    | API security-negative | Any bypass blocks release                                                     |
| P0       | Existing resource endpoint stops responding | API integration       | Any non-2xx or contract mismatch blocks release                               |
| P1       | OpenAPI drifts from behavior                | Contract              | Missing route or response blocks release                                      |
| P1       | Latency/error regression                    | k6 smoke              | Threshold breach triggers investigation; local result is not a capacity claim |
| P2       | Documentation becomes unusable              | HTTP smoke            | Docs page and JSON contract must remain available                             |

## Test portfolio

- Integration/API tests exercise Express through HTTP with Supertest.
- Contract tests validate documented routes, response variants, and the published OpenAPI document.
- Security-negative tests cover malformed, zero, unknown, and traversal-shaped identifiers.
- Performance smoke uses a short k6 profile with explicit thresholds.
- Axe checks the owned documentation entry page; Swagger UI remains a third-party explorer with documented residual accessibility risk.
- Static analysis and formatting reduce avoidable implementation defects.

## Evidence and release criteria

The CI quality gate runs clean installation, lint, formatting, tests, and coverage. A change is releasable only when all automated gates pass, the README matches observed behavior, and no known secret is present. Performance results must include the environment and command; they are regression evidence only.

## Residual risk

The project does not claim production scale, penetration testing, authentication coverage, or real-user observability. Those controls would be justified only after the corresponding system context exists.

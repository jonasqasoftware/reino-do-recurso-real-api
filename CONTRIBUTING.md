# Contributing

Contributions should preserve the repository's role as a focused API Quality Engineering case study.

1. Create a branch from `main`.
2. Install exactly from the lockfile with `npm ci`.
3. Add or update tests for changed risk and behavior.
4. Run `npm run validate` and `npm run test:accessibility`.
5. Open a pull request describing the context, risk, evidence, and residual limitations.

Use clear, scoped commits. Conventional Commit prefixes such as `test:`, `fix:`, `docs:`, and `ci:` are encouraged when they describe the change accurately.

Do not commit credentials, `.env` files, generated coverage, installed dependencies, or performance results without their execution context.

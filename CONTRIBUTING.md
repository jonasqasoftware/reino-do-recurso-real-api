# Contribuindo

Contribuições devem preservar o papel deste repositório como um estudo de caso focado de API Quality Engineering.

1. Crie uma branch a partir de `main`.
2. Instale exatamente a partir do lockfile com `npm ci`.
3. Adicione ou atualize testes para o risco e comportamento alterados.
4. Rode `npm run validate` e `npm run test:accessibility`.
5. Abra um pull request descrevendo o contexto, o risco, a evidência e as limitações residuais.

Use commits claros e escopados. Prefixos de Conventional Commits como `test:`, `fix:`, `docs:` e `ci:` são incentivados quando descrevem a mudança com precisão.

Não commite credenciais, arquivos `.env`, cobertura gerada, dependências instaladas, ou resultados de performance sem o contexto de execução.

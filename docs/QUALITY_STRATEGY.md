# Estratégia de Qualidade

## Contexto

Este repositório é um estudo de caso técnico: uma pequena API Express cujo valor está na estratégia de qualidade rastreável, não na quantidade de funcionalidades. Seus consumidores dependem de contratos JSON estáveis, tratamento seguro de path, documentação descobrível e execução reproduzível.

## Abordagem baseada em risco

| Prioridade | Risco                                           | Nível de teste             | Sinal de decisão                                                                      |
| ---------- | ----------------------------------------------- | -------------------------- | ------------------------------------------------------------------------------------- |
| P0         | Acesso arbitrário a arquivo local via `id`      | API, negativo de segurança | Qualquer bypass bloqueia o release                                                    |
| P0         | Endpoint de recurso existente para de responder | Integração de API          | Qualquer resposta não-2xx ou divergência de contrato bloqueia o release               |
| P1         | OpenAPI diverge do comportamento real           | Contrato                   | Rota ou resposta faltante bloqueia o release                                          |
| P1         | Regressão de latência/erro                      | Smoke k6                   | Violação de limite dispara investigação; resultado local não é alegação de capacidade |
| P2         | Documentação se torna inutilizável              | Smoke HTTP                 | A página de docs e o contrato JSON precisam continuar disponíveis                     |

## Portfólio de testes

- Testes de integração/API exercitam o Express via HTTP com Supertest.
- Testes de contrato validam rotas documentadas, variantes de resposta e o documento OpenAPI publicado.
- Testes negativos de segurança cobrem identificadores malformados, zero, desconhecidos e com formato de path traversal.
- O smoke de performance usa um perfil k6 curto com limites explícitos.
- O Axe checa a página própria de documentação; o Swagger UI continua sendo um explorador de terceiros, com risco residual de acessibilidade documentado.
- Análise estática e formatação reduzem defeitos evitáveis de implementação.

## Evidências e critérios de release

O gate de qualidade do CI roda instalação limpa, lint, formatação, testes e cobertura. Uma mudança só é liberável quando todos os gates automatizados passam, o README corresponde ao comportamento observado, e nenhum segredo conhecido está presente. Resultados de performance precisam incluir o ambiente e o comando; eles são evidência de regressão apenas.

## Risco residual

O projeto não alega escala de produção, teste de penetração, cobertura de autenticação, ou observabilidade de usuário real. Esses controles só se justificariam depois que o contexto de sistema correspondente existisse.

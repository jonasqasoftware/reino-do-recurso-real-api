# Modelo de Ameaças (leve)

## Escopo e ativos

Esta API de demonstração serve recursos JSON públicos e estáticos. Os ativos são disponibilidade do serviço, integridade da resposta, o contrato OpenAPI, e logs que não vazam entrada de usuário nem segredos. Não há autenticação, dado pessoal, banco de dados ou endpoint de escrita.

## Principais riscos e controles

| Risco                                            | Impacto                                         | Controle                                                                      | Evidência                      |
| ------------------------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------- | ------------------------------ |
| Path traversal via o identificador do pergaminho | Leitura de arquivos locais não pretendidos      | Aceitar somente inteiros positivos e resolver a partir de um diretório fixo   | Testes negativos de API        |
| Divergência de contrato                          | Consumidores recebem respostas não documentadas | O contrato OpenAPI é exportado do código da aplicação e testado como contrato | `tests/openapi.test.js`        |
| Vazamento de informação do framework             | Dado desnecessário de reconhecimento            | Desabilitar `x-powered-by`                                                    | Teste de API                   |
| Pico de tráfego                                  | Aumento de latência ou indisponibilidade        | Handlers pequenos e stateless; limites de performance detectam regressão      | Perfil de smoke k6             |
| Falhas não rastreáveis                           | Diagnóstico lento de incidente                  | Propagar ou gerar `x-request-id`; log estruturado de conclusão                | Teste de API e logs de runtime |

## Riscos residuais

- Rate limiting e tracing distribuído estão deliberadamente ausentes porque não há infraestrutura de produção nem carga autenticada.
- O JSON estático é carregado pelo processo. Um dataset muito maior exigiria uma estratégia de armazenamento e teste de capacidade.
- O perfil k6 é um sinal local de regressão, não evidência de capacidade de produção.
- Vulnerabilidades de dependência e de plataforma permanecem sujeitas a varredura e manutenção contínuas.

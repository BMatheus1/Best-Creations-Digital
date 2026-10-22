# Relatório da Fase 1

Status: fundação implementada e validada localmente. PostgreSQL/Compose e
execução remota de CI permanecem pendentes. O produto comercial completo
não foi declarado entregue.

## 1. Funcionalidades
Cadastro transacional, login/logout, cookies, CSRF/Origin, sessões revogáveis,
email de confirmação e reset via outbox, perfil, fuso, workspaces e papéis,
dashboard com atividades reais e interface responsiva em português.

## 2. Arquivos principais
`backend/app/{api,services,repositories,models,schemas,main,email_worker}.py`,
`backend/migrations/versions/85ae6972dfe3_*.py`, `frontend/src/app`,
`frontend/src/components`, `frontend/tests`, `backend/tests`, Compose,
Dockerfiles, arquivos de dependências e documentação.

## 3. Endpoints
Inventário completo em `API.md`: auth, users/me, workspaces, memberships,
dashboard e health, sob `/api/v1`.

## 4. Migração
`85ae6972dfe3`: users, workspaces, memberships, auth_sessions, action_tokens,
email_outbox, rate_buckets e audit_logs. Aplicada localmente em SQLite.

## 5. Validação
- Pytest final: 24 passaram em SQLite; execução com cobertura registrou 90%.
  Inclui consumo concorrente de token e SMTP real para um capturador local.
- Vitest: 4 passaram.
- Playwright/Chrome: 3 passaram, execução completa com exit code 0 (1,1 min).
  API e frontend reais, sem mocks; desktop/mobile, confirmação de email,
  recuperação de senha e revogação também validadas.
- TypeScript, ESLint e Ruff: sem erros na verificação final.
- Build de produção Next.js 16.4.2: passou; standalone com server.js gerado.
- Alembic check: nenhuma alteração pendente entre modelos e migração.
- Upgrade/downgrade/upgrade testados em banco SQLite descartável.
- Compose YAML analisado; esse check não substitui execução do Docker.
- PostgreSQL, Docker Compose e GitHub Actions: não executados neste ambiente.
- Aviso conhecido: Starlette recomenda substituir httpx por httpx2 no
  TestClient. A suíte atual passa; isso não foi ocultado como teste sem avisos.

## 6–7. Problemas e correções
- Pasta vazia, dentro de outro repositório: projeto isolado em SocialAI.
- Rede bloqueada para dependências: instalação executada pelo mecanismo de
  autorização do ambiente; nenhum serviço pago adicionado.
- Raiz Next inferida como projeto pai: root e output tracing configurados
  explicitamente para o frontend deste projeto.
- Timestamps SQLite sem timezone: normalização UTC antes da API.
- Encerramento de processos do Playwright restringido pelo sandbox Windows:
  suíte final executada com autorização do ambiente e encerramento confirmado.
- IDs repetidos no seletor do menu mobile: desktop e diálogo agora usam IDs
  próprios. Tipografia revisada e ausência de overflow validada em 390 px.
- Workflow instalado também em `.github/workflows/postpilot-ci.yml` na raiz
  Git; template preservado dentro do projeto, com permissões de leitura.

## 8. Pendências
Validação integral em PostgreSQL/Compose e SMTP configurado; próximas fases
conforme `MVP_SCOPE.md`. Não há conexão Instagram ou assinatura funcionando.

## 9. Dependências externas
SMTP de produção com STARTTLS; PostgreSQL e Docker para ambiente completo.
Meta e Mercado Pago exigirão credenciais e permissões nas respectivas fases.
Nenhuma credencial foi criada, fornecida ou validada por este incremento.

## Prévia local
Frontend: http://127.0.0.1:3100/login; API: http://127.0.0.1:8100.
Portas alternativas preservam os processos existentes em 3000/8000.
Health do banco local respondeu `ok`. Não há conta pré-cadastrada nessa
instância; os usuários de QA pertencem exclusivamente ao banco de E2E.

## 10. Próxima etapa
Executar a fundação em PostgreSQL/Compose e iniciar Fase 2: biblioteca privada,
editor de imagem única, rascunhos e calendário persistente.

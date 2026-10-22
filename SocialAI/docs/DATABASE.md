# Banco de dados — Fase 1

Migração inicial: `85ae6972dfe3`, snapshot explícito das tabelas, índices,
constraints e chaves estrangeiras. `alembic upgrade head` aplica;
`alembic downgrade base` remove as tabelas (somente em banco descartável).
Não criar tabelas automaticamente no startup da API.

| Tabela | Responsabilidade |
| --- | --- |
| users | Email normalizado único, nome, hash Argon2id, fuso, verificação |
| workspaces | Nome, fuso e data de criação |
| memberships | Usuário/workspace único, owner/admin/member com constraint |
| auth_sessions | Hash do token e CSRF, workspace ativo, expiração e revogação |
| action_tokens | Hash do token descartável, finalidade, expiração, consumo |
| email_outbox | Mensagem pendente, tentativas, lease, envio confirmado |
| rate_buckets | Contador atômico por identidade e janela temporal |
| audit_logs | Ação, ator, workspace e instante |

IDs UUID gerados no servidor. FKs com política explícita de exclusão; memberships
indexadas por usuário e workspace, sessões por usuário/expiração, outbox por
envio/disponibilidade. Timestamps são UTC; SQLite pode retornar timestamps sem
tzinfo, normalizados antes da exposição pela API.

Não existe endpoint de exclusão de workspace nesta fase. Exclusão de titular,
retencão de auditoria e exportação serão definidos antes do lançamento.

Tabelas `social_accounts`, `social_tokens`, `media_assets`, `posts`,
`publication_jobs`, `post_metrics`, `subscriptions` e `billing_events`
pertencem às próximas migrações. Seus índices e vínculos compostos de tenant
devem acompanhar os respectivos serviços; não existem dados fictícios nelas.

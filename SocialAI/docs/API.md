# API v1

Prefixo `/api/v1`. OpenAPI automática em `/openapi.json`; Swagger em `/docs`
somente fora de produção. Respostas de erro: `detail` legível e `request_id`;
validação contém campos/tipos sem repetir senha, token ou valores enviados.

Todas as mutações exigem `Origin` exatamente igual a `FRONTEND_URL`.
Mutações autenticadas exigem também `X-CSRF-Token`, obtido do cookie `pp_csrf`.
Autenticação usa o cookie HttpOnly `pp_session`.

| Método / caminho | Acesso / comportamento |
| --- | --- |
| POST /auth/register | Público; cria usuário/workspace/owner/sessão e outbox (201) |
| POST /auth/login | Público; valida senha e emite sessão |
| GET /auth/session | Sessão; perfil e somente workspaces do usuário |
| POST /auth/logout | Revoga a sessão atual (204) |
| POST /auth/revoke-sessions | Revoga todas as sessões do usuário (204) |
| POST /auth/forgot-password | Público; resposta genérica, token na outbox |
| POST /auth/reset-password | Público; token descartável, revoga sessões |
| POST /auth/verify-email | Público; token descartável |
| POST /auth/resend-verification | Sessão; novo token e outbox |
| PATCH /users/me | Nome/fuso; campos adicionais rejeitados |
| GET /workspaces | Lista somente participações autenticadas |
| POST /workspaces | Cria workspace e owner (201), com limitação |
| POST /workspaces/select | Exige participação no workspace solicitado |
| PATCH /workspaces/current | Owner/admin; nome e fuso |
| GET /memberships | Workspace atual; offset/limit, máximo 100 |
| PATCH /memberships/{id} | Owner; admin/member; não altera owner |
| GET /dashboard | Contagem de membros e últimas 5 atividades privadas |
| GET /health | Saúde de banco; sem segredos |

Não há endpoints de posts, mídia, Meta, billing ou webhooks nesta fase.
Os contratos de `/dashboard` declaram explicitamente conteúdo indisponível,
`metrics: null` e integrações `not_implemented`.

401 sessão inválida/expirada; 403 CSRF/origem/papel; 404 recurso de outro
workspace; 409 conflito; 413 tamanho; 422 dados; 429 tentativas; 503 email
desabilitado/health indisponível. Cabeçalho `Retry-After` em limitação.

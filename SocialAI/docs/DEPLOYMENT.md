# Deploy reproduzível

## Desenvolvimento
Docker Compose: PostgreSQL 17, API, migração, worker SMTP, Mailpit e frontend.
Credenciais reais somente em `.env` ignorado. Compose exige senha de banco
definida pelo operador; não contém senha padrão de produção. Use hex aleatório
ou URL encoding para senhas com caracteres reservados na URL de conexão.

## Frontend Vercel
Selecionar `SocialAI/frontend` como Root Directory neste repositório (ou
`frontend` se o projeto for extraído). `npm ci`, `npm run build`, preset Next.js.
`API_BASE_URL=https://seu-backend` em build e runtime. As rewrites são emitidas
durante a build, portanto uma mudança de URL exige nova build.

## Backend / Render equivalente
Usar `backend/Dockerfile`, Python 3.14 e PostgreSQL gerenciado. Configurar:
`APP_ENV=production`, `DATABASE_URL=postgresql+psycopg://...`,
`FRONTEND_URL=https://seu-frontend`, `COOKIE_SECURE=true`, SMTP/STARTTLS.
Executar `python -m alembic upgrade head` como etapa única de pré-deploy;
nunca lançar migrações concorrentes em cada réplica. API escuta 8000 (ajustar
para a porta exigida pelo provedor) com health `/api/v1/health`.

Worker separado com `python -m app.email_worker`, mesma configuração/banco.
Não hospedar esse consumidor num processo serverless efêmero. Somente PostgreSQL
suporta claims concorrentes por SKIP LOCKED; SQLite local usa um consumidor.
Worker remove dados operacionais expirados; supervisionar também sua execução.

Não há deploy realizado. Não há Redis, S3, Sentry, Meta ou Mercado Pago ativos.
Provisionar somente nas fases correspondentes.

## CI no repositório pai
Template em `.github/workflows/ci.yml` deste projeto. GitHub só descobre workflows
em `.github/workflows` na raiz Git. Neste checkout a raiz Git é o diretório pai;
a cópia operacional deve ficar ali como `postpilot-ci.yml`, com caminhos
`SocialAI/backend` e `SocialAI/frontend`. Não sobrescrever workflows de outro app.
A cópia operacional foi instalada na raiz Git neste incremento. Criar arquivos
não significa que um job remoto tenha sido executado. A CI usa banco PostgreSQL
descartável. Em um repositório independente, ajustar os caminhos e filtros para
remover o prefixo SocialAI.

Referências de infraestrutura: [workflows GitHub](https://docs.github.com/en/actions/concepts/workflows-and-actions/workflows)
e [imagens oficiais Mailpit](https://mailpit.axllent.org/docs/install/docker/).

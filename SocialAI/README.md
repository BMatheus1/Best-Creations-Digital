# PostPilot

SaaS brasileiro para organizar a presença de negócios no Instagram, desenvolvido
como monólito modular. **Este incremento implementa a Fase 1 (fundação)**.
Não é ainda a versão comercial: conteúdo, Instagram, analytics, publicação
programada, cobrança e lançamento pertencem às próximas fases.

Disponível: cadastro, login/logout, sessões revogáveis, recuperação de senha,
confirmação de email, perfil, criação/seleção de workspaces, papéis e dashboard
com atividade real. Não há usuários, métricas ou integrações de demonstração.

## Estrutura

`frontend/`: Next.js 16 App Router, React, TypeScript, Tailwind 4, componentes
shadcn/ui com Radix, Lucide, TanStack Query, React Hook Form e Zod.
`backend/`: FastAPI, SQLAlchemy 2, Alembic, PostgreSQL e worker SMTP persistente.
`docs/`: arquitetura, decisões, escopo e relatório de validação.

O checkout atual está dentro de outro repositório Git. O PostPilot é independente
do aplicativo existente no diretório pai; nenhuma configuração desse aplicativo
precisa ser substituída.

## Executar com Docker

Requisitos: Docker Engine/Desktop com Compose e portas 3000, 8000, 8025 e 5432 livres.

1. Copie `.env.example` para `.env` na raiz deste projeto.
2. Preencha `POSTGRES_PASSWORD` com uma senha aleatória local (caracteres
   alfanuméricos/hexadecimais evitam a necessidade de URL encoding).
3. Execute `docker compose up --build` nesta pasta.
4. Abra http://127.0.0.1:3000. Cadastre sua própria conta.
5. Abra http://127.0.0.1:8025 para ler os emails capturados pelo Mailpit.

O serviço `migrate` executa Alembic antes da API e do worker. O volume
`postgres_data` mantém os dados entre reinícios. `docker compose down` preserva
esse volume. O worker desta fase envia emails; não publica no Instagram.
O Mailpit não envia emails a destinatários externos.

## Executar sem Docker (PowerShell)

Requisitos: Node 24, Python 3.14 e npm. A alternativa SQLite serve apenas para
desenvolvimento local/testes; produção exige PostgreSQL.

Na pasta `backend`:

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.lock -e '.[dev]'
Copy-Item ..\.env.example .env
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --no-access-log
```

Em outro terminal, na pasta `frontend`:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Abra http://127.0.0.1:3000. Use sempre o mesmo host: `localhost` e `127.0.0.1`
são origens distintas. Com SMTP local disponível em 1025, execute em `backend`:

```powershell
.\.venv\Scripts\python.exe -m app.email_worker
```

Sem SMTP/worker, mensagens permanecem na outbox, com retentativas limitadas;
verificação e recuperação não chegam à caixa de entrada. Configure SMTP real
com STARTTLS antes de usar esses fluxos com usuários externos.

Linux/macOS: use `.venv/bin/python` no lugar de `.venv\Scripts\python.exe`.
API OpenAPI local: http://127.0.0.1:8000/docs.

## Testes e build

Backend, na pasta `backend`:

```powershell
.\.venv\Scripts\python.exe -m ruff check app tests migrations
.\.venv\Scripts\python.exe -m pytest -q
.\.venv\Scripts\python.exe -m alembic check
```

Para testes PostgreSQL, configure `TEST_DATABASE_URL` com um **banco descartável
contendo `postpilot_test` no nome**. Os testes apagam/recriam suas tabelas.
Nunca utilize o banco da aplicação. CI provisiona uma instância descartável.

Frontend, na pasta `frontend`:

```powershell
npm run lint
npm run test
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

E2E inicia API e Next nas portas 8001/3001 e usa `backend/e2e.db` separado.
No Windows com Chrome instalado, pode-se usar `$env:PLAYWRIGHT_CHANNEL='chrome'`.
Os testes criam contas exclusivamente no banco de E2E.

## Deploy

Consulte [DEPLOYMENT](docs/DEPLOYMENT.md). Frontend preparado para Vercel;
backend e worker para processos persistentes separados. Configure HTTPS,
PostgreSQL, SMTP e backups. Não publique comercialmente esta etapa como se
as integrações futuras estivessem disponíveis.

Comece pelo [plano](docs/PLAN.md), [escopo](docs/MVP_SCOPE.md) e
[relatório da Fase 1](docs/PHASE_1_REPORT.md). Resultados executados e limitações
estão documentados separadamente em [TESTING](docs/TESTING.md).

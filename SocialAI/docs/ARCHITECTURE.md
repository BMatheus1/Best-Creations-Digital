# Arquitetura

Monólito modular com dois processos Python: API FastAPI e consumidor de outbox
SMTP. Banco PostgreSQL; SQLite apenas no desenvolvimento e em testes rápidos.
Frontend Next.js 16 App Router em `frontend/`, independente do projeto no pai.

Browser → Next `/api/v1/*` (proxy na mesma origem) → FastAPI → SQLAlchemy → banco.
Páginas privadas consultam a sessão no servidor antes de renderizar. O browser
usa TanStack Query para revalidação e mutations com proteção CSRF.

`api.py`: contratos HTTP e autorização; `services.py`: cadastro/sessões/email;
`repositories.py`: consultas privadas; `models.py`: persistência;
`schemas.py`: validação; `core/`: configuração e segurança.
Novos módulos devem ser separados por domínio quando sua lógica for adicionada;
não há camadas vazias ou microsserviços nesta fase.

Outbox e token são gravados junto com a operação de cadastro/recuperação.
Worker SMTP usa claims com lease e `FOR UPDATE SKIP LOCKED` em PostgreSQL.
SQLite não suporta múltiplos consumidores com as mesmas garantias.

Sessões no banco podem ser revogadas e expiram em 168 horas por padrão.
Não há JWT, armazenamento de credenciais no browser ou autenticação social.
Escopos de workspace são sempre derivados de sessão + membership consultada.

Redis/Celery, S3, adaptadores Meta/Mercado Pago e Recharts serão incluídos nas
respectivas fases. O worker SMTP não deve ser reaproveitado como publicação
sem idempotência, reconciliação e os testes da Fase 4.

# Plano técnico — PostPilot

## Inspeção inicial
- Diretório SocialAI vazio; repositório Git está no diretório pai.
- Node 24 e Python 3.14 disponíveis. Docker/PostgreSQL não encontrados no PATH.
- Nenhum código anterior, configuração ou credencial foi sobrescrito.

## Decisões da Fase 1
Monólito modular FastAPI + SQLAlchemy 2, PostgreSQL em produção, Alembic,
Next.js 16 App Router, TypeScript, Tailwind e componentes acessíveis.
Sessões opacas persistidas no banco (hash do segredo), cookies HttpOnly,
validação de Origin e token CSRF por sessão. Senhas com Argon2id.
Workspaces e memberships com owner/admin/member; autorização no servidor.
Email de verificação e recuperação via outbox persistente e SMTP; Mailpit local.
Sem conta social ou métricas fabricadas. Dashboard representa o banco real.
SQLite permitido exclusivamente para desenvolvimento/testes rápidos; CI testa PostgreSQL.

## Tarefas verificáveis
- [x] Estrutura, configuração validada, Compose e migração inicial preparados.
- [x] Cadastro atômico de usuário + workspace + owner + sessão.
- [x] Login, logout, expiração, revogação de sessões e CSRF.
- [x] Verificação de email e redefinição de senha, tokens descartáveis.
- [x] Workspaces, seleção, autorização e atualização de perfil.
- [x] Dashboard responsiva com consultas reais e onboarding vazio.
- [x] Testes de autenticação, CSRF, papéis e isolamento entre clientes.
- [x] TypeScript, lint, build, testes de formulários e fluxos de navegador.
- [x] CI preparada, documentação, limitações e relatório da fase.
- [ ] Executar PostgreSQL/Compose e CI remota (indisponíveis neste ambiente).
- [ ] Validar entrega de email com provedor SMTP externo configurado.

## Fases posteriores
2. Mídia privada, editor, rascunhos e calendário persistente.
3. Instagram oficial, após pesquisa e configuração Meta/App Review.
4. Worker de publicação, idempotência, reconciliação e retries.
5. Insights reais e gráficos.
6. Mercado Pago sandbox, webhooks e limites de assinatura.
7. Preparação comercial, legal, revisão e deploy.

Não marcar integrações externas como validadas sem credenciais e execução real.
Não implantar ou cobrar nesta fase.

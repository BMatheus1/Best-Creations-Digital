# Escopo verificável

## Fase 1 implementada
- Conta com nome/email/senha, workspace inicial e owner atômicos.
- Login, logout, expiração, revogação de sessões, Origin e CSRF.
- Email de confirmação e recuperação via outbox e SMTP configurável.
- Perfil e fuso; workspaces independentes, seleção e permissões server-side.
- Lista de membros e alteração owner → admin/member sem transferir owner.
- Design system, dashboard, onboarding, configurações e navegação responsiva.
- Atividades e membros reais; dados futuros explicitamente indisponíveis.
- Migração, Compose, testes, build e documentação.

## Ainda não implementado
Mídia/editor/calendário funcional (Fase 2), OAuth e publicação Instagram (3),
worker de publicação/agendamento (4), métricas/gráficos reais (5), assinatura/
Mercado Pago/limites comerciais (6), landing/termos/privacidade/exclusão,
administração de plataforma/monitoramento comercial/deploy (7).

As rotas desses módulos exibem explicação da etapa, não simulam sua operação.
O cadastro não concede trial nem assinatura e não contrata serviços pagos.
Recharts, biblioteca de calendário, Redis/Celery e S3 serão adicionados quando
usados, evitando dependências que não cumprem função nesta fase.

Critério de Fase 1: cadastrar, entrar e acessar workspace isolado.
Validação local e limites de infraestrutura: `PHASE_1_REPORT.md`.

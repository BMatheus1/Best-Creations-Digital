# Estratégia de testes

Testes executados e resultados finais: ver `PHASE_1_REPORT.md`.
Backend usa Pytest e HTTP real ASGI com banco isolado por teste. Por padrão,
SQLite temporário. `TEST_DATABASE_URL` habilita os mesmos testes em PostgreSQL;
o nome deve conter `postpilot_test`, pois as tabelas são apagadas/recriadas.

Cobertura: cadastro atômico, duplicidade/normalização, validação sem exposição
de senha, cookies, login inválido, logout/revogação/expiração, CSRF e Origin,
tokens descartáveis e expirados, reset com revogação, rate limit persistente,
fuso, mass assignment, papéis, isolamento de workspace e outbox SMTP.

Frontend usa Vitest/Testing Library: validação de formulário, envio, erro do
servidor, navegação após confirmação e mostrar/ocultar senha. Fetch é mockado
somente nesses testes de componentes.

Playwright inicia API FastAPI e Next reais nas portas 8001/3001. Banco dedicado
`e2e.db`, sem mocks de API. Cobre proteção server-side, cadastro/login/logout,
persistência após reload, atualização de perfil, criação/troca de workspace,
menu mobile, página de disponibilidade e ausência de overflow horizontal.
Screenshots ficam em `frontend/test-results` (ignoradas no Git).

O worker SMTP tem testes de falha/retry com adaptador mockado e um teste de
envio por socket SMTP real para capturador local. Isso não comprova entrega
externa nem recebimento por destinatários. Mailpit permite verificar captura
local quando Docker estiver disponível. O E2E de email lê tokens apenas da
outbox do banco descartável, valida a confirmação e a redefinição pelo browser;
esse mecanismo de leitura existe somente no teste, sem endpoint de debug.

CI está preparada para PostgreSQL, migração upgrade/downgrade e E2E Chromium.
Sem execução do job remoto não declarar PostgreSQL ou Docker validados.
Nenhum teste da Fase 1 cobre integração Meta ou Mercado Pago.

# Autenticação e autorização

Senhas de 12 a 128 caracteres, Argon2id (pwdlib). Login faz verificação de hash
também para email inexistente, com resposta genérica. Cadastro exige email
normalizado único, nome e workspace; tudo é persistido na mesma transação.

Cookies sem Domain: `pp_session` HttpOnly, SameSite=Lax, path=/; `pp_csrf`
legível por JS, SameSite=Lax, path=/. Segredos aleatórios com 256 bits; apenas
SHA-256 dos segredos fica nas tabelas de sessão. Nenhum token em localStorage.
CSRF validado em toda mutação autenticada e Origin em toda mutação pública.
`COOKIE_SECURE=true` obrigatório em produção, sob HTTPS.

Verificação: token de 24h. Recuperação: 1h. Consumo atômico por UPDATE condicionado
à validade e ausência de consumo, não check-then-update. Reenvio invalida tokens
anteriores do mesmo propósito. Redefinição revoga todas as sessões.
Links usam fragmento para evitar tokens em logs de URL e Referrer.

SMTP via outbox persistente; corpo é limpo após envio e mensagens antigas
removidas após dois dias. O banco/outbox deve ter acesso restrito e criptografia
em repouso, pois mensagens ainda pendentes contêm links descartáveis.

Limitação no banco: por IP e email, janelas de 15 minutos, contador atômico.
IP vem do cliente ASGI; configure proxies confiáveis para identidade correta
em deploy. Limite compartilhado por proxy protege mas pode agrupar usuários.

Toda rota privada valida sessão, expiração, usuário e membership atual.
Owner/admin podem editar workspace; somente owner altera papéis; membro não
gerencia workspace. Owner não pode remover sua propriedade por esse endpoint.
Invites e transferência de propriedade não fazem parte desta fase.

O email não verificado permite preparar o workspace. Publicação e cobrança
devem exigir verificação nas fases futuras. Não há concessão de assinatura.

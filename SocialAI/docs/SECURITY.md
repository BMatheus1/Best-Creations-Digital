# Segurança e limites atuais

Implementado: hashes Argon2id, sessões opacas revogáveis, cookies HttpOnly,
SameSite e Secure obrigatório em produção; Origin e CSRF; rate limiting
persistente; DTOs com campos extras proibidos; consultas SQL parametrizadas;
autorização por membership/tenant; logs sem payloads, senhas ou tokens.
Limite de 64 KiB para os pequenos corpos JSON desta fase, incluindo chunked.

Frontend não injeta HTML vindo de usuário. Respostas privadas no-store;
nosniff, Referrer-Policy, X-Frame-Options e Permissions-Policy no frontend.
Backend não aceita URLs de fetch de usuários, não tem uploads nem webhooks.
SSRF/upload/webhook precisam de controles específicos nas próximas fases.

Configuração rejeita produção com SQLite, HTTP, cookie inseguro ou SMTP sem
STARTTLS. Evitar log de SQL/parametrização, cookies e URLs com segredos no proxy.
Não usar `--proxy-headers` indiscriminadamente sem origens de proxy confiáveis.

Logs JSON com request ID gerado pelo servidor, método, caminho sem query,
status e duração; falhas registram classe, sem conteúdo da exceção.
Auditoria por workspace cobre cadastro/login/logout/alterações e papéis.
Auditoria de perfil/email sem workspace não expõe dados de outro tenant.

Antes do lançamento: revisão independente, backups/restauração testados,
monitoramento externo/alertas, CSP com nonces, proteção antiabuso de borda,
email transacional real, política de retenção e exclusão/exportação de titular.
MFA, alertas de novos acessos e identificação de dispositivos não implementados.

LGPD: registrar finalidade, fornecedores e retenção; criar termos e privacidade
revisados e fluxo de exclusão antes da Fase 7. A implementação atual não representa
declaração de conformidade jurídica integral.

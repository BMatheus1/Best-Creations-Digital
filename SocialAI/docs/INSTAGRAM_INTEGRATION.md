# Integração Instagram — não implementada

Fase prevista: 3. Nenhum OAuth, token, publicação ou insight foi conectado,
simulado ou validado. A rota de contas informa essa indisponibilidade.

Antes da implementação, consultar e registrar a documentação oficial atual:
https://developers.facebook.com/docs/instagram-platform/

Decisões pendentes: comparar os fluxos oficiais disponíveis, elegibilidade de
contas, permissões de publicação e insights, App Review, renovação/revogação,
versão Graph, URLs acessíveis de mídia e limites oficiais de imagem/requisições.
Nenhum desses requisitos foi presumido como aprovado nesta fase.

Arquitetura planejada: adaptador HTTPX no backend, OAuth state descartável
vinculado à sessão/workspace e armazenamento de tokens com criptografia
autenticada e rotação de chave externa ao banco. Retornar indisponibilidade
quando configuração, permissão ou aprovação estiver ausente.

Dependências: aplicativo Meta, IDs/segredos em gerenciador de segredos,
redirect HTTPS registrado, contas elegíveis autorizadas e permissões aprovadas.
Separar testes com mocks de validações reais. Nunca solicitar senha Instagram,
usar scraping ou automação de browser para publicar.

Na Fase 4, respostas inconclusivas devem entrar em reconciliação; não repetir
publicação cegamente após timeout. Calendário/editor da Fase 2 não dependem
dessas credenciais para funcionar.

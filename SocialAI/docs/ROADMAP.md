# Roadmap

1. Fundação: implementação e validação descritas no relatório da fase.
2. Conteúdo: storage privado S3, validação real de imagem, biblioteca, rascunhos,
   editor e calendário maduro. Definir constraints compostas de workspace.
3. Instagram: pesquisar documentação oficial, selecionar fluxo, App Review,
   state descartável, tokens criptografados, testes mockados e depois reais.
4. Agendamento: PostgreSQL + Redis/Celery, outbox persistente de publicação,
   concorrência, idempotência, retentativas seguras, reconciliação e histórico.
5. Analytics: escopos disponíveis, retenção conforme políticas, sincronização
   limitada e Recharts somente para dados reais.
6. Cobrança: planos configuráveis no backend, Mercado Pago sandbox,
   webhooks autenticados/idempotentes e eventos fora de ordem.
7. Comercial: landing pública independente, onboarding completo, termos e
   privacidade revisados, exclusão/exportação, admin de plataforma, segurança,
   monitoramento, backups e deploy. Validar fluxo completo antes de vender.

Não desenvolver Reels, Stories, carrosséis, múltiplas redes ou ferramentas
avançadas de agência antes de concluir e validar o núcleo de imagem única.

Cada incremento deve ter relatório, migrações próprias e testes de autorização.
Permissões externas podem limitar validação real da Fase 3; não bloqueiam a 2.

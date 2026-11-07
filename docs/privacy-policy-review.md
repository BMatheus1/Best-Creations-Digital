# Política de Privacidade — fontes e revisão

Versão: 7 de novembro de 2026. Rota pública: `/politica-de-privacidade`.
Domínio confirmado pelo responsável: https://best-creations-digital.mylinkbr.workers.dev.

## Escopo verificado

- Site: App Router do Next.js, layout institucional compartilhado e contato via WhatsApp já publicado. Sem middleware de autenticação ou integração Pinterest no site.
- `src/components/forms/ProjectWizard.tsx`, `src/lib/validations.ts` e `src/lib/whatsapp.ts`: campos obrigatórios/opcionais, estado em memória, clipboard e resumo em URL `wa.me`. Abrir o destino compartilha o texto com o serviço; não equivale a enviar a mensagem.
- `src/components/lab` e `src/lib/lab`: simulações em memória; sem persistência de negócio. A busca no código do site não encontrou cookies de aplicação, localStorage, IndexedDB, analytics ou pixels.
- Hospedagem Cloudflare: integração Workers Builds confirmada pelos checks do GitHub e endereço público confirmado pelo responsável. Não foram auditados logs da conta, retenção do provedor, WAF, cookies de infraestrutura ou região de processamento. O texto não promete ausência dessas operações.
- Fonte local do Studio Factory, inspecionada somente para leitura: `D:/sticker factory`. Não é dependência do site e nenhum arquivo ou credencial desse aplicativo foi copiado.
- `README.md` do Studio Factory: aplicativo privado Windows, recursos locais, exportação/importação experimental de lotes Colab e referências opcionais.
- `services/api/app/db.py`: SQLite e pastas locais de dados/exportações. Não foram abertos bancos, arquivos de trabalho pessoais ou valores de credenciais.
- `apps/web/app/typography-editor.tsx`: rascunhos em localStorage. Não confundir esse armazenamento com o formulário institucional.
- `services/api/app/creative/providers.py`: consultas opcionais a Google Fonts/Iconify, cache local, proteção de chave Google Fonts via Windows DPAPI quando salva pela interface ou uso de variável de ambiente. Essa proteção não foi atribuída ao banco inteiro ou a tokens Pinterest.
- `services/api/app/creative/api.py`: registro manual de referências Pinterest/Behance. `ReferenceProvider` valida links HTTPS; não implementa autenticação OAuth ou consulta de conta pela API Pinterest.
- `services/api/app/creative/configuration.py`: preferências de consultas online. `services/api/app/creative/security.py`: controles de arquivos SVG.

## Fontes oficiais de apoio

- Direitos: https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados/direito-dos-titulares
- Pinterest: https://policy.pinterest.com/en/developer-guidelines

O texto é original, baseado nos fluxos examinados. Não representa certificação jurídica, auditoria de segurança ou aprovação da aplicação pelo Pinterest.

## Pendências para o responsável e revisão jurídica

- Confirmar a identificação jurídica do responsável (nome completo ou razão social e demais dados aplicáveis). A única identificação fornecida é a marca Best Creations; não foram inventados CNPJ ou endereço.
- Confirmar necessidade de encarregado e canal específico conforme o enquadramento. O canal publicado e funcional para solicitações é o WhatsApp institucional já autorizado; não foi inventado e-mail.
- Validar bases legais, procedimentos de atendimento e critérios de retenção de conversas/backups. Não foi inventado prazo universal de exclusão.
- Revisar operadores, possíveis transferências internacionais e a configuração real de logs/cookies da hospedagem e de serviços opcionais.
- Submeter o texto à revisão jurídica para adoção definitiva. A publicação solicitada não certifica conformidade.
- Antes de ativar Pinterest OAuth, confirmar aprovação, escopos/endpoints efetivos, destino e proteção de tokens, retenção e mecanismo concreto de desconexão/exclusão. Atualizar a política antes de oferecer a integração.

## Manutenção

O conteúdo integral fica em `src/data/privacy-policy.ts`; a apresentação fica em `src/app/politica-de-privacidade`. A URL antiga `/privacidade` redireciona para a nova rota. Rodapé, formulário e sitemap apontam para a nova URL. O canonical usa o domínio configurado ou o domínio público confirmado, sem alterar as configurações de domínio ou credenciais.

## Validação local desta versão

- Build de produção concluído com TypeScript e pré-renderização da nova rota.
- 42 testes Vitest aprovados.
- Cinco testes Playwright específicos aprovados contra o build de produção: acesso HTTP 200 sem autenticação, redirecionamento HTTP 308 da URL antiga, 12 seções, título, canonical, idioma, rodapé, âncoras, contato e ausência de violações axe WCAG A/AA nas regras executadas.
- Layout sem overflow horizontal em 320, 390, 768 e 1440 px. Capturas de desktop, mobile e seção Pinterest inspecionadas em `artifacts/privacy-*.png` (arquivos locais de QA, ignorados pelo Git).
- As oito rotas existentes verificadas (`/`, serviços, projetos, estúdio, orçamento e três demos) retornaram HTTP 200; o sitemap inclui a nova política.
- Não foram executadas autenticação Pinterest, chamadas à API Pinterest ou mensagens reais de contato. Os testes não constituem certificação jurídica ou de acessibilidade.

Os testes específicos estão em `tests/e2e/privacy.spec.ts` e também fazem parte da suíte padrão `npm run test:e2e`. A execução desta validação utilizou uma configuração temporária em `artifacts` para apontar ao build de produção local.

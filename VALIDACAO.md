# Verificação — Best Creations Experience Showroom

Revisão concluída em 21 de outubro de 2026, America/Sao_Paulo. Entrega local, sem publicação. Este relatório substitui os números da etapa anterior e registra a aplicação com showroom e três demos funcionais.

## Resultados executados

| Verificação                                    | Resultado                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------ |
| `npm run lint`                                 | Aprovado, sem erros ou avisos                                                  |
| `npm run typecheck`                            | Aprovado                                                                       |
| `npm run format:check`                         | Aprovado                                                                       |
| Prettier adicional de `docs` e `scripts/*.mjs` | Aprovado                                                                       |
| `npm run test`                                 | 42 testes aprovados em 3 arquivos                                              |
| `npm run test:e2e`                             | 46 aprovados; zero falhas, instabilidades ou testes ignorados                  |
| `npm run build`                                | Aprovado; geração de 37 páginas e recursos estáticos concluída                 |
| Inspeção complementar no build de produção     | 15 capturas; sem overflow horizontal, imagens quebradas ou exceções JavaScript |
| Axe complementar em produção                   | Zero violações detectadas nas cinco páginas auditadas                          |

O relatório Playwright confirma `total: 46`, `expected: 46`, `unexpected: 0`, `flaky: 0`, `skipped: 0`, `ok: true`. Arquivo: `playwright-report/index.html`; resultado resumido em `test-results/.last-run.json`. Lint, TypeScript e formatação foram conferidos novamente após o ajuste de formatação dos arquivos finais.

Ambiente: Windows, Node.js 24.15.0, Next.js 16.4.2, React 19.3.1, Google Chrome e Lighthouse 13.5.0. As versões resolvidas estão no `package-lock.json`. Booking e Restaurant são renderizados por requisição para receber a data atual de São Paulo; seus calendários não ficam congelados no build.

## Lighthouse real no build de produção

Auditorias locais com emulação mobile, executadas em sequência no `next start`, porta 3011, sem outra suíte pesada concorrente. Os arquivos JSON registram as condições e o horário UTC da medição.

| Página            | Performance | Acessibilidade | Boas práticas | SEO        | LCP   | CLS | TBT   |
| ----------------- | ----------- | -------------- | ------------- | ---------- | ----- | --- | ----- |
| `/projetos`       | 92          | 100            | 100           | 100        | 3,2 s | 0   | 90 ms |
| `/lab/restaurant` | 92          | 100            | 100           | Não medido | 3,4 s | 0   | 90 ms |

As categorias solicitadas atingiram as metas nas amostras medidas. SEO foi omitido da medição da demo porque as rotas `/lab` têm `noindex` intencional. Os números pertencem somente às URLs acima; não são pontuações atribuídas às demais rotas, dados de visitantes reais ou garantia de desempenho em produção. LCP ainda pode melhorar e deve ser acompanhado após o deploy.

Relatórios completos:

- `artifacts/showroom/lighthouse-showroom-mobile.report.html` e `.json`.
- `artifacts/showroom/lighthouse-restaurant-mobile.report.html` e `.json`.

A tentativa inicial de usar `npm exec --offline` não encontrou a entrada do pacote no cache. A medição foi concluída usando a instalação local já existente do Lighthouse 13.5.0, sem adicionar dependência ao projeto.

## Cobertura funcional

- **Marca e navegação preservadas:** BC compartilhado, entrada da homepage, ausência de repetição ao voltar por navegação interna, redução de movimento, favicon e imagem social; menu fullscreen, Escape, ciclo de foco, retorno ao botão, bloqueio do fundo, previews por foco/hover e links.
- **Serviços e orçamento:** sete categorias e entregáveis, seleção mobile, links contextuais; validação por etapa, avançar/voltar, preservação, revisão, cópia e comportamento com WhatsApp ausente/configurado. Destinos do WhatsApp foram interceptados; nenhuma mensagem real foi enviada.
- **Showroom:** filtros, contagem por categoria, seleção direta, anterior/próximo, teclado, retenção de foco, gesto de swipe com alternativa visível, links reais, oito cases selecionados e tratamento de imagem indisponível. Sem autoplay.
- **Cases:** correspondência de conteúdo e links, imagens carregadas, galerias com materiais distintos, ampliação, Escape e retorno de foco, referência no formulário e 404 para slug desconhecido. As três URLs de conceitos anteriores continuam identificadas e fora da curadoria.
- **CRM:** criação, busca, filtros, edição, exclusão, indicadores derivados, pipeline, histórico, tarefas, notificações e restauração.
- **Booking:** serviço, profissional, datas, horários, validação, sobreposição por duração, revisão, criação simulada, listagem, cancelamento e reset. Profissionais diferentes têm disponibilidade independente.
- **Restaurant:** categorias, adição, quantidade, remoção, subtotal em centavos, pedido simulado, retorno de foco após limpar o carrinho, reserva fictícia e restauração. Verificação de ausência de requisições a serviços externos nos fluxos exercitados.
- **Domínio e componentes:** esquemas Zod, reducers, valores inválidos, datas de calendário, conflitos de horários, cálculos monetários, estados vazios e fallback de preview.

Os 42 testes Vitest são regras e componentes; os 46 E2E usam Chrome e servidor isolado em 3100 com saída `.next-e2e`. As capturas finais, axe complementar e Lighthouse usaram o build otimizado em 3011. Os dados de contato usados pelo runner não foram incorporados à configuração comercial.

## Responsividade e inspeção visual

A suíte cobre larguras entre 320 e 1920 px. As quatro novas experiências foram verificadas em 320, 375, 390, 430, 768, 1024 e 1440 px. Os 11 cases, incluindo os conceitos preservados, foram exercitados em mobile. Há fluxos completos das três demos em 320 px, além de teclado, redução de movimento, orientação e zoom cobertos pelas verificações institucionais.

A inspeção complementar final capturou showroom, My Expenses e as três demos em 1440, 390 e 320 px. Todas as 15 capturas tiveram imagens carregadas e ausência de overflow; não foram registradas exceções JavaScript. O axe foi executado nas cinco rotas em 1440 px com regras WCAG 2 A/AA, 2.1 AA e 2.2 AA, sem violações detectadas. O JSON está em `artifacts/showroom/production-audit.json`.

Capturas desktop e mobile foram abertas e inspecionadas. Os ajustes incluíram espaçamento sob o cabeçalho fixo, quebra de títulos, alinhamento dos controles, contraste do Booking, enquadramento das demos, foco após ações e escape XML dos diagramas. Evidências: `artifacts/showroom/showroom-1440.png`, `showroom-320.png`, `crm-1440.png`, `booking-320.png`, `restaurant-390.png` e demais arquivos da pasta.

Para reproduzir as 15 capturas e o axe complementar com servidor ativo:

```powershell
$env:PREVIEW_URL='http://127.0.0.1:3005'
node scripts/capture-showroom.mjs
```

Isso não substitui teste manual com leitores de tela, smartphones físicos ou certificação de acessibilidade. As pastas de evidências são ignoradas pelo Git e não compõem o deploy.

## Veracidade, imagens e isolamento

Os oito repositórios fornecidos foram inspecionados por metadados, árvores de arquivos, documentação e código relevante. Cinco entraram na coleção. A [auditoria](docs/portfolio-audit.md) registra revisões, links de origem e diferenças entre código implementado, documentação e planejamento. As aplicações de origem e suas suítes não foram executadas nem homologadas nesta tarefa.

As páginas públicas de My Expenses e Pri Beauty responderam HTTP 200 e foram capturadas sem login. Não houve pagamento, cadastro, acesso a contas, dados de pacientes, uso de chaves ou execução dos controles operacionais do projeto financeiro experimental. EasyDiet usa pedidos em memória e pagamento simulado; Sepse permanece pesquisa sem validação clínica; não foram prometidos resultados financeiros ou comerciais.

As três demos são interfaces funcionais isoladas, com dados fictícios em memória React, sem persistência, login ou integrações de produção. Recarregar ou sair descarta mudanças. Pedidos e reservas são simulações explícitas. As imagens gastronômicas foram criadas com image_gen e identificadas; diagramas são apresentados como diagramas, nunca como capturas reais. [Créditos e prompts](docs/media-credits.md).

## Pendências para publicação

- Configurar domínio, WhatsApp e e-mail comerciais confirmados em `.env.local` ou na Vercel, e gerar novo build.
- Sem domínio, o aviso de `metadataBase` local do Next.js é esperado; canonical não é inventado.
- Recursos internos dos projetos, integrações e eventuais novos materiais dependem de configuração e autorização próprias; não estão implicitamente homologados pelo showroom.
- Não houve deploy, teste em dispositivo físico ou medição de Core Web Vitals em campo. Instruções de publicação estão no [README](README.md).

O código, os assets otimizados, os estudos de caso, as três demos e a documentação estão disponíveis na pasta do projeto. Nenhuma credencial ou contato comercial foi inventado.

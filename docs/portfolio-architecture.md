# Showroom — arquitetura e manutenção

O showroom amplia a aplicação existente. Homepage, monograma animado, menu fullscreen, serviços, estúdio e fluxo de orçamento foram preservados. O acesso da homepage agora aponta explicitamente para o showroom.

## Rotas

| Rota                                          | Responsabilidade                                                                |
| --------------------------------------------- | ------------------------------------------------------------------------------- |
| `/projetos`                                   | Coleção editorial: filtros, seleção, anterior/próximo, teclado e swipe opcional |
| `/projetos/[slug]`                            | Contexto, evidências, recursos, stack, galeria, links e CTA comercial           |
| `/lab/crm`                                    | Clientes fictícios, pipeline, tarefas, histórico e indicadores                  |
| `/lab/booking`                                | Serviços, profissionais, calendário, horários, simulação e cancelamento         |
| `/lab/restaurant`                             | Cardápio, carrinho, subtotal, pedido e reserva simulados                        |
| `/iniciar-projeto?servico=...&referencia=...` | Orçamento com categoria e descrição inicial baseadas em um projeto válido       |

As oito experiências selecionadas são My Expenses, Pri Beauty, EasyDiet, Detecção de Sepse, Binance AI Research, Best CRM, Best Booking e Best Restaurant. As três últimas são demos autorais. Cantinho do Luiz, Essência e Data Intelligence permanecem como conceitos nas URLs anteriores, fora da curadoria principal e com `noindex`. My Expenses e EasyDiet mantêm suas URLs anteriores com o conteúdo agora auditado.

## Conteúdo e evidências

`src/data/projects.ts` contém a seleção tipada; `src/types/index.ts` define o contrato. Cada item possui ID, slug, categoria principal e categorias de filtro, tipo, status, descrição, desafio, solução, recursos, stack, imagens, links quando existentes, destaque e ordem. Os projetos reais registram a data, revisão e caminhos da auditoria.

Os campos separam recursos implementados, documentados, planejados e limitações. A existência do código não é tratada como homologação operacional ou entrega comercial. Cada imagem informa tipo e legenda: captura real, diagrama ou estudo demonstrativo. Os conceitos antigos estão separados em `src/data/legacy-projects.ts` e agregados apenas para manter suas páginas acessíveis.

`docs/portfolio-audit.md` registra a inspeção dos oito repositórios, as fontes, pendências e a decisão de curadoria. A integração com GitHub é editorial: o código foi auditado pelo conector e os cases oferecem links reais. A aplicação não depende de tokens nem consulta a API do GitHub em tempo de execução. Novas revisões exigem nova leitura das evidências antes de alterar as afirmações do portfólio.

## Renderização e carregamento

As páginas da coleção e dos cases são componentes de servidor. A coleção envia ao componente client apenas os campos necessários à vitrine e a primeira imagem de cada projeto; descrições técnicas completas e os dados dos conceitos antigos não são empacotados no navegador da coleção.

O menu recebe somente a imagem de preview do projeto destacado. Cada demo fica em sua própria rota e componente client. Suas regras, fixtures e imagens não são importadas pela homepage. O App Router separa os bundles das rotas; nenhuma aplicação externa é incorporada em iframe.

Best CRM é determinístico e pode ser pré-renderizado. Booking e Restaurant usam `connection()` no servidor para obter a data de São Paulo a cada requisição e passá-la como snapshot inicial ao client. Isso evita congelar o calendário no dia do build e evita divergência de datas entre servidor e hidratação. Essa renderização não cria uma API de negócio, conta ou banco de dados.

As imagens usam `next/image`, dimensões explícitas e carregamento tardio no conteúdo secundário. As fotografias da demo estão em WebP. Os diagramas são SVGs originais de baixa complexidade. Não foram adicionadas bibliotecas de gráficos, WebGL, motion ou novas dependências de aplicação.

## Interações da coleção

- Filtros locais não recarregam a página e reiniciam a posição na categoria.
- O contador corresponde à seleção filtrada; categorias vazias têm estado próprio e retorno à coleção.
- Anterior/próximo circulam somente nos itens filtrados. Não há autoplay.
- As setas funcionam com foco na coleção; a troca a partir do link da imagem preserva o foco na região.
- O swipe considera deslocamento horizontal e oferece sempre botões equivalentes; a rolagem vertical permanece normal.
- Uma imagem ausente ou com falha recebe fallback. Isso não remove o texto ou o acesso ao case.
- A galeria usa imagens distintas, legendas, controles visíveis e ampliação por diálogo nativo com Escape, ciclo e retorno de foco. Projetos com uma imagem não simulam uma galeria maior.
- CSS de direção artística fica em `src/app/projetos/showroom.css`; movimento reduzido é respeitado.

## Best CRM

`src/lib/lab/crm.ts` centraliza o cenário e as regras. Um reducer cria, edita, exclui, move etapas, registra histórico, adiciona tarefas, alterna conclusão e restaura fixtures. Oportunidades são armazenadas em centavos; indicadores e barras são derivados do estado, nunca números decorativos.

O app oferece visão geral, clientes, pipeline e tarefas. Busca, etapa e segmento filtram os registros; os indicadores da área de clientes refletem o filtro. Os nomes e empresas iniciais são fictícios. E-mails são opcionais e aceitam somente o domínio reservado `.example`. O formulário usa Zod. A exclusão e a troca de etapa preservam um ponto de foco estável; os diálogos possuem retorno de foco mesmo quando o botão original deixa de estar disponível.

## Best Booking

`src/lib/lab/booking.ts` contém serviços, profissionais, fixtures, esquema de dados, criação e cálculo de disponibilidade. O calendário aceita de amanhã até 30 dias após o início da sessão. A faixa de dias, os controles de semana e o campo de data são alternativas visíveis.

Um horário é bloqueado quando o intervalo do novo serviço se sobrepõe a um agendamento ativo do mesmo profissional e dia. A duração do serviço participa do cálculo. Profissionais diferentes permanecem independentes e cancelamentos liberam os horários. A submissão repete a validação para evitar aceitar uma escolha indisponível.

O fluxo tem três etapas: cuidado, horário e revisão. A confirmação é explicitamente simulada. A área de agendamentos permite consultar, cancelar e restaurar o cenário, sem mensagens ou reservas comerciais.

## Best Restaurant

`src/lib/lab/restaurant.ts` contém o cardápio fictício, preços em centavos, reducer do carrinho, cálculo de subtotal e esquema da reserva. Quantidades vão de 1 a 20; remoção e decremento para zero eliminam o item. Itens ou quantidades desconhecidos não participam do cálculo.

O restaurante conceitual Oliva possui linguagem visual própria. As quatro imagens gastronômicas foram geradas para a demo. O pedido salva um resumo somente na memória da sessão e limpa o carrinho; nenhum pagamento, WhatsApp ou backend é acionado. A reserva valida nome fictício, data, horário e quantidade de pessoas e informa que nenhuma mesa real foi reservada.

## Isolamento e privacidade

As demos usam somente estado React em memória. Não há login, cookies de aplicação, localStorage, IndexedDB, banco, analytics, providers de IA ou chamadas a serviços de produção. Navegar entre áreas da mesma demo preserva o cenário; recarregar, sair da rota ou restaurar descarta as alterações. Elas não acessam os bancos dos projetos auditados.

`DemoDialog` compartilha foco, Escape e bloqueio de rolagem. `useDemoReady` marca a hidratação para os testes e capturas; não adiciona espera artificial nem conteúdo técnico ao fluxo do visitante. A política de privacidade foi atualizada para explicar o comportamento das demos e os links externos.

## Materiais visuais

| Projeto     | Material utilizado                                                                      |
| ----------- | --------------------------------------------------------------------------------------- |
| My Expenses | Capturas desktop/mobile da página pública, sem autenticação                             |
| Pri Beauty  | Capturas da área de procedimentos, sem republicar fotos de clientes                     |
| EasyDiet    | Diagrama app/API/admin baseado no código                                                |
| Sepse       | Diagramas de pipeline e assistente acadêmico, sem dados ou inferência clínica           |
| Binance AI  | Captura histórica do relatório público e diagrama de observação; sem contas ou operação |
| Demos       | Capturas das interfaces funcionais implementadas nesta aplicação                        |

`scripts/generate-portfolio-diagrams.mjs` reproduz os quatro diagramas e escapa caracteres XML. `scripts/capture-lab-previews.mjs` captura os componentes de demonstração em 1360 × 900 e 390 × 844, aguardando hidratação. O cabeçalho institucional e os controles do modo de desenvolvimento são excluídos somente do enquadramento dessas capturas, que representam o produto demonstrativo. Execute com um servidor ativo e `PREVIEW_URL` para escolher a URL.

Créditos, caminhos e prompts estão em `docs/media-credits.md` e `docs/media-prompts.json`. Capturas completas para QA ficam em `artifacts/showroom/` e no relatório Playwright; não são artefatos de deploy.

## Adicionar um projeto

1. Audite README, implementação e recursos; registre fontes, revisão e limites.
2. Adicione um item tipado ao catálogo com slug único, classificação e ordem coerente.
3. Inclua somente URLs existentes e materiais autorizados. Um diagrama deve permanecer identificado como diagrama.
4. Só forneça `demoUrl` quando a rota executar as ações prometidas. Uma prévia estática não recebe o CTA Experimentar.
5. Configure categoria do orçamento e verifique a referência pré-preenchida.
6. Atualize os testes e execute lint, TypeScript, Vitest, build e Playwright. Inspecione desktop e mobile antes de publicar.

Não são necessários serviços adicionais para implantar na Vercel. As variáveis comerciais existentes continuam em `.env.example`; configure apenas dados oficiais e gere novo build. As demos permanecem fictícias independentemente da configuração do WhatsApp institucional.

# Best Creations — Digital Experience & Showroom

Website premium em Next.js App Router, TypeScript e Tailwind CSS, com navegação por ambientes e um showroom de projetos reais auditados e demos autorais funcionais. A homepage compacta, o monograma animado, o menu fullscreen, serviços e orçamento foram preservados.

## Executar

Requer Node.js 20.9 ou superior, npm e Google Chrome para os testes de navegador. Ambiente utilizado: Node 24 no Windows.

```powershell
npm.cmd ci
Copy-Item .env.example .env.local
npm.cmd run dev -- --port 3005
```

Abra `http://127.0.0.1:3005`. `npm.cmd` evita bloqueios de execução do `npm.ps1`. Em outros sistemas, use `npm` e a ferramenta local para copiar o arquivo de ambiente.

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
npm run start -- --port 3005
```

## Navegação

| Rota               | Experiência                                                                        |
| ------------------ | ---------------------------------------------------------------------------------- |
| `/`                | Entrada cinematográfica, monograma BC e acesso visual ao showroom                  |
| `/servicos`        | Exploração das sete especialidades e entregáveis completos                         |
| `/projetos`        | Coleção com filtros, previews amplos, controles, teclado e swipe opcional          |
| `/projetos/[slug]` | Estudo de caso, evidências, recursos, stack, galeria, links e orçamento contextual |
| `/lab/crm`         | CRM com clientes, pipeline, tarefas, histórico e indicadores fictícios             |
| `/lab/booking`     | Serviços, profissionais, calendário e agendamentos simulados                       |
| `/lab/restaurant`  | Restaurante conceitual com cardápio, carrinho, pedido e reserva simulados          |
| `/estudio`         | Filosofia, diferenciais, processo, segmentos e FAQ                                 |
| `/iniciar-projeto` | Formulário progressivo: solução → ideia → contato → revisão → mensagem             |
| `/privacidade`     | Tratamento dos dados, demos e links externos                                       |

O menu usa diálogo nativo, foco inicial, ciclo de Tab/Shift+Tab, fundo inerte, bloqueio da rolagem, Escape e retorno de foco. Seus previews respondem a hover e teclado. A versão mobile possui hierarquia própria. A coleção não tem autoplay, scroll hijacking ou dependência de gestos ocultos.

## Curadoria auditada

A coleção inicial possui cinco projetos reais e três demos. Código implementado não implica integração homologada, resultado comercial ou entrega a um cliente.

| Projeto             | Estado e apresentação                                                                                                                  |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| My Expenses         | Produto autoral com página pública; stack, finanças, auth e billing identificados no código. Sem teste de pagamento ou acesso a contas |
| Pri Beauty          | Website público; procedimentos, catálogo e galeria confirmados. Capturas sem fotos de clientes ou contatos pessoais                    |
| EasyDiet            | Piloto Expo/FastAPI/Next.js; pedidos em memória e pagamento simulado. Diagrama identificado como arquitetura                           |
| Detecção de Sepse   | Pesquisa acadêmica; pipeline, API e assistente experimental. Sem validação clínica ou inferência oferecida no showroom                 |
| Binance AI Research | Pesquisa, integração de fontes e observabilidade. Captura histórica e diagrama; sem contas ou execução de operações                    |
| Best CRM            | Demo autoral funcional com dados fictícios                                                                                             |
| Best Booking        | Demo autoral funcional com dados fictícios                                                                                             |
| Best Restaurant     | Demo autoral funcional com dados fictícios e imagens geradas                                                                           |

Your Food, chatbotAI e PDF Reader foram avaliados e ficaram fora da seleção inicial. Os conceitos anteriores Cantinho do Luiz, Essência e Data Intelligence continuam em suas URLs, identificados como conceitos, fora da curadoria e com `noindex`. My Expenses e EasyDiet preservam seus slugs.

Leia [a auditoria dos oito repositórios](docs/portfolio-audit.md). Ela separa implementado, documentado, planejado e demonstrativo, com revisões, fontes, execução de origem, testes existentes, riscos e pendências. As suítes dos repositórios de origem não foram executadas nesta tarefa. A aplicação não consulta o GitHub em tempo de execução nem usa tokens: os dados são editoriais, baseados na inspeção e em links reais.

## Demos isoladas

As três demos usam estado React em memória, sem login, banco de produção, cookies de aplicação, localStorage, providers de IA ou integrações externas. Alterações persistem entre as áreas da mesma demo, mas são descartadas ao recarregar, sair ou restaurar o cenário. Use apenas dados inventados.

- **CRM:** criar/editar/excluir, busca, filtros, etapas, histórico, tarefas e métricas derivadas do estado. E-mails opcionais devem terminar em `.example`. Valores são oportunidades fictícias, calculadas em centavos.
- **Booking:** três etapas, profissionais fictícios, campo de data e calendário com controles visíveis, horários com bloqueio de sobreposição por duração, revisão, criação simulada, consulta, cancelamento e reset.
- **Restaurant:** quatro pratos, categorias, quantidades, remoção e subtotal em centavos; resumo de pedido sem cobrança ou envio; reserva fictícia com validação de data e pessoas.

As demos têm identidades próprias, com retorno ao showroom e ao case. Todo CTA Experimentar aponta para uma interface funcional. Imagens estáticas e diagramas não são chamados de demos.

## Arquitetura e desempenho

- `src/app`: rotas, páginas de servidor, SEO e layouts.
- `src/components/layout`: navegação, marca, footer e breadcrumbs.
- `src/components/projects`: coleção, imagens com fallback e galeria acessível.
- `src/components/lab`: interfaces isoladas e diálogo compartilhado.
- `src/components/forms`: orçamento progressivo com validação e referência do case.
- `src/data/projects.ts`: catálogo tipado e dados auditados; conceitos antigos ficam em `legacy-projects.ts`.
- `src/lib/lab`: regras, fixtures, cálculos em centavos e calendários.
- `public/portfolio`: capturas reais, capturas das demos e diagramas identificados.
- `public/lab/food`: quatro imagens originais da demo gastronômica em WebP.
- `tests`: regras, componentes, fluxos e QA responsivo.

A coleção e os cases são renderizados no servidor. O explorador recebe somente os campos usados na vitrine, e o menu recebe uma imagem de preview. As demos ficam em bundles próprios; não carregam suas regras na homepage. Booking e Restaurant recebem uma data inicial de São Paulo calculada por requisição, com `connection()`, evitando calendários congelados no build e divergência de hidratação. Não há backend de negócio para as simulações.

`next/image` fornece dimensões, otimização e lazy loading. A arte institucional usa SVG/CSS, `transform` e `opacity`, com `prefers-reduced-motion`. Não há WebGL, biblioteca de gráficos ou motion adicionada. Os controles permanecem funcionais durante transições.

[Arquitetura detalhada e manutenção](docs/portfolio-architecture.md).

## Marca e imagens

Paleta institucional: #0B0B0B, #171717, #C9A44C/#E4C780, #F6F2E9 e #AAA7A0. Manrope, Inter e Cormorant Garamond usam `next/font` e são servidas pela aplicação após o build.

O monograma BC possui geometria compartilhada em `src/data/brand.ts`. Cabeçalho, menu, favicon, imagem social e composição principal usam os mesmos traçados. Na homepage, as peças se aproximam e recebem um reflexo; a sequência termina em 3,4 segundos, não reinicia ao voltar pela navegação interna e respeita redução de movimento. O vetor independente está em `public/brand/best-creations-symbol.svg`. A marca foi criada para esta implementação, sem alegação de registro.

A referência Ferrari orientou escala e acabamento; não foram copiados seus ativos ou conteúdo. As imagens gastronômicas foram criadas com a ferramenta nativa image_gen exclusivamente para a demo fictícia. Prompts, caminhos e fontes das capturas estão em [créditos de mídia](docs/media-credits.md) e [prompts completos](docs/media-prompts.json).

Para reproduzir os diagramas e capturas das demos:

```powershell
node scripts/generate-portfolio-diagrams.mjs
$env:PREVIEW_URL='http://127.0.0.1:3005'
node scripts/capture-lab-previews.mjs
node scripts/capture-showroom.mjs
```

Os comandos de captura requerem servidor ativo e Chrome. As prévias aguardam a interface pronta e geram seis WebPs do produto demonstrativo, sem incorporar o cabeçalho institucional ao enquadramento. `capture-showroom.mjs` salva quinze capturas completas e um relatório de imagens, overflow, exceções e axe em `artifacts/showroom/`. Não substitua materiais oficiais por capturas conceituais. O gerador antigo `generate-project-visuals.mjs` é usado somente nos estudos ilustrativos de serviços e conceitos anteriores.

## Contatos e orçamento

Configure dados confirmados em `.env.local` ou na hospedagem:

| Variável                      | Uso                                | Sem valor válido                                  |
| ----------------------------- | ---------------------------------- | ------------------------------------------------- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | DDI + DDD + número, apenas dígitos | Resumo copiável e Instagram oficial               |
| `NEXT_PUBLIC_SITE_URL`        | Domínio oficial absoluto           | Canonical omitido e sitemap sem domínio presumido |
| `NEXT_PUBLIC_CONTACT_EMAIL`   | E-mail comercial                   | Endereço omitido                                  |

Variáveis `NEXT_PUBLIC_*` são públicas e incorporadas ao build. Nunca use segredos nelas; recompile após alterar. O único contato previamente confirmado é o Instagram oficial.

Os CTAs dos cases levam `servico` e `referencia` ao orçamento. Apenas serviços válidos e slugs conhecidos são aceitos. A descrição inicial cita o projeto e pode ser editada. Avançar e voltar preserva as respostas; recarregar descarta o formulário.

O visitante revisa a mensagem antes de abrir o WhatsApp. A confirmação de envio ocorre no WhatsApp; abrir a conversa não significa enviar. Sem número válido, há resumo copiável e alternativa pelo Instagram. Nenhuma demo utiliza o WhatsApp institucional.

Sem domínio configurado, o Next.js avisa sobre o fallback local de `metadataBase` nas imagens sociais. Configure `NEXT_PUBLIC_SITE_URL` antes da publicação. Sitemap, robots, metadados e canonicals estão preparados; as rotas de laboratório têm `noindex`.

## Verificação

Vitest cobre regras e componentes. Playwright usa Chrome e um servidor isolado na porta 3100, com saída `.next-e2e`, dados de contato de teste e links de WhatsApp interceptados. Nenhuma mensagem real é enviada.

Os testes cobrem navegação, filtros, cases, imagens, galeria, orçamento contextual, CRUD, indicadores, calendário, conflitos, cancelamentos, carrinho, totais, reservas, reset, teclado, redução de movimento, axe e layouts de 320 a 1920 px. Os novos fluxos de demo também são exercitados em 320 px. Capturas são inspecionadas visualmente.

Resultados efetivos e limitações estão em [VALIDACAO.md](VALIDACAO.md). O relatório navegável fica em `playwright-report/index.html`, com screenshots em `test-results/`. Capturas adicionais ficam em `artifacts/showroom/`. Essas pastas são ignoradas pelo Git. Verificação automatizada não equivale a certificação de acessibilidade nem a teste em smartphones físicos.

## Deploy na Vercel

1. Importe esta pasta com preset Next.js.
2. Configure apenas domínio e contatos oficiais nas variáveis de ambiente.
3. Execute o build padrão `npm run build`.
4. Associe o domínio, confira `NEXT_PUBLIC_SITE_URL` e gere novo deploy.
5. Revise os links externos, as evidências e a política de privacidade antes da divulgação.

Não é necessário configurar banco ou chaves para as demos. O site foi entregue localmente, sem publicação automática. Contatos institucionais, domínio e materiais internos adicionais autorizados continuam pendentes; isso não impede experimentar os cenários fictícios.

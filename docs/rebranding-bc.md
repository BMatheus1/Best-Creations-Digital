# Rebranding Bc.

## Diagnóstico

O site usa Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, CSS personalizado, Lucide, fontes locais no build, Vitest e Playwright. O layout reúne cabeçalho, menu imersivo, rodapé e contato por WhatsApp. O monograma geométrico anterior era compartilhado entre a marca, as artes, o favicon e as imagens sociais. A animação de montagem e reflexo dependia dessa geometria e era verificada pelos testes de marca.

O inventário inclui home, serviços, showroom, páginas individuais de projetos, estúdio, orçamento, política de privacidade, redirecionamento de privacidade, três laboratórios, estados de erro e carregamento, favicon, imagens sociais, sitemap e robots. Não existe uma rota `/links`.

## Identidade

- O Bc. foi traçado em curvas Bézier a partir das referências raster fornecidas. O B, o c e o ponto são caminhos independentes, com proporções e alinhamento derivados da composição dividida aprovada.
- `src/data/brand.ts` reúne os contornos e a paleta. `BrandMark` oferece marca circular e aplicações brancas ou pretas. Os arquivos SVG estáticos exportam o selo circular para favicon e uso independente.
- `StudioArtwork` apresenta a composição dividida no hero, estúdio e preview do menu. As ilustrações de interface, dados, manutenção e contato continuam disponíveis com acabamento monocromático.
- A entrada do hero revela a divisão e as letras em cerca de um segundo. O controle existente evita repetição no retorno por navegação interna e respeita a preferência por movimento reduzido.
- Os estilos institucionais usam tokens semânticos de fundo, superfície, texto, borda, interação e foco. As capturas de projetos, os estilos internos das demos e as cores de validação continuam representando seus respectivos produtos e estados.

## Arquivos e componentes

| Área                     | Arquivos                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Identidade               | `src/data/brand.ts`, `src/data/company.ts`, `src/components/ui/Brand.tsx`, `src/components/visuals/BrandMark.tsx`, `src/components/visuals/StudioArtwork.tsx`                               |
| Navegação e apresentação | `src/components/layout/Header.tsx`, `src/components/services/ServiceExplorer.tsx`, `src/app/page.tsx`, `src/app/layout.tsx`, `src/app/estudio/page.tsx`, `src/app/iniciar-projeto/page.tsx` |
| Estilos                  | `src/app/globals.css`, `src/app/projetos/showroom.css`, `src/app/politica-de-privacidade/privacy.css`, `src/app/lab/lab.css`, `src/app/error.tsx`, `src/app/not-found.tsx`                  |
| Ativos                   | `public/brand/best-creations-symbol.svg`, `src/app/icon.svg`, `src/app/opengraph-image.tsx`, `src/app/projetos/[slug]/opengraph-image.tsx`                                                  |
| Verificação              | `tests/e2e/brand.spec.ts`, `tests/e2e/site.spec.ts`, `README.md`                                                                                                                            |

## Validação visual

Capturas locais em `artifacts/bc-rebrand` incluem a home em 390, 768, 1440 e 2560 px, o menu aberto, o showroom, My Expenses, serviços, orçamento, estúdio, privacidade e a imagem Open Graph. A home foi comparada às capturas históricas em `artifacts/redesign`. O símbolo agora tem uma área própria, separado do título tanto no desktop quanto no celular. A medição do hero em 320, 390, 768, 1920 e 2560 px encontrou o texto e o símbolo separados, com a largura da página contida na viewport.

O primeiro build revelou que o renderizador Open Graph aceita apenas elementos SVG nativos dentro do vetor. A imagem social passou a consumir os contornos compartilhados diretamente em elementos SVG e foi renderizada com sucesso no build seguinte.

## Testes

- TypeScript, ESLint, Prettier e build de produção aprovados.
- 42 testes Vitest de componentes, orçamento e laboratórios aprovados.
- 51 cenários Playwright em Chrome aprovados, incluindo acessibilidade com axe, navegação e foco do menu, seleção de serviços, galeria, fluxos das demos, orçamento com WhatsApp interceptado, política de privacidade e rotas.
- Os 8 cenários da suíte específica de acessibilidade também passaram na execução separada.
- Os testes da assinatura verificam o B, o c e o ponto, a revelação da divisão, o enquadramento, o retorno sem repetir a animação e a preferência por movimento reduzido.
- A suíte do navegador usou o build local e um número de teste. Os binários das dependências foram executados diretamente pelo Node porque o executável npm não estava disponível.

## Escopo da entrega

A implementação está na branch local `codex/bc-rebrand`. A verificação foi feita com Chrome e build local. Os contornos são uma vetorização da referência PNG, pois o arquivo vetorial original da marca não foi fornecido. A medição de performance em produção fica fora desta entrega.

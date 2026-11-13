# Catálogo de conceitos

O filtro **Catálogo** abre a vitrine de `/projetos`. As categorias ao lado do catálogo continuam dando acesso ao acervo do showroom e às páginas individuais.

| Conceito                   | Experiência                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| Loja de Roupas by Bc.      | Coleção, variantes, sacola e compra simulada                                    |
| Pizzaria Bc.               | Site com ofertas e app com personalização, carrinho, acompanhamento e histórico |
| Clínica de Estética by Bc. | Tratamentos, profissionais, agendamento e confirmação                           |
| Sistema de Gestão by Bc.   | Resumo, clientes, indicadores, relatórios e atividades                          |
| Arquitetura by Bc.         | Galeria, projetos individuais, escritório e contato                             |
| Academia by Bc.            | Início do aluno, treino, exercícios, agenda, evolução e perfil                  |

A galeria começa pelo celular e permite alternar para desktop. São 32 prévias de celular e 28 de desktop. As miniaturas WebP são capturas das interfaces React. A galeria oferece setas, teclado, swipe e visualização ampliada. O orçamento valida a referência pelo catálogo e inclui o nome do conceito na mensagem preparada para o WhatsApp.

## Arquivos criados

- `src/data/concepts.ts`
- `src/components/projects/ConceptCatalog.tsx`
- `src/components/projects/ConceptPreview.tsx`
- `src/app/projetos/catalog.css`
- `public/catalogo/` — seis fotografias WebP e 60 miniaturas em `previas/`
- `tests/e2e/catalog.spec.ts`
- `docs/catalogo-conceitos.md`

## Arquivos atualizados

- `src/app/projetos/layout.tsx`
- `src/app/projetos/page.tsx`
- `src/components/projects/ProjectCollection.tsx`
- `src/data/project-filters.ts`
- `src/app/iniciar-projeto/page.tsx`
- `src/components/forms/ProjectWizard.tsx`
- `src/lib/whatsapp.ts`
- `tests/components.test.tsx`
- `tests/e2e/brand.spec.ts`
- `tests/e2e/showroom.spec.ts`
- `tests/e2e/site.spec.ts`
- `src/app/home.css` — transições de fundo e borda e movimento das setas nos quatro atalhos da home

## Fotografias

O ImageGen gerou as seis fotografias a partir de uma descrição, sem imagem de entrada. Cada fotografia foi recortada da montagem e convertida para WebP.

> Photographic contact sheet with six perfectly equal rectangular tiles edge to edge, 3 columns x 2 rows, no gutters, no text, no logos, composed for cropping each tile independently. Top row left: black athletic apparel on female runner in industrial concrete setting, editorial black-white sportswear campaign. Top center: beige luxury spa treatment room with cream linen and olive branches. Top right: overhead artisan margherita pizza on black table with red napkin. Bottom left: modern minimalist concrete residence framed by olive trees, bright architecture editorial. Bottom center: woman athlete lifting dumbbells in graphite gym with restrained acid lime accents. Bottom right: detail of dark sports running shoes on concrete. Photorealistic professional commercial photography, crisp.

As demonstrações usam dados fictícios e estado local. Pagamentos, reservas, pedidos, autenticação e dados operacionais são simulados. Forma reutiliza uma fotografia arquitetônica com enquadramentos diferentes.

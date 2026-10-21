# Materiais visuais do showroom

Revisão de materiais: 21/10/2026. Nenhuma imagem, marca ou ativo da Ferrari foi utilizado.

## Projetos reais

- `public/portfolio/my-expenses-desktop.webp` e `my-expenses-mobile.webp`: capturas da página pública [My Expenses](https://myexpensesfinance.com), sem cadastro, login, conta ou checkout. Os valores já pertencem à apresentação ilustrativa do produto.
- `public/portfolio/pri-beauty-desktop.webp` e `pri-beauty-mobile.webp`: capturas da área de procedimentos do [site público Pri Beauty](https://pri-beauty.mylinkbr.workers.dev/). O enquadramento desktop seleciona a parte superior dessa área. Fotos de clientes, contato e galeria de pessoas não foram importados.
- `public/portfolio/binance-research.webp`: captura histórica de `Bitcoin_AI/reports/phase_6_4_2/dashboard_intelligence.png`, da revisão `7638fe1ed55e333b169543fd5846cf8dea8c72e3` do [repositório](https://github.com/BMatheus1/Binance-AI-project). O material foi inspecionado: não exibe credenciais ou saldo pessoal. Registros e probabilidades pertencem ao experimento e não representam benefício financeiro da Best Creations. O screenshot não é um painel conectado a contas no showroom.
- `public/portfolio/easydiet-architecture.svg`, `sepse-pipeline.svg`, `sepse-assistant.svg` e `binance-architecture.svg`: diagramas autorais, gerados em código a partir do escopo verificado. Não são screenshots das aplicações. Fonte: `scripts/generate-portfolio-diagrams.mjs`.

As capturas são materiais de apresentação dos repositórios fornecidos pelo proprietário. Isso não altera licenças, comprova resultados ou autoriza republicar outros dados pessoais. As referências e revisões completas estão na auditoria.

## Interfaces das demos

`public/portfolio/demo-{crm,booking,restaurant}-{desktop,mobile}.webp` são capturas das interfaces funcionais desta aplicação. O enquadramento privilegia o componente da demo, com os dados fictícios iniciais. Não são imagens inventadas de sistemas atribuídos a clientes.

Para regenerar, inicie a aplicação e execute `node scripts/capture-lab-previews.mjs`. Use `PREVIEW_URL` se o servidor estiver em outra porta. Isso atualiza somente as seis imagens de demonstração. As dimensões são 1360 × 900 e 390 × 844. As fontes PNG de QA ficam em `artifacts/showroom/`, fora do deploy.

## Imagens gastronômicas geradas

Foram criadas quatro imagens novas com a ferramenta nativa **image_gen**, sem API, chave ou CLI. Os originais foram preservados no diretório de imagens geradas do Codex e os arquivos finais foram salvos no projeto em WebP, com largura de 1000 px:

- `public/lab/food/burrata.webp`: burrata, tomates assados, manjericão e azeite.
- `public/lab/food/risoto.webp`: risoto de cogumelos com tomilho.
- `public/lab/food/ravioli.webp`: ravioli de abóbora com manteiga de sálvia e avelãs.
- `public/lab/food/torta.webp`: torta de chocolate com creme de baunilha.

As imagens foram inspecionadas e representam exclusivamente o restaurante fictício. A interface informa que foram geradas e que não correspondem a pratos à venda. Os quatro prompts completos, incluindo composição, iluminação e restrições, estão em [media-prompts.json](media-prompts.json). Não foram usadas imagens geradas para fingir capturas de projetos reais.

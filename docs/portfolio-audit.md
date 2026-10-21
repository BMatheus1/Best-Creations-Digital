# Auditoria do portfólio — Best Creations

Data: 21 de outubro de 2026 (America/Sao_Paulo).

## Método e limites

Leitura dos oito repositórios públicos via conector GitHub: metadados, árvore recursiva, manifestos, READMEs quando existentes e arquivos de implementação selecionados. Os identificadores abaixo registram a revisão retornada pelo GitHub. As URLs públicas foram verificadas por GET sem autenticação: nenhuma conta foi criada, mensagem enviada, cobrança acionada ou sessão operacional iniciada. Não foram executadas as suítes nem os backends dos repositórios de origem. Isso é auditoria estática de escopo, não certificação de segurança nem homologação das aplicações.

**Implementado** significa presença e comportamento verificáveis no código examinado. **Documentado** significa alegação de documentação sem reprodução operacional integral. **Planejado** significa roadmap, preparação ou recurso incompleto. **Demonstrativo** designa as três novas demos locais, sem vínculo com clientes reais. Código implementado não implica entrega comercial ou serviço disponível em produção.

## Curadoria

A coleção inicial reúne os cinco prioritários e três demos autorais independentes: Best CRM, Best Booking e Best Restaurant. Your Food, chatbotAI e PDF Reader foram avaliados, mas não entram automaticamente. As apresentações antigas sem repositório comprovado permanecem acessíveis como conceitos, fora da seleção principal. Os novos dados são editoriais e estáticos; não há tokens ou chamadas GitHub no navegador dos visitantes.

## My Expenses

- **Repositório:** [my_expenses](https://github.com/BMatheus1/my_expenses).
- **Revisão auditada:** `28cfffb4643969a8fdf6da05da344e823cb6975e`.
- **Objetivo:** Organização financeira pessoal com receitas, despesas e acesso autenticado.
- **Tecnologias confirmadas:** Next.js 16, React 19, TypeScript, Tailwind CSS, Capacitor; Python/FastAPI, Pydantic, JWT/bcrypt, psycopg/PostgreSQL.
- **Implementado no código:** Rotas de cadastro, login por senha/Google, verificação e recuperação de e-mail; CRUD de receitas, despesas, categorias e cartões; dependências de usuário e assinatura; componentes de relatórios e rotas de checkout/cancelamento/sincronização. A leitura do código comprova sua presença, não o funcionamento operacional de todos os serviços externos.
- **Documentado, sem reprodução integral:** Publicação em Vercel/Render, Resend, assinatura e distribuição mobile. Não foram testados pagamentos, e-mails transacionais, autenticação real ou builds Android/iOS.
- **Planejado / não comprovado:** Homologação operacional e materiais internos autorizados continuam fora desta auditoria.
- **Status:** Projeto autoral com página pública acessível. Licença proprietária; não é open source.
- **Links reais:** https://myexpensesfinance.com e https://my-expenses-liard.vercel.app responderam HTTP 200 com título My Expenses em 21/10/2026.
- **Potencial comercial:** Finanças, sistemas com contas individuais, relatórios e arquitetura web/mobile.
- **Apresentação recomendada:** Destacar o produto autoral e a arquitetura. Usar somente capturas da página pública sem autenticação. Disponibilizar visita ao produto e ao repositório, sem abrir checkout.
- **Pendências:** Screenshots internos autorizados e teste completo em ambiente dedicado. A existência do código de cobrança não comprova cobrança homologada.
- **Demonstração segura:** Página pública e diagrama de arquitetura. Não cadastrar conta nem acessar dados financeiros de usuários.
- **Cuidados de dados e exposição:** Dados pessoais/financeiros, cookies e integrações de cobrança. Nenhum banco, segredo, envio de e-mail ou transação foi acessado.
- **Execução de origem:** Frontend: npm install e npm run dev em frontend/. Backend: ambiente virtual, requirements.txt e Uvicorn, conforme README. PostgreSQL e variáveis oficiais são necessários. Não executado aqui.
- **Testes de origem:** Há testes em backend/tests/ para autorização, segurança, assinatura e billing; não executados nesta auditoria de código.

**Fontes inspecionadas:**

- [README.md](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/README.md)
- [frontend/package.json](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/frontend/package.json)
- [backend/requirements.txt](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/backend/requirements.txt)
- [backend/app/routes.py](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/backend/app/routes.py)
- [backend/app/auth.py](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/backend/app/auth.py)
- [backend/app/billing_routes.py](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/backend/app/billing_routes.py)
- [frontend/app/components/ReportsView.tsx](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/frontend/app/components/ReportsView.tsx)
- [docs/DATABASE.md](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/docs/DATABASE.md)
- [LICENSE.md](https://github.com/BMatheus1/my_expenses/blob/28cfffb4643969a8fdf6da05da344e823cb6975e/LICENSE.md)

## EasyDiet

- **Repositório:** [EasyDiet](https://github.com/BMatheus1/EasyDiet).
- **Revisão auditada:** `a661cf677af1148d07024d95d8db439d673a12ee`.
- **Objetivo:** Piloto de plataforma de refeições com montagem de pedidos, precificação e gestão operacional.
- **Tecnologias confirmadas:** Expo 54, React Native, TypeScript, Expo Router; Next.js 16/Tailwind no admin; Python/FastAPI, Pydantic. Modelos SQLAlchemy estão declarados, mas o fluxo ativo usa uma lista em memória.
- **Implementado no código:** API GET /catalog, POST /pricing/quote e /orders; consultas administrativas; simulação de aprovação de pagamento; cálculo de dashboard derivado de ORDERS; telas mobile e admin presentes. O armazenamento de pedidos em storage.py é explicitamente volátil.
- **Documentado, sem reprodução integral:** Fluxo guiado mobile, custos/margem/compras/etiquetas no admin; estrutura de banco e Alembic para etapa posterior.
- **Planejado / não comprovado:** Persistência durável, migrações, autenticação administrativa e pagamentos reais não são comprovados pelo fluxo examinado.
- **Status:** Piloto funcional em desenvolvimento, sem deploy público informado.
- **Links reais:** Apenas repositório; nenhuma URL de publicação foi encontrada no README ou nos metadados.
- **Potencial comercial:** Aplicativos de pedidos, catálogo, precificação e painéis de operação.
- **Apresentação recomendada:** Explicar a arquitetura app/API/admin e o escopo de piloto. Não atribuir disponibilidade comercial. Diagramas identificados substituem screenshots inexistentes.
- **Pendências:** Capturas oficiais, implantação, autenticação e persistência. Diferenciar modelos SQLAlchemy preparados de persistência efetivamente usada.
- **Demonstração segura:** Diagrama baseado no código. A demo Best Restaurant é independente e não é um deploy do EasyDiet.
- **Cuidados de dados e exposição:** Endpoints administrativos examinados não têm dependência de autenticação; CORS amplo e pedidos em memória. Não expor o piloto como backend de produção.
- **Execução de origem:** README traz Uvicorn em backend/, Expo em mobile/ e npm run dev em admin/. Não executado aqui.
- **Testes de origem:** backend/tests/test_pricing.py usa unittest; não executado nesta auditoria.

**Fontes inspecionadas:**

- [README.md](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/README.md)
- [admin/package.json](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/admin/package.json)
- [mobile/package.json](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/mobile/package.json)
- [backend/requirements.txt](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/backend/requirements.txt)
- [backend/app/main.py](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/backend/app/main.py)
- [backend/app/models.py](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/backend/app/models.py)
- [backend/app/storage.py](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/backend/app/storage.py)
- [backend/tests/test_pricing.py](https://github.com/BMatheus1/EasyDiet/blob/a661cf677af1148d07024d95d8db439d673a12ee/backend/tests/test_pricing.py)

## Pri Beauty

- **Repositório:** [pri-beauty-site](https://github.com/BMatheus1/pri-beauty-site).
- **Revisão auditada:** `86405afd01d844e27d04273cf78558a30e32b51a`.
- **Objetivo:** Presença digital para estética, com procedimentos, catálogo e portfólio de trabalhos.
- **Tecnologias confirmadas:** HTML, CSS e JavaScript sem framework; biblioteca PageFlip nos materiais de combos; scripts Python/JavaScript para catálogo e QA.
- **Implementado no código:** HTML institucional responsivo; procedimentos e atalhos comerciais; catálogo e página de combos; JavaScript com filtro da galeria, expansão, lightbox de imagem/vídeo, controles, Escape, foco e gestos. Não há backend, autenticação ou banco no conjunto examinado.
- **Documentado, sem reprodução integral:** Manutenção do catálogo em scripts/CATALOG-MAINTENANCE.md. Não há README na árvore analisada.
- **Planejado / não comprovado:** Não atribuir backend de reservas ou agendamento interno: o contato é externo.
- **Status:** Website público acessível; isso não comprova vínculo comercial, resultados ou autorização irrestrita de imagens de terceiros.
- **Links reais:** Canonical no HTML: https://pri-beauty.mylinkbr.workers.dev/; respondeu HTTP 200 com título Pri Beauty | Estética e beleza em 21/10/2026.
- **Potencial comercial:** Websites para negócios locais, identidade, organização de procedimentos e navegação comercial.
- **Apresentação recomendada:** Usar capturas da área de procedimentos e navegação, sem republicar fotos de clientes da galeria ou contatos pessoais. Link para o site completo como serviço externo.
- **Pendências:** README, confirmação de direitos de cada foto de terceiros e testes automatizados estruturados.
- **Demonstração segura:** Capturas da interface de procedimentos, descrição dos recursos e visita à página pública. Não acionar links de WhatsApp.
- **Cuidados de dados e exposição:** O repositório contém contatos e imagens de pessoas. Esses dados não foram importados para o cadastro do showroom; fotos de clientes não serão republicadas.
- **Execução de origem:** Site estático; pode ser servido por HTTP a partir do diretório com os arquivos públicos. Há estrutura dist/ e configuração de hospedagem. Não foi publicado ou alterado aqui.
- **Testes de origem:** Há scripts browser_catalog_qa.js e catalog_gate.py; não há suíte de testes de aplicação identificada. Scripts não executados nesta auditoria.

**Fontes inspecionadas:**

- [index.html](https://github.com/BMatheus1/pri-beauty-site/blob/86405afd01d844e27d04273cf78558a30e32b51a/index.html)
- [script.js](https://github.com/BMatheus1/pri-beauty-site/blob/86405afd01d844e27d04273cf78558a30e32b51a/script.js)
- [scripts/CATALOG-MAINTENANCE.md](https://github.com/BMatheus1/pri-beauty-site/blob/86405afd01d844e27d04273cf78558a30e32b51a/scripts/CATALOG-MAINTENANCE.md)

## Detecção de Sepse

- **Repositório:** [projeto_sepse_2.0](https://github.com/BMatheus1/projeto_sepse_2.0).
- **Revisão auditada:** `a34e38c27620b5330aea2c2cd123a2090fd949cb`.
- **Objetivo:** Pesquisa acadêmica de classificação de risco e assistente experimental com fontes e dados sintéticos.
- **Tecnologias confirmadas:** Python, pandas, NumPy, scikit-learn, XGBoost/CatBoost e SHAP declarados; FastAPI/Pydantic; LangChain/LangGraph na fase 3; Dockerfile presente.
- **Implementado no código:** Módulos de baseline, algoritmo genético, treinamento otimizado e ajuste de threshold; relatórios de comparação; endpoints /fase3/health, /fase3/assistant/ask e /flow; repositório de pacientes sintéticos, recuperação de protocolos e fluxo de assistente. O código de treino e inferência existe, mas modelos e qualidade não foram reavaliados nesta tarefa.
- **Documentado, sem reprodução integral:** Experimentos de LoRA e avaliação base/adapter, métricas em reports/, modo mock e modo real. Model card registra falsos positivos e limitações importantes.
- **Planejado / não comprovado:** Validação externa/institucional, governança clínica, monitoramento e avaliação de segurança para qualquer uso assistencial real.
- **Status:** Projeto acadêmico e experimental. Não é ferramenta médica validada e não será oferecida inferência clínica no showroom.
- **Links reais:** Repositório e documentação. README também cita vídeo de apresentação; o vídeo não foi verificado e não será tratado como demo funcional.
- **Potencial comercial:** Ciência de dados, organização de pipelines, APIs, explicabilidade e documentação de sistemas experimentais.
- **Apresentação recomendada:** Explicar o pipeline em linguagem simples, usando diagramas. O relatório de comparação contém aumento de recall junto a queda de precision e aumento de falsos positivos; não converter isso em promessa clínica nem publicar percentuais como benefício comercial.
- **Pendências:** Reprodução dos experimentos, validação externa e autorização de materiais. Dados e logs de pacientes, mesmo sintéticos, não serão importados.
- **Demonstração segura:** Diagramas do fluxo e links para o código/model card. Nenhum dado de paciente ou endpoint de inferência será utilizado.
- **Cuidados de dados e exposição:** Conteúdo clínico e logs; possibilidade de confusão entre mock, treino real e aplicação validada. O showroom evita formulários médicos e não gera recomendações.
- **Execução de origem:** README descreve módulos Python, Uvicorn, pytest e modos mock/treino. Requer artefatos/dados e dependências opcionais. Não executado aqui.
- **Testes de origem:** Há testes de métricas, algoritmo genético, API, grafo, segurança e fine-tuning em tests/. Não executados nesta auditoria.

**Fontes inspecionadas:**

- [README.md](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/README.md)
- [MODEL_CARD.md](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/MODEL_CARD.md)
- [requirements.txt](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/requirements.txt)
- [src/tc_fase3/api.py](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/src/tc_fase3/api.py)
- [src/tc_fase2/train_baseline.py](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/src/tc_fase2/train_baseline.py)
- [src/tc_fase3/assistant.py](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/src/tc_fase3/assistant.py)
- [reports/model_comparison.md](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/reports/model_comparison.md)

## Binance AI Research

- **Repositório:** [Binance-AI-project](https://github.com/BMatheus1/Binance-AI-project).
- **Revisão auditada:** `7638fe1ed55e333b169543fd5846cf8dea8c72e3`.
- **Objetivo:** Pesquisa quantitativa, ingestão de dados, notícias e painel experimental de observação.
- **Tecnologias confirmadas:** Python, NumPy, pandas, pyarrow, scikit-learn, aiohttp/websockets; FastAPI, SQLite/JSONL; Next.js/TypeScript/Tailwind com Recharts/Lightweight Charts no dashboard; dependências opcionais de modelos de linguagem.
- **Implementado no código:** Módulos de ingestão/qualidade de dados, features, treino, avaliação e backtesting; parsing/classificação de notícias e EventStore; API de overview, mercados, operações, performance, inteligência, notícias, saúde, eventos e exportação CSV; WebSocket; sessão local e controles de sessão experimental protegidos por verificações de origem/cookies/CSRF.
- **Documentado, sem reprodução integral:** Fases 2–6, avaliações prospectivas, Kronos/Qwen e modos de simulação. A documentação do dashboard afirma que só expõe kill switch, mas o código atual também contém prepare-session, authorize-session e stop-session: a documentação está parcialmente desatualizada.
- **Planejado / não comprovado:** Nenhuma alegação de rentabilidade, precisão de previsão ou segurança econômica foi validada. Recursos de operação e configuração de contas não fazem parte do showroom.
- **Status:** Pesquisa autoral experimental com dashboard local; sem deploy público informado.
- **Links reais:** Repositório. Há screenshot em Bitcoin_AI/reports/phase_6_4_2/dashboard_intelligence.png; será inspecionado antes de eventual uso. Não há link para contas ou APIs de negociação no showroom.
- **Potencial comercial:** Integração de fontes, processamento de eventos, visualização e arquitetura de observabilidade.
- **Apresentação recomendada:** Mostrar arquitetura e, se adequado, captura de relatório com legenda de contexto experimental. Não publicar retorno financeiro como resultado da agência.
- **Pendências:** Reprodução do ambiente, documentação alinhada ao código e verificação de materiais visuais.
- **Demonstração segura:** Diagramas e captura estática sanitizada, caso não contenha dados sensíveis. Não iniciar workers nem conectar contas, autorizar sessões ou executar ordens.
- **Cuidados de dados e exposição:** O código inclui integrações e controles operacionais de sessões demo. Mesmo o dashboard local não deve ser iniciado por esta auditoria, pois pode ler runtime e contas existentes.
- **Execução de origem:** README/pyproject trazem instalação Python e frontend Next.js. Scripts locais podem iniciar workers e sessões; deliberadamente não executados aqui.
- **Testes de origem:** Há testes em Bitcoin_AI/tests/, incluindo dashboard, decisões e conectividade. Não executados nesta auditoria.

**Fontes inspecionadas:**

- [Bitcoin_AI/README.md](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/README.md)
- [Bitcoin_AI/pyproject.toml](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/pyproject.toml)
- [Bitcoin_AI/dashboard/README.md](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/dashboard/README.md)
- [Bitcoin_AI/dashboard/frontend/package.json](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/dashboard/frontend/package.json)
- [Bitcoin_AI/src/btc_research/dashboard_api.py](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/src/btc_research/dashboard_api.py)
- [Bitcoin_AI/src/btc_research/ingestion.py](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/src/btc_research/ingestion.py)
- [Bitcoin_AI/src/btc_research/phase6_news.py](https://github.com/BMatheus1/Binance-AI-project/blob/7638fe1ed55e333b169543fd5846cf8dea8c72e3/Bitcoin_AI/src/btc_research/phase6_news.py)

## Your Food

- **Repositório:** [your-food](https://github.com/BMatheus1/your-food).
- **Revisão auditada:** `780b1b08300ed298c103cbbe2d6fcdd09dded053`.
- **Objetivo:** Exercício de gerenciamento de restaurantes no terminal.
- **Tecnologias confirmadas:** Python, biblioteca padrão.
- **Implementado no código:** Lista em memória; funções de cadastrar restaurante, listar, alternar ativo e menu CLI.
- **Documentado, sem reprodução integral:** Descrição do repositório sugere fast food app service; o código examinado é CLI, não plataforma web de pedidos.
- **Planejado / não comprovado:** Interface web/mobile, API, persistência, autenticação e testes não aparecem na árvore.
- **Status:** Exercício educacional inicial. Fora da coleção principal.
- **Links reais:** Apenas repositório.
- **Potencial comercial:** Limitado para vitrine premium; útil para histórico de aprendizado.
- **Apresentação recomendada:** Não rotular como sistema de delivery. Priorizar EasyDiet e Best Restaurant na curadoria.
- **Pendências:** README, testes, documentação e evolução de produto.
- **Demonstração segura:** Descrição do exercício, sem demo web atribuída.
- **Cuidados de dados e exposição:** Sem dados comerciais importados. Não há necessidade de executar o script.
- **Execução de origem:** Um arquivo app.py com execução interativa no terminal. Não executado aqui.
- **Testes de origem:** Nenhum teste identificado.

**Fontes inspecionadas:**

- [app.py](https://github.com/BMatheus1/your-food/blob/780b1b08300ed298c103cbbe2d6fcdd09dded053/app.py)

## AI Business Assistant

- **Repositório:** [chatbotAI](https://github.com/BMatheus1/chatbotAI).
- **Revisão auditada:** `109686ecd0e9718d1d340e9dbd00bffb14ee9a72`.
- **Objetivo:** Chat com recuperação de informações em PDFs, painel administrativo e histórico.
- **Tecnologias confirmadas:** Next.js/TypeScript/Tailwind; FastAPI, SQLAlchemy, PostgreSQL/pgvector, pypdf; providers mock, OpenAI e Gemini declarados.
- **Implementado no código:** Rotas de chat e documentos; serviço de upload/extração/chunking; busca semântica antes da geração; persistência de mensagens e metadados de fontes; seleção de provider no serviço de chat.
- **Documentado, sem reprodução integral:** OCR visual, embeddings reais, modo mock e Docker Compose. A integração com provedores externos não foi acionada.
- **Planejado / não comprovado:** Autenticação administrativa, multi-tenant, streaming, exclusão/reindexação, filas, integrações sociais e testes são listados como roadmap.
- **Status:** Protótipo de portfólio. Avaliado e reservado para evolução, fora da coleção inicial.
- **Links reais:** Apenas repositório; screenshots são sugestões no README, não arquivos existentes.
- **Potencial comercial:** Assistentes de atendimento e recuperação de documentos, após proteção de acesso e homologação.
- **Apresentação recomendada:** Explicar a arquitetura RAG sem vender o protótipo como atendimento de produção. Preferir publicação futura após autenticação e evidências visuais.
- **Pendências:** Autenticação do admin, limites de upload, testes e screenshots. Não enviar PDFs de clientes.
- **Demonstração segura:** Diagrama ou futuro ambiente mock isolado. Nenhuma chave ou API externa será usada nesta tarefa.
- **Cuidados de dados e exposição:** Rotas administrativas sem autenticação comprovada e upload de documentos que podem ser confidenciais. Não iniciar com dados ou chaves existentes.
- **Execução de origem:** README descreve Docker Compose, PostgreSQL e frontend/backend, com modo mock. Não executado aqui.
- **Testes de origem:** Testes automatizados aparecem no roadmap; não identificados na árvore.

**Fontes inspecionadas:**

- [README.md](https://github.com/BMatheus1/chatbotAI/blob/109686ecd0e9718d1d340e9dbd00bffb14ee9a72/README.md)
- [backend/requirements.txt](https://github.com/BMatheus1/chatbotAI/blob/109686ecd0e9718d1d340e9dbd00bffb14ee9a72/backend/requirements.txt)
- [backend/app/routers/documents.py](https://github.com/BMatheus1/chatbotAI/blob/109686ecd0e9718d1d340e9dbd00bffb14ee9a72/backend/app/routers/documents.py)
- [backend/app/routers/chat.py](https://github.com/BMatheus1/chatbotAI/blob/109686ecd0e9718d1d340e9dbd00bffb14ee9a72/backend/app/routers/chat.py)
- [backend/app/services/chat_service.py](https://github.com/BMatheus1/chatbotAI/blob/109686ecd0e9718d1d340e9dbd00bffb14ee9a72/backend/app/services/chat_service.py)
- [backend/app/services/document_service.py](https://github.com/BMatheus1/chatbotAI/blob/109686ecd0e9718d1d340e9dbd00bffb14ee9a72/backend/app/services/document_service.py)

## PDF Reader Inteligente

- **Repositório:** [pdf_reader](https://github.com/BMatheus1/pdf_reader).
- **Revisão auditada:** `36477cb18c69f4c71dd45b7aafe9a78eb965a1d5`.
- **Objetivo:** Busca lexical, semântica e híbrida em múltiplos PDFs com fontes.
- **Tecnologias confirmadas:** Python, Streamlit, pypdf, NumPy, sentence-transformers e pytest.
- **Implementado no código:** Serviços de ingestão, chunking, busca lexical/semântica, combinação de scores híbridos e reranking; filtros por arquivo; geração de resposta com evidências e cache de índices locais, conforme módulos examinados.
- **Documentado, sem reprodução integral:** Interface Streamlit com abas, trechos destacados e cache persistente. README mistura resposta baseada em fontes já presente com evolução futura para RAG; não presumir um chatbot LLM completo.
- **Planejado / não comprovado:** Exportação, filtros avançados, prévia de páginas e evolução de ranking/RAG.
- **Status:** Aplicação local com base técnica relevante. Fora da seleção inicial para manter foco nos cinco prioritários.
- **Links reais:** Apenas repositório; sem deploy ou screenshots encontrados.
- **Potencial comercial:** Pesquisa documental e bases de conhecimento, com avaliação de privacidade e qualidade de recuperação.
- **Apresentação recomendada:** Reservar case futuro com documentos sintéticos e screenshots autorizados. Não ingerir documentos reais do usuário.
- **Pendências:** Capturas, avaliação reproduzível, política de cache e revisão de documentação.
- **Demonstração segura:** Arquitetura e futuro corpus sintético. Nenhum PDF ou índice local real foi aberto.
- **Cuidados de dados e exposição:** Cache .dev_ai_workspace_index pode conter trechos e metadados de documentos confidenciais. Não copiar esses dados.
- **Execução de origem:** README: instalar requirements e executar streamlit run app/ui.py. Não executado aqui.
- **Testes de origem:** Há testes em app/tests/; o README mostra uma pasta tests/ diferente. Não executados nesta auditoria.

**Fontes inspecionadas:**

- [README.md](https://github.com/BMatheus1/pdf_reader/blob/36477cb18c69f4c71dd45b7aafe9a78eb965a1d5/README.md)
- [requirements.txt](https://github.com/BMatheus1/pdf_reader/blob/36477cb18c69f4c71dd45b7aafe9a78eb965a1d5/requirements.txt)
- [app/search_service.py](https://github.com/BMatheus1/pdf_reader/blob/36477cb18c69f4c71dd45b7aafe9a78eb965a1d5/app/search_service.py)
- [app/answer_service.py](https://github.com/BMatheus1/pdf_reader/blob/36477cb18c69f4c71dd45b7aafe9a78eb965a1d5/app/answer_service.py)
- [app/app_service.py](https://github.com/BMatheus1/pdf_reader/blob/36477cb18c69f4c71dd45b7aafe9a78eb965a1d5/app/app_service.py)

## Complementos de verificação

- Pri Beauty: [combos/index.html](https://github.com/BMatheus1/pri-beauty-site/blob/86405afd01d844e27d04273cf78558a30e32b51a/combos/index.html) confirma a importação da biblioteca PageFlip.
- Sepse: [src/tc_fase2/train_optimized_model.py](https://github.com/BMatheus1/projeto_sepse_2.0/blob/a34e38c27620b5330aea2c2cd123a2090fd949cb/src/tc_fase2/train_optimized_model.py) foi inspecionado para a estrutura de treino e ajuste de threshold.

## Registro dos materiais visuais

Capturas de páginas públicas, diagramas baseados no código e imagens das demos estão registrados em `docs/portfolio-architecture.md` e `docs/media-credits.md`. Nenhum mockup antigo é apresentado como captura de um produto real. Fotos de clientes, documentos, logs de pacientes, índices locais e segredos não são importados. As imagens gastronômicas geradas representam somente o restaurante fictício.

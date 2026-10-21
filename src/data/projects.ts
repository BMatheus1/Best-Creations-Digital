import type { Project } from "@/types";
import { legacyProjects } from "./legacy-projects";

export { projectFilters } from "./project-filters";

export const projects: Project[] = [
  {
    slug: "my-expenses",
    name: "My Expenses",
    category: "Sistemas",
    categories: ["Sistemas", "Aplicativos"],
    label: "01 / FINANÇAS · PRODUTO AUTORAL",
    theme: "finance",
    status: "Projeto autoral · publicado",
    evidence:
      "Código e página pública auditados em 21/10/2026. Cadastro, finanças, relatórios e billing estão presentes no código; integrações de cobrança e autenticação não foram homologadas nesta auditoria. As capturas mostram a página pública, sem acessar contas.",
    description: "Clareza para cada movimento da vida financeira.",
    problem:
      "Reunir receitas, despesas e categorias em um fluxo simples, com acesso individual e leitura clara do mês.",
    solution:
      "Frontend em Next.js e API FastAPI com dados vinculados ao usuário no PostgreSQL. A aplicação reúne lançamentos, categorias, relatórios e uma estrutura de assinatura; Capacitor prepara a experiência mobile.",
    features: [
      "CRUD de receitas, despesas, categorias e cartões",
      "Autenticação, verificação e recuperação de conta no código",
      "Resumo financeiro e visualização de relatórios",
      "Rotas de assinatura, sincronização e cancelamento",
    ],
    documentedFeatures: [
      "Publicação web e empacotamento mobile",
      "Integrações de e-mail e cobrança dependem da configuração do produto",
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Capacitor",
    ],
    repository: "https://github.com/BMatheus1/my_expenses",
    publishedUrl: "https://myexpensesfinance.com",
    images: [
      {
        src: "/portfolio/my-expenses-desktop.webp",
        width: 1360,
        height: 860,
        alt: "Captura real da página pública do My Expenses no desktop",
        kind: "screenshot",
        caption:
          "Página pública capturada em 21/10/2026. Os valores já fazem parte da apresentação ilustrativa do próprio produto.",
      },
      {
        src: "/portfolio/my-expenses-mobile.webp",
        width: 390,
        height: 844,
        alt: "Página pública do My Expenses na versão mobile",
        kind: "screenshot",
        caption:
          "Captura real da página pública em 390 px; nenhuma conta foi acessada.",
      },
    ],
    quoteService: "Sistema web",
    id: "my-expenses",
    kind: "real",
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 1,
    audit: {
      date: "2026-10-21",
      revision: "28cfffb4643969a8fdf6da05da344e823cb6975e",
      paths: [
        "README.md",
        "frontend/package.json",
        "backend/requirements.txt",
        "backend/app/routes.py",
        "backend/app/auth.py",
        "backend/app/billing_routes.py",
        "frontend/app/components/ReportsView.tsx",
        "docs/DATABASE.md",
      ],
    },
  },
  {
    slug: "pri-beauty",
    name: "Pri Beauty",
    category: "Websites",
    categories: ["Websites"],
    label: "02 / BELEZA · PRESENÇA DIGITAL",
    theme: "beauty",
    status: "Website publicado",
    evidence:
      "Site público e código auditados em 21/10/2026. Capturas restritas à área de procedimentos; fotos de clientes e contatos pessoais não foram importados para o showroom. A publicação não é apresentada como prova de resultados comerciais.",
    description: "Uma presença digital à altura de cada detalhe.",
    problem:
      "Organizar procedimentos, catálogo e trabalhos em uma experiência acessível para um negócio local.",
    solution:
      "Website estático com identidade própria, apresentação de procedimentos, catálogo e galeria filtrável. Os recursos de navegação incluem ampliação de imagens e vídeos, controles visíveis e adaptação mobile.",
    features: [
      "Procedimentos e catálogo digital",
      "Galeria com filtros, imagens e vídeos",
      "Lightbox com controles e Escape",
      "Layout responsivo e caminhos para contato externo",
    ],
    limitations: [
      "Agendamentos internos e backend não fazem parte deste website.",
    ],
    technologies: ["HTML", "CSS", "JavaScript", "PageFlip"],
    repository: "https://github.com/BMatheus1/pri-beauty-site",
    publishedUrl: "https://pri-beauty.mylinkbr.workers.dev/",
    images: [
      {
        src: "/portfolio/pri-beauty-desktop.webp",
        width: 1360,
        height: 640,
        alt: "Captura real da seção de procedimentos do site Pri Beauty",
        kind: "screenshot",
        caption:
          "Área de procedimentos do site público. Nenhuma foto de cliente foi republicada.",
      },
      {
        src: "/portfolio/pri-beauty-mobile.webp",
        width: 390,
        height: 1461,
        alt: "Área de procedimentos da Pri Beauty no mobile",
        kind: "screenshot",
        caption:
          "Captura real da organização dos procedimentos em tela pequena.",
      },
    ],
    quoteService: "Landing page",
    id: "pri-beauty",
    kind: "real",
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 2,
    audit: {
      date: "2026-10-21",
      revision: "86405afd01d844e27d04273cf78558a30e32b51a",
      paths: ["index.html", "script.js", "scripts/CATALOG-MAINTENANCE.md"],
    },
  },
  {
    slug: "easydiet",
    name: "EasyDiet",
    category: "Aplicativos",
    categories: ["Aplicativos", "Sistemas"],
    label: "03 / FOOD TECH · PILOTO MOBILE",
    theme: "diet",
    status: "Piloto funcional · em desenvolvimento",
    evidence:
      "App Expo, API e admin confirmados no repositório. Pedidos ficam em memória e o pagamento é simulado. Não há deploy público confirmado. O visual é um diagrama baseado no código, não uma captura do aplicativo.",
    description: "Do pedido à operação. Uma experiência conectada.",
    problem:
      "Conectar a montagem de refeições ao cálculo de preço e à organização operacional de pedidos.",
    solution:
      "Piloto com app Expo/React Native, motor de precificação em FastAPI e painel Next.js. O backend calcula cotações, cria pedidos em memória e disponibiliza consultas para a operação.",
    features: [
      "Catálogo de ingredientes e montagem de refeições",
      "Cálculo de cotação na API",
      "Pedidos em memória e aprovação de pagamento simulada",
      "Consultas administrativas de pedidos e produção",
    ],
    plannedFeatures: ["Persistência durável e migrações"],
    limitations: [
      "Pedidos mantidos em memória e pagamento simulado.",
      "Autenticação administrativa e pagamento real não foram comprovados no fluxo examinado.",
    ],
    technologies: ["Expo", "React Native", "TypeScript", "Next.js", "FastAPI"],
    repository: "https://github.com/BMatheus1/EasyDiet",
    images: [
      {
        src: "/portfolio/easydiet-architecture.svg",
        width: 1200,
        height: 760,
        alt: "Diagrama confirmado: app Expo, motor de preços FastAPI e painel Next.js do EasyDiet",
        kind: "diagram",
        caption:
          "Diagrama de arquitetura elaborado a partir do código auditado; não é screenshot.",
      },
    ],
    quoteService: "Aplicativo",
    id: "easydiet",
    kind: "real",
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 3,
    audit: {
      date: "2026-10-21",
      revision: "a661cf677af1148d07024d95d8db439d673a12ee",
      paths: [
        "README.md",
        "admin/package.json",
        "mobile/package.json",
        "backend/requirements.txt",
        "backend/app/main.py",
        "backend/app/models.py",
        "backend/app/storage.py",
        "backend/tests/test_pricing.py",
      ],
    },
  },
  {
    slug: "deteccao-de-sepse",
    name: "Detecção de Sepse",
    category: "Inteligência artificial",
    categories: ["Inteligência artificial"],
    label: "04 / MACHINE LEARNING · PESQUISA",
    theme: "data",
    status: "Pesquisa acadêmica · experimental",
    evidence:
      "Pipeline, API, relatórios e model card auditados. Projeto acadêmico, sem validação para uso clínico. Nenhum dado de paciente ou inferência médica é disponibilizado no showroom. Métricas de experimentos não são apresentadas como benefício assistencial.",
    description: "Pesquisa aplicada. Do dado à explicação.",
    problem:
      "Investigar a classificação de risco em dados clínicos e tornar o fluxo técnico compreensível e rastreável.",
    solution:
      "Código modular para preparação de dados, avaliação de modelos, otimização e ajuste de threshold. A fase seguinte acrescenta um assistente acadêmico com dados sintéticos, recuperação de protocolos, API e fluxo LangGraph.",
    features: [
      "Pipeline de avaliação, otimização e ajuste de threshold",
      "API FastAPI e contratos Pydantic",
      "Recuperação de protocolos e pacientes sintéticos",
      "Fluxo de assistente com fontes e verificações de segurança",
    ],
    documentedFeatures: [
      "Experimentos de fine-tuning e comparação de modelos nos relatórios",
    ],
    limitations: [
      "Sem validação para uso assistencial real.",
      "Validação externa, monitoramento e governança seriam necessários antes de qualquer uso assistencial.",
    ],
    technologies: [
      "Python",
      "scikit-learn",
      "FastAPI",
      "LangChain",
      "LangGraph",
    ],
    repository: "https://github.com/BMatheus1/projeto_sepse_2.0",
    images: [
      {
        src: "/portfolio/sepse-pipeline.svg",
        width: 1200,
        height: 760,
        alt: "Diagrama do pipeline acadêmico de dados, avaliação e explicações",
        kind: "diagram",
        caption:
          "Representação do pipeline existente no código. Não apresenta diagnóstico ou resultado clínico.",
      },
      {
        src: "/portfolio/sepse-assistant.svg",
        width: 1200,
        height: 760,
        alt: "Fluxo do assistente acadêmico com dados sintéticos, fontes e verificações",
        kind: "diagram",
        caption:
          "Diagrama do fluxo acadêmico da fase 3. Uso exclusivamente explicativo.",
      },
    ],
    quoteService: "Inteligência artificial",
    id: "deteccao-de-sepse",
    kind: "real",
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 4,
    audit: {
      date: "2026-10-21",
      revision: "a34e38c27620b5330aea2c2cd123a2090fd949cb",
      paths: [
        "README.md",
        "MODEL_CARD.md",
        "requirements.txt",
        "src/tc_fase3/api.py",
        "src/tc_fase2/train_baseline.py",
        "src/tc_fase3/assistant.py",
        "reports/model_comparison.md",
      ],
    },
  },
  {
    slug: "binance-ai-research",
    name: "Binance AI Research",
    category: "Inteligência artificial",
    categories: ["Inteligência artificial", "Sistemas"],
    label: "05 / DADOS · OBSERVABILIDADE",
    theme: "data",
    status: "Pesquisa autoral · experimental",
    evidence:
      "Ingestão, notícias, API e dashboard confirmados no código. A captura vem de um relatório do repositório. O showroom não se conecta a contas, não autoriza sessões e não executa operações. Não há promessa de rentabilidade ou precisão.",
    description: "Fontes conectadas. Informação em perspectiva.",
    problem:
      "Organizar fontes de mercado, eventos e avaliações de pesquisa em uma arquitetura observável.",
    solution:
      "Projeto Python com ingestão e qualidade de dados, análise de notícias e armazenamento local. O dashboard Next.js consome uma API FastAPI com snapshots, consultas e WebSocket. Controles operacionais do projeto de origem ficam fora desta apresentação.",
    features: [
      "Ingestão e verificações de qualidade de dados",
      "Parsing e classificação de eventos de notícias",
      "API de observação, exportação e WebSocket",
      "Dashboard e registros de avaliações experimentais",
    ],
    documentedFeatures: [
      "Modelos e avaliações descritos nos relatórios de pesquisa",
    ],
    limitations: [
      "Qualquer conclusão econômica requer validação independente; não é uma oferta de investimento",
    ],
    technologies: [
      "Python",
      "pandas",
      "FastAPI",
      "SQLite",
      "Next.js",
      "TypeScript",
    ],
    repository: "https://github.com/BMatheus1/Binance-AI-project",
    images: [
      {
        src: "/portfolio/binance-research.webp",
        width: 814,
        height: 699,
        alt: "Captura do dashboard experimental disponível no relatório público do repositório",
        kind: "screenshot",
        caption:
          "Captura histórica do relatório do repositório, em ambiente demo. Valores experimentais, sem recomendação ou promessa financeira.",
      },
      {
        src: "/portfolio/binance-architecture.svg",
        width: 1200,
        height: 760,
        alt: "Diagrama da coleta de fontes, análise e painel de observação",
        kind: "diagram",
        caption:
          "Arquitetura de observação, sem execução de ordens ou conexão com contas.",
      },
    ],
    quoteService: "Inteligência artificial",
    id: "binance-ai-research",
    kind: "real",
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 5,
    audit: {
      date: "2026-10-21",
      revision: "7638fe1ed55e333b169543fd5846cf8dea8c72e3",
      paths: [
        "Bitcoin_AI/README.md",
        "Bitcoin_AI/pyproject.toml",
        "Bitcoin_AI/dashboard/README.md",
        "Bitcoin_AI/dashboard/frontend/package.json",
      ],
    },
  },
  {
    slug: "best-crm",
    name: "Best CRM",
    category: "Sistemas",
    theme: "finance",
    label: "06 / GESTÃO · DEMONSTRAÇÃO INTERATIVA",
    description: "Relacionamentos que avançam. Gestão que acompanha.",
    problem:
      "Dar visibilidade a clientes, oportunidades e tarefas de uma operação comercial.",
    solution:
      "Aplicação de demonstração com cadastro e edição, busca, filtros, pipeline e tarefas. Indicadores e gráficos derivam dos dados da sessão, com reset para restaurar o cenário.",
    features: [
      "Criar, editar e excluir clientes fictícios",
      "Busca e filtros com indicadores atualizados",
      "Pipeline com mudança de etapas e histórico",
      "Tarefas e restauração do cenário",
    ],
    demoUrl: "/lab/crm",
    quoteService: "Sistema web",
    id: "best-crm",
    categories: ["Sistemas", "Demonstrações"],
    kind: "demo",
    status: "Demonstração interativa · dados fictícios",
    evidence:
      "Demonstração autoral criada para o showroom. Não representa cliente real. Dados exclusivamente fictícios, mantidos na memória desta página; recarregar ou restaurar descarta as alterações. Não há backend ou envio externo.",
    technologies: ["Next.js", "React", "TypeScript", "CSS", "Zod"],
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 6,
    images: [
      {
        src: "/portfolio/demo-crm-desktop.webp",
        width: 1360,
        height: 900,
        kind: "screenshot",
        alt: "Captura da demonstração funcional Best CRM",
        caption:
          "Captura da demonstração funcional criada para o showroom. Todos os dados são fictícios.",
      },
      {
        src: "/portfolio/demo-crm-mobile.webp",
        width: 390,
        height: 844,
        kind: "screenshot",
        alt: "Demonstração Best CRM no mobile",
        caption: "Versão mobile da demo; nenhuma operação real é realizada.",
      },
    ],
  },
  {
    slug: "best-booking",
    name: "Best Booking",
    category: "Sistemas",
    theme: "beauty",
    label: "07 / AGENDAMENTOS · DEMONSTRAÇÃO INTERATIVA",
    description: "Um horário. Uma escolha. Tudo no lugar.",
    problem:
      "Simplificar a escolha de serviço, profissional e horário em um negócio local.",
    solution:
      "Fluxo curto com serviços, profissionais, calendário e disponibilidade calculada. Agendamentos fictícios podem ser consultados, cancelados e reiniciados; nenhuma reserva comercial é criada.",
    features: [
      "Selecionar serviço, profissional, data e horário",
      "Disponibilidade com bloqueio de conflitos",
      "Criar e visualizar agendamento simulado",
      "Cancelar e restaurar os dados",
    ],
    demoUrl: "/lab/booking",
    quoteService: "Sistema web",
    id: "best-booking",
    categories: ["Sistemas", "Demonstrações"],
    kind: "demo",
    status: "Demonstração interativa · dados fictícios",
    evidence:
      "Demonstração autoral criada para o showroom. Não representa cliente real. Dados exclusivamente fictícios, mantidos na memória desta página; recarregar ou restaurar descarta as alterações. Não há backend ou envio externo.",
    technologies: ["Next.js", "React", "TypeScript", "CSS", "Zod"],
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 7,
    images: [
      {
        src: "/portfolio/demo-booking-desktop.webp",
        width: 1360,
        height: 900,
        kind: "screenshot",
        alt: "Captura da demonstração funcional Best Booking",
        caption:
          "Captura da demonstração funcional criada para o showroom. Todos os dados são fictícios.",
      },
      {
        src: "/portfolio/demo-booking-mobile.webp",
        width: 390,
        height: 844,
        kind: "screenshot",
        alt: "Demonstração Best Booking no mobile",
        caption: "Versão mobile da demo; nenhuma operação real é realizada.",
      },
    ],
  },
  {
    slug: "best-restaurant",
    name: "Best Restaurant",
    category: "Websites",
    theme: "restaurant",
    label: "08 / GASTRONOMIA · DEMONSTRAÇÃO INTERATIVA",
    description: "Da primeira escolha à última boa impressão.",
    problem:
      "Reunir cardápio, pedido e reserva em uma experiência gastronômica fácil de usar.",
    solution:
      "Restaurante fictício com identidade própria, imagens geradas, categorias e carrinho. Quantidades e totais são calculados na sessão; pedidos e reservas são explicitamente simulados.",
    features: [
      "Filtrar um cardápio com preços demonstrativos",
      "Carrinho com quantidades, remoção e subtotal",
      "Simular pedido sem pagamento ou envio",
      "Reserva fictícia e reinício da sessão",
    ],
    demoUrl: "/lab/restaurant",
    quoteService: "Cardápio digital",
    id: "best-restaurant",
    categories: ["Websites", "Demonstrações"],
    kind: "demo",
    status: "Demonstração interativa · dados fictícios",
    evidence:
      "Demonstração autoral criada para o showroom. Não representa cliente real. Dados exclusivamente fictícios, mantidos na memória desta página; recarregar ou restaurar descarta as alterações. Não há backend ou envio externo.",
    technologies: ["Next.js", "React", "TypeScript", "CSS", "Zod"],
    featureState: "verified",
    proposedTechnologies: [],
    featured: true,
    order: 8,
    images: [
      {
        src: "/portfolio/demo-restaurant-desktop.webp",
        width: 1360,
        height: 900,
        kind: "screenshot",
        alt: "Captura da demonstração funcional Best Restaurant",
        caption:
          "Captura da demonstração funcional criada para o showroom. Todos os dados são fictícios.",
      },
      {
        src: "/portfolio/demo-restaurant-mobile.webp",
        width: 390,
        height: 844,
        kind: "screenshot",
        alt: "Demonstração Best Restaurant no mobile",
        caption: "Versão mobile da demo; nenhuma operação real é realizada.",
      },
    ],
  },
];

export const allProjects = [...projects, ...legacyProjects];

export function getProject(slug: string) {
  return allProjects.find((project) => project.slug === slug);
}

export function projectQuoteUrl(project: Project) {
  const service = project.quoteService || "Outro";
  return `/iniciar-projeto?servico=${encodeURIComponent(service)}&referencia=${encodeURIComponent(project.slug)}`;
}

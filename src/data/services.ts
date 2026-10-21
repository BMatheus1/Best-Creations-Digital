import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "sites",
    title: "Sites e landing pages",
    shortTitle: "Websites",
    icon: "globe",
    description:
      "Seu negócio merece uma presença digital à altura. Criamos experiências web que conectam sua marca às pessoas certas.",
    deliverables: [
      "Sites institucionais, portfólios e páginas de links",
      "Landing pages, páginas de vendas e captura",
      "Páginas de eventos e prestação de serviços",
      "Redesign e experiência mobile",
      "Formulários, integração com WhatsApp e SEO técnico básico",
    ],
    example:
      "Uma página de serviços que apresenta seu trabalho e facilita o primeiro contato.",
  },
  {
    id: "apps",
    title: "Aplicativos mobile",
    shortTitle: "Aplicativos",
    icon: "phone",
    description:
      "Sua ideia na palma da mão. Soluções mobile intuitivas, conectadas e feitas para a rotina de quem usa.",
    deliverables: [
      "Aplicativos Android e iOS, conforme viabilidade",
      "Agendamentos, pedidos e serviços",
      "Organização financeira e assinaturas",
      "Autenticação e notificações",
      "Conexões com APIs e ferramentas administrativas",
    ],
    example:
      "Um aplicativo de agendamento com uma experiência simples para seus clientes.",
  },
  {
    id: "sistemas",
    title: "Sistemas web",
    shortTitle: "Sistemas",
    icon: "layout",
    description:
      "Menos tarefas repetitivas, mais possibilidades. Transformamos processos manuais em ferramentas úteis para sua operação.",
    deliverables: [
      "Dashboards, gráficos, relatórios e indicadores",
      "Gestão de clientes, cadastros e permissões",
      "Controle de produtos, estoque e pedidos",
      "Sistemas financeiros e de agendamento",
      "Integração com bancos de dados, APIs e processos",
    ],
    example:
      "Um painel que reúne pedidos, estoque e indicadores em um só lugar.",
  },
  {
    id: "negocios",
    title: "Soluções para negócios locais",
    shortTitle: "Negócios locais",
    icon: "store",
    description:
      "O digital pode estar mais perto. Soluções práticas para aproximar seu estabelecimento de novos clientes.",
    deliverables: [
      "Cardápios digitais e sites para restaurantes",
      "Catálogos, vitrines e promoções",
      "Páginas de serviços e procedimentos",
      "Galerias de trabalhos e agendamentos",
      "Contato, WhatsApp, mapas e localização",
    ],
    example:
      "Um cardápio fácil de consultar pelo celular, com acesso às informações do restaurante.",
  },
  {
    id: "design",
    title: "Design digital e UX/UI",
    shortTitle: "Design & UX/UI",
    icon: "pen",
    description:
      "Design que faz sentido. Unimos identidade, clareza e funcionalidade em cada ponto da experiência.",
    deliverables: [
      "Interfaces para sites e aplicativos",
      "Wireframes e protótipos navegáveis",
      "Design systems e identidade visual digital",
      "Peças de campanhas, redes sociais e banners",
      "Redesign, usabilidade e acessibilidade visual",
    ],
    example:
      "Um protótipo navegável para validar a experiência antes de desenvolver.",
  },
  {
    id: "ia",
    title: "Inteligência artificial e automações",
    shortTitle: "IA & automações",
    icon: "sparkles",
    description:
      "Tecnologia aplicada ao que importa. Exploramos novas formas de simplificar tarefas e dar mais valor às informações.",
    deliverables: [
      "Chatbots e assistentes inteligentes",
      "Integrações com APIs de IA",
      "Classificação, análise e processamento de dados",
      "Recomendações e dashboards inteligentes",
      "Automações entre sistemas e fluxos de tarefas",
    ],
    example:
      "Um fluxo que organiza solicitações e ajuda sua equipe a priorizar o atendimento. Viabilidade, revisão humana e custos operacionais são avaliados no escopo.",
  },
  {
    id: "manutencao",
    title: "Manutenção e evolução digital",
    shortTitle: "Evolução digital",
    icon: "settings",
    description:
      "Sua solução acompanha seu negócio. Cuidamos dos detalhes que mantêm seu produto relevante e preparado para evoluir.",
    deliverables: [
      "Correções de bugs e otimização de desempenho",
      "Modernização de interfaces e responsividade",
      "Novas funcionalidades e integrações",
      "Evolução de código, componentes e dependências",
      "Suporte técnico mediante contratação",
    ],
    example:
      "Melhorar a velocidade e a usabilidade de um site que seu negócio já utiliza.",
  },
];

export const serviceOptions = [
  "Site institucional",
  "Landing page",
  "Sistema web",
  "Aplicativo",
  "Cardápio digital",
  "Automação",
  "Inteligência artificial",
  "Design/UI",
  "Manutenção",
  "Outro",
] as const;

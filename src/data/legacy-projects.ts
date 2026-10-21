import type { Project } from "@/types";
export const legacyProjects: Project[] = [
  {
    slug: "cantinho-do-luiz",
    name: "Cantinho do Luiz",
    category: "Websites",
    label: "GASTRONOMIA · EXPERIÊNCIA WEB",
    theme: "restaurant",
    status: "Apresentação demonstrativa",
    evidence:
      "Projeto indicado no briefing. Materiais, tecnologias e situação da entrega aguardam confirmação. A interface abaixo é uma exploração visual, não uma captura do produto.",
    description:
      "O sabor de uma boa experiência começa antes da primeira visita.",
    problem:
      "Apresentar o restaurante e facilitar a consulta ao cardápio e às informações comerciais pelo celular.",
    solution:
      "Estrutura proposta para uma presença digital acolhedora, com navegação direta para cardápio, contato e localização.",
    features: [
      "Apresentação do restaurante",
      "Cardápio organizado por categorias",
      "Informações comerciais",
      "Acesso ao contato e localização",
    ],
    proposedTechnologies: [
      "Interface responsiva",
      "Catálogo digital",
      "SEO local a avaliar",
    ],
    id: "cantinho-do-luiz",
    kind: "demo",
    categories: ["Websites"],
    technologies: [],
    featureState: "planned",
    featured: false,
    order: 100,
    images: [
      {
        src: "/visuals/project-restaurant.svg",
        width: 1200,
        height: 760,
        alt: "Estudo ilustrativo de Cantinho do Luiz",
        kind: "demonstration",
        caption:
          "Estudo visual conceitual, sem comprovação de entrega comercial.",
      },
    ],
  },
  {
    slug: "estudio-de-estetica",
    name: "Essência — estudo de interface",
    category: "Websites",
    label: "ESTÉTICA · LANDING PAGE",
    theme: "beauty",
    status: "Conceito demonstrativo",
    evidence:
      "Estudo visual criado para demonstrar uma possível solução para estética. Nome e interface ilustrativos; não representa um cliente ou entrega comercial.",
    description: "Uma presença delicada, pensada para valorizar cada detalhe.",
    problem:
      "Organizar procedimentos, trabalhos e informações profissionais em uma página fácil de explorar.",
    solution:
      "Conceito de landing page com hierarquia editorial, serviços e caminhos claros para contato.",
    features: [
      "Apresentação de procedimentos",
      "Espaço para galeria autorizada",
      "Informações profissionais",
      "Localização e contato",
    ],
    proposedTechnologies: ["Landing page", "UI responsiva", "Acessibilidade"],
    id: "estudio-de-estetica",
    kind: "demo",
    categories: ["Websites"],
    technologies: [],
    featureState: "planned",
    featured: false,
    order: 101,
    images: [
      {
        src: "/visuals/project-beauty.svg",
        width: 1200,
        height: 760,
        alt: "Estudo ilustrativo de Essência — estudo de interface",
        kind: "demonstration",
        caption:
          "Estudo visual conceitual, sem comprovação de entrega comercial.",
      },
    ],
  },
  {
    slug: "analise-de-dados",
    name: "Data Intelligence",
    category: "Inteligência artificial",
    label: "DADOS · EXPLORAÇÃO TÉCNICA",
    theme: "data",
    status: "Estudo demonstrativo",
    evidence:
      "Estrutura reservada ao projeto de análise de dados citado no briefing. Conjunto de dados, modelos, resultados e métricas não foram fornecidos. A visualização é ilustrativa e não informa desempenho real.",
    description: "Transformar informação em novas perspectivas.",
    problem:
      "Explorar informações e compreender possibilidades de análise com aprendizado de máquina.",
    solution:
      "Estrutura de estudo para documentar preparação de dados, análise técnica e avaliação de modelos, quando houver evidências disponíveis.",
    features: [
      "Exploração e preparação de dados",
      "Visualizações analíticas",
      "Avaliação técnica de modelos",
      "Documentação de resultados verificáveis",
    ],
    proposedTechnologies: [
      "Análise de dados",
      "Aprendizado de máquina",
      "Visualização",
    ],
    id: "analise-de-dados",
    kind: "demo",
    categories: ["Inteligência artificial"],
    technologies: [],
    featureState: "planned",
    featured: false,
    order: 102,
    images: [
      {
        src: "/visuals/project-data.svg",
        width: 1200,
        height: 760,
        alt: "Estudo ilustrativo de Data Intelligence",
        kind: "demonstration",
        caption:
          "Estudo visual conceitual, sem comprovação de entrega comercial.",
      },
    ],
  },
];

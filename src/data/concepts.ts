export type PreviewDevice = "mobile" | "desktop";
export type PreviewScreen = readonly [id: number, label: string];

export type CatalogConcept = {
  id: string;
  name: string;
  category: string;
  description: string;
  service: string;
  desktop: readonly PreviewScreen[];
  mobile: readonly PreviewScreen[];
};

export const concepts: CatalogConcept[] = [
  {
    id: "vitta",
    name: "Loja de Roupas by Bc.",
    category: "E-commerce de moda e lifestyle",
    description: "Moda esportiva, variações de produto e compra pelo celular.",
    service: "Site institucional",
    desktop: [
      [0, "Página inicial"],
      [1, "Coleção"],
      [2, "Produto"],
      [3, "Carrinho"],
    ],
    mobile: [
      [4, "Início da loja"],
      [1, "Coleção"],
      [2, "Produto"],
      [3, "Sacola"],
      [5, "Finalizar compra"],
    ],
  },
  {
    id: "sapore",
    name: "Pizzaria Bc.",
    category: "Pizzaria, restaurante e delivery",
    description:
      "Site com cardápio e ofertas da casa, acompanhado de um app para montar, pedir e acompanhar pizzas.",
    service: "Cardápio digital",
    desktop: [
      [0, "Página inicial"],
      [1, "Cardápio"],
      [8, "Promoções"],
      [2, "Monte seu pedido"],
      [5, "Carrinho"],
    ],
    mobile: [
      [4, "Início do app"],
      [1, "Cardápio"],
      [2, "Personalizar pizza"],
      [5, "Carrinho"],
      [3, "Acompanhar pedido"],
      [6, "Perfil e histórico"],
    ],
  },
  {
    id: "lumina",
    name: "Clínica de Estética by Bc.",
    category: "Estética, beleza e bem-estar",
    description:
      "Tratamentos, equipe e uma agenda para escolher e revisar um horário pelo celular.",
    service: "Sistema web",
    desktop: [
      [0, "Página inicial"],
      [1, "Tratamentos"],
      [2, "Agendamento"],
      [3, "Profissionais"],
      [5, "Confirmação"],
    ],
    mobile: [
      [4, "Início da clínica"],
      [1, "Tratamentos"],
      [2, "Agendamento"],
      [3, "Profissionais"],
      [5, "Confirmação"],
    ],
  },
  {
    id: "nexus",
    name: "Sistema de Gestão by Bc.",
    category: "Gestão empresarial e painéis",
    description:
      "Clientes, vendas, indicadores e atividades recentes em um painel para acompanhar o negócio.",
    service: "Sistema web",
    desktop: [
      [0, "Painel geral"],
      [1, "Clientes"],
      [2, "Vendas"],
      [3, "Relatórios"],
      [5, "Atividades"],
    ],
    mobile: [
      [4, "Resumo do negócio"],
      [1, "Clientes"],
      [2, "Indicadores"],
      [3, "Relatórios"],
      [5, "Atividades"],
    ],
  },
  {
    id: "forma",
    name: "Arquitetura by Bc.",
    category: "Arquitetura, interiores e construção",
    description:
      "Portfólio fotográfico para apresentar projetos, o escritório e seus canais de contato.",
    service: "Site institucional",
    desktop: [
      [0, "Página inicial"],
      [1, "Galeria de projetos"],
      [2, "Projeto individual"],
      [3, "O escritório"],
      [5, "Contato"],
    ],
    mobile: [
      [4, "Início do portfólio"],
      [1, "Galeria de projetos"],
      [2, "Projeto individual"],
      [3, "O escritório"],
      [5, "Contato"],
    ],
  },
  {
    id: "wellness",
    name: "Academia by Bc.",
    category: "Academia, treino e aplicativo do aluno",
    description:
      "Site da academia e app para consultar o treino, a evolução e a agenda de aulas.",
    service: "Aplicativo",
    desktop: [
      [0, "Página inicial"],
      [1, "Planos e unidades"],
      [2, "Modalidades e aulas"],
      [4, "Agenda de aulas"],
    ],
    mobile: [
      [5, "Início do aluno"],
      [3, "Treino do dia"],
      [6, "Exercícios"],
      [4, "Agenda de aulas"],
      [7, "Evolução"],
      [8, "Perfil"],
    ],
  },
];

export function getConcept(id: string) {
  return concepts.find((concept) => concept.id === id);
}

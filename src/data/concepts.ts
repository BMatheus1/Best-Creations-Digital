export const concepts = [
  {
    id: "vitta",
    name: "Vitta",
    category: "Moda esportiva · Loja digital",
    description:
      "Uma loja de moda esportiva com linguagem de campanha e uma compra direta.",
    service: "Site institucional",
    screens: [
      "Página inicial",
      "Catálogo de produtos",
      "Detalhes do produto",
      "Carrinho",
      "Aplicativo de compras",
    ],
    mobile: [4],
  },
  {
    id: "lumina",
    name: "Lumina",
    category: "Estética · Agendamento",
    description:
      "Um espaço digital de autocuidado, da descoberta dos tratamentos à escolha do horário.",
    service: "Sistema web",
    screens: [
      "Página inicial",
      "Tratamentos",
      "Agendamento",
      "Equipe",
      "Versão mobile",
    ],
    mobile: [4],
  },
  {
    id: "sapore",
    name: "Sapore",
    category: "Gastronomia · Delivery",
    description:
      "Uma pizzaria artesanal com cardápio digital, personalização e acompanhamento simulado.",
    service: "Cardápio digital",
    screens: [
      "Página inicial",
      "Cardápio",
      "Personalizar pizza",
      "Acompanhar pedido",
      "Aplicativo de delivery",
    ],
    mobile: [4],
  },
  {
    id: "nexus",
    name: "Nexus",
    category: "Gestão empresarial · SaaS",
    description:
      "Um painel de clientes, vendas e indicadores para pequenos negócios.",
    service: "Sistema web",
    screens: [
      "Painel geral",
      "Gestão de clientes",
      "Controle de vendas",
      "Relatórios",
      "Aplicativo de gestão",
    ],
    mobile: [4],
  },
  {
    id: "forma",
    name: "Forma",
    category: "Arquitetura · Portfólio",
    description:
      "Um portfólio editorial em que luz, fotografia e escala revelam cada projeto.",
    service: "Site institucional",
    screens: [
      "Página inicial",
      "Portfólio",
      "Detalhes do projeto",
      "O escritório",
      "Versão mobile",
    ],
    mobile: [4],
  },
  {
    id: "wellness",
    name: "Wellness",
    category: "Academia · Website e aplicativo",
    description:
      "Um site para conhecer a academia e um aplicativo de treino e agenda para alunos.",
    service: "Aplicativo",
    screens: [
      "Página inicial",
      "Planos e unidades",
      "Modalidades e aulas",
      "Aplicativo do aluno",
      "Agendamento de aulas",
    ],
    mobile: [3, 4],
  },
];

export type CatalogConcept = (typeof concepts)[number];

export function getConcept(id: string) {
  return concepts.find((concept) => concept.id === id);
}

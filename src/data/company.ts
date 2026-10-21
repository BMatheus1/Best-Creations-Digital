function validSiteUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.origin : undefined;
  } catch {
    return undefined;
  }
}

export const company = {
  name: "Best Creations",
  signature: "Digital Studio",
  instagram: "https://www.instagram.com/bestcreations011/",
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  )
    ? process.env.NEXT_PUBLIC_CONTACT_EMAIL
    : undefined,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  siteUrl: validSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  title: "Best Creations | Sites, Aplicativos e Sistemas Personalizados",
  description:
    "Sites profissionais, landing pages, aplicativos, sistemas web, design digital e automações sob medida. Conheça a Best Creations Digital Studio.",
  identity: {
    background: "#0B0B0B",
    surface: "#171717",
    border: "#242424",
    gold: "#C9A44C",
    goldLight: "#E4C780",
    text: "#F6F2E9",
    muted: "#AAA7A0",
  },
  pending: [
    "Logotipo oficial",
    "Número de WhatsApp comercial",
    "Domínio oficial",
    "E-mail comercial",
    "Screenshots e detalhes técnicos verificados dos projetos",
  ],
};
export const navigation = [
  {
    label: "Início",
    href: "/",
    edition: "The experience",
    preview: "signature",
  },
  {
    label: "Serviços",
    href: "/servicos",
    edition: "Explore the possibilities",
    preview: "interfaces",
  },
  {
    label: "Projetos",
    href: "/projetos",
    edition: "The collection",
    preview: "collection",
  },
  {
    label: "O estúdio",
    href: "/estudio",
    edition: "Independent by nature",
    preview: "studio",
  },
  {
    label: "Iniciar projeto",
    href: "/iniciar-projeto",
    edition: "Your next chapter",
    preview: "contact",
  },
] as const;

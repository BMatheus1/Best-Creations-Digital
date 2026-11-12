import { brandPalette } from "@/data/brand";
import {
  createWhatsAppUrl,
  normalizeWhatsAppNumber,
  officialWhatsAppNumber,
} from "@/lib/whatsapp";

const whatsapp =
  normalizeWhatsAppNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "") ||
  officialWhatsAppNumber;
const whatsappMessage =
  "Olá, Best Creations! Vim pelo site e gostaria de conversar sobre um projeto e solicitar um orçamento.";

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
  whatsapp,
  whatsappMessage,
  whatsappUrl: createWhatsAppUrl(whatsapp, whatsappMessage)!,
  siteUrl: validSiteUrl(process.env.NEXT_PUBLIC_SITE_URL),
  title: "Best Creations | Sites, Aplicativos e Sistemas Personalizados",
  description:
    "Sites profissionais, landing pages, aplicativos, sistemas web, design digital e automações sob medida. Conheça a Best Creations Digital Studio.",
  identity: brandPalette,
  pending: [
    "Domínio oficial",
    "E-mail comercial",
    "Screenshots e detalhes técnicos verificados dos projetos",
  ],
};
export const navigation = [
  {
    label: "Início",
    href: "/",
    edition: "Início",
    preview: "signature",
  },
  {
    label: "Serviços",
    href: "/servicos",
    edition: "Soluções digitais",
    preview: "interfaces",
  },
  {
    label: "Projetos",
    href: "/projetos",
    edition: "Portfólio",
    preview: "collection",
  },
  {
    label: "O estúdio",
    href: "/estudio",
    edition: "Sobre a Best Creations",
    preview: "studio",
  },
  {
    label: "Iniciar projeto",
    href: "/iniciar-projeto",
    edition: "Orçamento",
    preview: "contact",
  },
] as const;

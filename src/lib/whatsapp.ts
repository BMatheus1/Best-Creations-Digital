import type { QuoteValues } from "./validations";

export const officialWhatsAppNumber = "5511919164884";

export function normalizeWhatsAppNumber(value: string): string | null {
  const number = value.replace(/[\s()+-]/g, "");
  return /^[1-9]\d{9,14}$/.test(number) ? number : null;
}

export function formatQuote(values: QuoteValues): string {
  return [
    "Olá, Best Creations! Gostaria de conversar sobre um projeto.",
    "",
    `Nome: ${values.name.trim()}`,
    values.company?.trim() && `Empresa: ${values.company.trim()}`,
    `Telefone: ${values.phone.trim()}`,
    values.email?.trim() && `E-mail: ${values.email.trim()}`,
    `Serviço: ${values.service}`,
    `Projeto: ${values.description.trim()}`,
    values.deadline && `Prazo desejado: ${values.deadline}`,
    values.budget && `Investimento previsto: ${values.budget}`,
  ]
    .filter((line, index) => index === 1 || Boolean(line))
    .join("\n");
}

export function createWhatsAppUrl(
  number: string,
  message: string,
): string | null {
  const normalized = normalizeWhatsAppNumber(number);
  return normalized
    ? `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`
    : null;
}

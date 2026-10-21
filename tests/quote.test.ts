import { describe, expect, it } from "vitest";
import { quoteSchema, type QuoteValues } from "@/lib/validations";
import {
  createWhatsAppUrl,
  formatQuote,
  normalizeWhatsAppNumber,
} from "@/lib/whatsapp";

const valid: QuoteValues = {
  name: "Ana Silva",
  phone: "(11) 90000-0000",
  service: "Site institucional",
  description: "Preciso apresentar os serviços da minha empresa.",
  company: "Empresa de teste",
  email: "ana@example.com",
  deadline: "De 1 a 3 meses",
  budget: "A definir em conjunto",
};
describe("Validação e preparação da solicitação", () => {
  it("aceita dados completos e opcionais vazios", () => {
    expect(quoteSchema.safeParse(valid).success).toBe(true);
    expect(
      quoteSchema.safeParse({
        ...valid,
        company: "",
        email: "",
        deadline: "",
        budget: "",
      }).success,
    ).toBe(true);
  });
  it.each([
    { name: " " },
    { phone: "123" },
    { phone: "abcdefghijk" },
    { email: "invalido" },
    { service: "inexistente" },
    { description: "curto" },
    { description: "a".repeat(2001) },
    { budget: "valor arbitrário" },
  ])("rejeita dados inválidos: %o", (override) => {
    expect(quoteSchema.safeParse({ ...valid, ...override }).success).toBe(
      false,
    );
  });
  it("gera uma mensagem legível com os campos preenchidos", () => {
    const message = formatQuote(valid);
    expect(message).toContain("Nome: Ana Silva");
    expect(message).toContain("Empresa: Empresa de teste");
    expect(message).toContain("Serviço: Site institucional");
    expect(message).toContain("Prazo desejado: De 1 a 3 meses");
    expect(message).not.toContain("undefined");
  });
  it("não cria linhas de informações opcionais vazias", () => {
    const message = formatQuote({
      ...valid,
      company: "",
      email: "",
      deadline: "",
      budget: "",
    });
    expect(message).not.toContain("Empresa:");
    expect(message).not.toContain("E-mail:");
    expect(message).not.toContain("Prazo desejado:");
  });
  it("codifica corretamente caracteres especiais no link sem enviar mensagens", () => {
    const message = "Descrição: orçamento & café? #ideia\nNova linha";
    // Número de teste usado apenas para verificar a construção do URL.
    const url = createWhatsAppUrl("+55 (11) 00000-0000", message);
    expect(new URL(url!).searchParams.get("text")).toBe(message);
    expect(new URL(url!).pathname).toBe("/5511000000000");
  });
  it.each([
    "",
    "123",
    "javascript:alert(1)",
    "5511abc0000000",
    "0000000000",
    "1".repeat(16),
  ])("bloqueia contato ausente ou inválido: %s", (number) => {
    expect(normalizeWhatsAppNumber(number)).toBeNull();
    expect(createWhatsAppUrl(number, "teste")).toBeNull();
  });
});

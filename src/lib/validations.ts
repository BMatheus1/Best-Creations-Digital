import { z } from "zod";
import { serviceOptions } from "@/data/services";

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome com pelo menos 2 caracteres.")
    .max(100, "Use até 100 caracteres."),
  company: z.string().trim().max(120, "Use até 120 caracteres.").optional(),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d\s()-]+$/, "Use apenas números e símbolos de telefone.")
    .refine((value) => {
      const digits = value.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 15;
    }, "Informe um telefone com DDD, entre 10 e 15 dígitos."),
  email: z
    .union([z.email("Informe um e-mail válido.").max(254), z.literal("")])
    .optional(),
  service: z.enum(serviceOptions, { error: "Selecione o tipo de serviço." }),
  description: z
    .string()
    .trim()
    .min(20, "Conte um pouco mais: use pelo menos 20 caracteres.")
    .max(2000, "Use até 2.000 caracteres."),
  deadline: z
    .enum([
      "",
      "Sem prazo definido",
      "Até 1 mês",
      "De 1 a 3 meses",
      "Mais de 3 meses",
    ])
    .optional(),
  budget: z
    .enum([
      "",
      "A definir em conjunto",
      "Até R$ 3.000",
      "De R$ 3.000 a R$ 8.000",
      "De R$ 8.000 a R$ 20.000",
      "Acima de R$ 20.000",
    ])
    .optional(),
});
export type QuoteValues = z.infer<typeof quoteSchema>;

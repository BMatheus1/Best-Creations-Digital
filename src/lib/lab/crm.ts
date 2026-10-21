import { z } from "zod";

export const crmStages = ["Novo", "Contato", "Proposta", "Concluído"] as const;
export const crmSegments = ["Serviços", "Comércio", "Tecnologia"] as const;
export type CRMStage = (typeof crmStages)[number];
export const crmClientSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Use um nome fictício com pelo menos 2 caracteres.")
    .max(80),
  company: z.string().trim().min(2, "Informe uma empresa fictícia.").max(80),
  email: z.union([
    z
      .email()
      .refine(
        (value) => value.endsWith(".example"),
        "Use um endereço fictício terminado em .example.",
      ),
    z.literal(""),
  ]),
  segment: z.enum(crmSegments),
  stage: z.enum(crmStages),
  value: z.coerce
    .number()
    .min(0, "O valor deve ser positivo.")
    .max(1_000_000, "Limite demonstrativo: R$ 1 milhão."),
});
export type CRMClientInput = z.infer<typeof crmClientSchema>;
export interface CRMClient {
  id: number;
  name: string;
  company: string;
  email: string;
  segment: (typeof crmSegments)[number];
  stage: CRMStage;
  valueCents: number;
  history: string[];
}
export interface CRMTask {
  id: number;
  title: string;
  done: boolean;
}
export interface CRMState {
  clients: CRMClient[];
  tasks: CRMTask[];
  nextId: number;
}
export function seedCRM(): CRMState {
  return {
    nextId: 10,
    clients: [
      {
        id: 1,
        name: "Maia Modelo",
        company: "Ateliê Modelo",
        email: "maia@atelie.example",
        segment: "Serviços",
        stage: "Novo",
        valueCents: 125000,
        history: ["Contato fictício criado no cenário inicial."],
      },
      {
        id: 2,
        name: "Theo Exemplo",
        company: "Café Horizonte — fictício",
        email: "theo@cafe.example",
        segment: "Comércio",
        stage: "Contato",
        valueCents: 165000,
        history: ["Apresentação comercial simulada."],
      },
      {
        id: 3,
        name: "Lia Modelo",
        company: "Studio Norte — fictício",
        email: "lia@studio.example",
        segment: "Serviços",
        stage: "Proposta",
        valueCents: 98000,
        history: ["Proposta fictícia em análise."],
      },
      {
        id: 4,
        name: "Leo Exemplo",
        company: "Loja Modelo",
        email: "leo@loja.example",
        segment: "Comércio",
        stage: "Proposta",
        valueCents: 245000,
        history: ["Conversa demonstrativa registrada."],
      },
      {
        id: 5,
        name: "Nara Modelo",
        company: "Oficina Exemplo",
        email: "nara@oficina.example",
        segment: "Tecnologia",
        stage: "Concluído",
        valueCents: 210000,
        history: ["Oportunidade fictícia concluída."],
      },
      {
        id: 6,
        name: "Caio Exemplo",
        company: "Espaço Modelo",
        email: "caio@espaco.example",
        segment: "Serviços",
        stage: "Novo",
        valueCents: 80000,
        history: ["Contato fictício criado no cenário inicial."],
      },
    ],
    tasks: [
      { id: 7, title: "Preparar uma proposta demonstrativa", done: false },
      { id: 8, title: "Revisar oportunidades da semana", done: false },
      { id: 9, title: "Organizar contatos do cenário", done: true },
    ],
  };
}
export type CRMAction =
  | { type: "save"; id?: number; data: CRMClientInput }
  | { type: "delete"; id: number }
  | { type: "stage"; id: number; stage: CRMStage }
  | { type: "task-add"; title: string }
  | { type: "task-toggle"; id: number }
  | { type: "reset" };
export function crmReducer(state: CRMState, action: CRMAction): CRMState {
  if (action.type === "reset") return seedCRM();
  if (action.type === "save") {
    const { value, ...data } = action.data;
    const existing = state.clients.find((client) => client.id === action.id);
    if (action.id !== undefined && !existing) return state;
    const client: CRMClient = {
      ...data,
      id: existing?.id ?? state.nextId,
      valueCents: Math.round(value * 100),
      history: existing
        ? [
            ...existing.history,
            "Registro editado nesta sessão de demonstração.",
          ]
        : ["Cliente fictício criado nesta sessão."],
    };
    return {
      ...state,
      nextId: existing ? state.nextId : state.nextId + 1,
      clients: existing
        ? state.clients.map((item) => (item.id === client.id ? client : item))
        : [...state.clients, client],
    };
  }
  if (action.type === "delete")
    return {
      ...state,
      clients: state.clients.filter((client) => client.id !== action.id),
    };
  if (action.type === "stage")
    return {
      ...state,
      clients: state.clients.map((client) =>
        client.id === action.id
          ? {
              ...client,
              stage: action.stage,
              history: [
                ...client.history,
                `Etapa alterada para ${action.stage} nesta sessão.`,
              ],
            }
          : client,
      ),
    };
  if (action.type === "task-toggle")
    return {
      ...state,
      tasks: state.tasks.map((task) =>
        task.id === action.id ? { ...task, done: !task.done } : task,
      ),
    };
  if (action.type === "task-add") {
    const title = action.title.trim().slice(0, 160);
    return title
      ? {
          ...state,
          nextId: state.nextId + 1,
          tasks: [...state.tasks, { id: state.nextId, title, done: false }],
        }
      : state;
  }
  return state;
}
export function crmStats(clients: CRMClient[]) {
  return {
    count: clients.length,
    open: clients.filter((client) => client.stage !== "Concluído").length,
    totalCents: clients.reduce((sum, client) => sum + client.valueCents, 0),
    wonCents: clients
      .filter((client) => client.stage === "Concluído")
      .reduce((sum, client) => sum + client.valueCents, 0),
  };
}
export { money } from "./format";

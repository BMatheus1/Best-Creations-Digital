import { describe, expect, it } from "vitest";
import { crmClientSchema, crmReducer, crmStats, seedCRM } from "@/lib/lab/crm";
import {
  availableTimes,
  bookingSchema,
  createAppointment,
  seedAppointments,
  type Appointment,
} from "@/lib/lab/booking";
import {
  cartItems,
  cartReducer,
  cartTotal,
  reservationSchema,
} from "@/lib/lab/restaurant";
import { addDays, todayKey, validDateKey } from "@/lib/lab/format";
const today = "2026-10-21";
describe("CRM demonstrativo", () => {
  it("cria, edita e exclui sem alterar o cenário original", () => {
    const seed = seedCRM();
    const data = crmClientSchema.parse({
      name: " Alex Exemplo ",
      company: "Empresa Modelo",
      email: "alex@empresa.example",
      segment: "Serviços",
      stage: "Novo",
      value: "123.45",
    });
    const created = crmReducer(seed, { type: "save", data });
    expect(created.clients).toHaveLength(7);
    expect(seed.clients).toHaveLength(6);
    const client = created.clients.at(-1)!;
    expect(client.name).toBe("Alex Exemplo");
    expect(client.valueCents).toBe(12345);
    const edited = crmReducer(created, {
      type: "save",
      id: client.id,
      data: { ...data, company: "Empresa Editada", value: 200 },
    });
    expect(edited.clients.at(-1)?.company).toBe("Empresa Editada");
    expect(edited.clients.at(-1)?.history).toHaveLength(2);
    const deleted = crmReducer(edited, { type: "delete", id: client.id });
    expect(deleted.clients).toHaveLength(6);
    expect(
      deleted.clients.find((item) => item.id === client.id),
    ).toBeUndefined();
  });
  it("atualiza pipeline, histórico e indicadores, e restaura dados", () => {
    const seed = seedCRM();
    const changed = crmReducer(seed, {
      type: "stage",
      id: 1,
      stage: "Concluído",
    });
    expect(crmStats(changed.clients).wonCents).toBe(
      crmStats(seed.clients).wonCents + 125000,
    );
    expect(crmStats(changed.clients).open).toBe(
      crmStats(seed.clients).open - 1,
    );
    expect(changed.clients[0].history.at(-1)).toContain("Concluído");
    expect(crmReducer(changed, { type: "reset" })).toEqual(seed);
  });
  it("gerencia tarefas e rejeita contatos reais ou valores inválidos", () => {
    const state = crmReducer(seedCRM(), {
      type: "task-add",
      title: "  Revisar exemplo  ",
    });
    const task = state.tasks.at(-1)!;
    expect(task.title).toBe("Revisar exemplo");
    expect(
      crmReducer(state, { type: "task-toggle", id: task.id }).tasks.at(-1)
        ?.done,
    ).toBe(true);
    expect(
      crmClientSchema.safeParse({
        name: "Alex Exemplo",
        company: "Modelo",
        email: "alex@real.com",
        segment: "Serviços",
        stage: "Novo",
        value: 1,
      }).success,
    ).toBe(false);
    expect(
      crmClientSchema.safeParse({
        name: "Alex Exemplo",
        company: "Modelo",
        email: "",
        segment: "Serviços",
        stage: "Novo",
        value: -1,
      }).success,
    ).toBe(false);
  });
});
describe("Datas e disponibilidade", () => {
  it("usa São Paulo e mantém aritmética de calendário", () => {
    expect(todayKey(new Date("2026-10-21T01:00:00Z"))).toBe("2026-10-20");
    expect(addDays("2026-12-31", 1)).toBe("2027-01-01");
    expect(validDateKey("2026-02-30")).toBe(false);
    expect(validDateKey("2028-02-29")).toBe(true);
  });
  it("bloqueia sobreposição por duração, preserva outro profissional e libera cancelamentos", () => {
    const appointment: Appointment = {
      id: 1,
      name: "Nome Exemplo",
      serviceId: "ritual",
      professionalId: "clara",
      date: addDays(today, 1),
      time: "09:00",
      status: "booked",
    };
    const blocked = availableTimes(
      "corte",
      "clara",
      appointment.date,
      [appointment],
      today,
    );
    expect(blocked).not.toContain("09:00");
    expect(blocked).not.toContain("10:00");
    expect(blocked).toContain("11:00");
    expect(
      availableTimes("corte", "davi", appointment.date, [appointment], today),
    ).toContain("09:00");
    expect(
      availableTimes(
        "corte",
        "clara",
        appointment.date,
        [{ ...appointment, status: "cancelled" }],
        today,
      ),
    ).toContain("09:00");
  });
  it("cria somente agendamentos válidos sem conflito", () => {
    const state = seedAppointments(today);
    const input = {
      name: "Alex Exemplo",
      serviceId: "corte",
      professionalId: "clara",
      date: addDays(today, 1),
      time: "10:00",
    };
    const result = createAppointment(input, state, 2003, today);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.appointment.status).toBe("booked");
      expect(
        createAppointment(input, [...state, result.appointment], 2004, today)
          .success,
      ).toBe(false);
    }
    expect(state).toHaveLength(2);
    expect(
      bookingSchema(today).safeParse({ ...input, date: today }).success,
    ).toBe(false);
    expect(
      bookingSchema(today).safeParse({ ...input, date: addDays(today, 31) })
        .success,
    ).toBe(false);
    expect(
      createAppointment({ ...input, name: "A" }, state, 2003, today).success,
    ).toBe(false);
  });
});
describe("Restaurante demonstrativo", () => {
  it("calcula centavos, altera quantidades, remove e reinicia", () => {
    let cart = cartReducer({}, { type: "add", id: "burrata" });
    cart = cartReducer(cart, { type: "add", id: "risoto" });
    cart = cartReducer(cart, { type: "add", id: "risoto" });
    expect(cartTotal(cart)).toBe(17800);
    expect(cartItems(cart)).toHaveLength(2);
    cart = cartReducer(cart, { type: "decrement", id: "risoto" });
    expect(cartTotal(cart)).toBe(11000);
    cart = cartReducer(cart, { type: "remove", id: "burrata" });
    expect(cartTotal(cart)).toBe(6800);
    expect(cartReducer(cart, { type: "clear" })).toEqual({});
  });
  it("limita quantidades e ignora itens ou quantidades inválidos", () => {
    let cart = {};
    for (let i = 0; i < 25; i++)
      cart = cartReducer(cart, { type: "add", id: "ravioli" });
    expect(cart).toEqual({ ravioli: 20 });
    expect(cartReducer(cart, { type: "add", id: "unknown" })).toBe(cart);
    expect(cartTotal({ ravioli: -1, risoto: 1.5, unknown: 10 })).toBe(0);
    expect(
      cartReducer({ torta: 1 }, { type: "decrement", id: "torta" }),
    ).toEqual({});
  });
  it("valida reservas fictícias e datas reais de calendário", () => {
    const input = {
      name: "Alex Exemplo",
      date: addDays(today, 1),
      time: "19:30",
      guests: "2",
    };
    expect(reservationSchema(today).parse(input).guests).toBe(2);
    expect(
      reservationSchema(today).safeParse({ ...input, guests: 7 }).success,
    ).toBe(false);
    expect(
      reservationSchema(today).safeParse({ ...input, date: today }).success,
    ).toBe(false);
    expect(
      reservationSchema(today).safeParse({ ...input, date: "2026-02-30" })
        .success,
    ).toBe(false);
  });
});

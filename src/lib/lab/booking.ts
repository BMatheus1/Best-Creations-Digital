import { z } from "zod";
import { addDays, todayKey, validDateKey } from "./format";
export const bookingServices = [
  {
    id: "corte",
    name: "Corte & finalização",
    description: "Uma pausa para renovar seu estilo.",
    duration: 60,
    priceCents: 12000,
  },
  {
    id: "design",
    name: "Design de sobrancelhas",
    description: "Cuidado e atenção aos detalhes.",
    duration: 45,
    priceCents: 6000,
  },
  {
    id: "ritual",
    name: "Ritual de bem-estar",
    description: "Uma experiência de cuidado, sem pressa.",
    duration: 90,
    priceCents: 18000,
  },
] as const;
export const bookingProfessionals = [
  {
    id: "clara",
    name: "Clara Exemplo",
    initials: "CE",
    specialty: "Beleza & cuidado",
  },
  {
    id: "davi",
    name: "Davi Modelo",
    initials: "DM",
    specialty: "Estilo & bem-estar",
  },
] as const;
export const bookingTimes = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
] as const;
export type BookingServiceId = (typeof bookingServices)[number]["id"];
export type BookingProfessionalId = (typeof bookingProfessionals)[number]["id"];
export interface Appointment {
  id: number;
  name: string;
  serviceId: BookingServiceId;
  professionalId: BookingProfessionalId;
  date: string;
  time: string;
  status: "booked" | "cancelled";
}
export function bookingSchema(today = todayKey()) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(2, "Informe um nome fictício com pelo menos 2 caracteres.")
      .max(80),
    serviceId: z.enum(["corte", "design", "ritual"]),
    professionalId: z.enum(["clara", "davi"]),
    date: z
      .string()
      .refine(
        (value) =>
          validDateKey(value) && value > today && value <= addDays(today, 30),
        "Escolha uma data de amanhã até os próximos 30 dias.",
      ),
    time: z.enum(bookingTimes, { error: "Selecione um horário disponível." }),
  });
}
const minutes = (time: string) => {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
};
export function availableTimes(
  serviceId: string,
  professionalId: string,
  date: string,
  appointments: Appointment[],
  today = todayKey(),
): string[] {
  const service = bookingServices.find((item) => item.id === serviceId);
  if (
    !service ||
    !bookingProfessionals.some((item) => item.id === professionalId) ||
    !validDateKey(date) ||
    date <= today ||
    date > addDays(today, 30)
  )
    return [];
  return bookingTimes.filter(
    (time) =>
      !appointments.some((appointment) => {
        if (
          appointment.status !== "booked" ||
          appointment.professionalId !== professionalId ||
          appointment.date !== date
        )
          return false;
        const duration = bookingServices.find(
          (item) => item.id === appointment.serviceId,
        )!.duration;
        return (
          minutes(time) < minutes(appointment.time) + duration &&
          minutes(time) + service.duration > minutes(appointment.time)
        );
      }),
  );
}
export function createAppointment(
  input: unknown,
  appointments: Appointment[],
  id: number,
  today = todayKey(),
):
  | { success: true; appointment: Appointment }
  | { success: false; error: string } {
  const parsed = bookingSchema(today).safeParse(input);
  if (!parsed.success)
    return { success: false, error: parsed.error.issues[0].message };
  if (
    !availableTimes(
      parsed.data.serviceId,
      parsed.data.professionalId,
      parsed.data.date,
      appointments,
      today,
    ).includes(parsed.data.time)
  )
    return {
      success: false,
      error: "Este horário não está mais disponível. Escolha outro.",
    };
  return {
    success: true,
    appointment: { ...parsed.data, id, status: "booked" },
  };
}
export function seedAppointments(today = todayKey()): Appointment[] {
  return [
    {
      id: 2001,
      name: "Ana Exemplo",
      serviceId: "corte",
      professionalId: "clara",
      date: addDays(today, 1),
      time: "09:00",
      status: "booked",
    },
    {
      id: 2002,
      name: "Bruno Modelo",
      serviceId: "ritual",
      professionalId: "davi",
      date: addDays(today, 2),
      time: "14:00",
      status: "booked",
    },
  ];
}

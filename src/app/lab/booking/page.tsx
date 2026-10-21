import { LabFrame } from "@/components/lab/LabFrame";
import { BookingDemo } from "@/components/lab/BookingDemo";
import { pageMetadata } from "@/lib/metadata";
import { connection } from "next/server";
import { todayKey } from "@/lib/lab/format";
export const metadata = pageMetadata(
  "Best Booking — demonstração interativa",
  "Experimente serviços, profissionais, calendário e agendamentos fictícios.",
  "/lab/booking",
);
export default async function BookingPage() {
  await connection();
  return (
    <LabFrame slug="best-booking">
      <BookingDemo initialToday={todayKey()} />
    </LabFrame>
  );
}

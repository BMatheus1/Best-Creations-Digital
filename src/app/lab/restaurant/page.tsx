import { LabFrame } from "@/components/lab/LabFrame";
import { RestaurantDemo } from "@/components/lab/RestaurantDemo";
import { pageMetadata } from "@/lib/metadata";
import { connection } from "next/server";
import { todayKey } from "@/lib/lab/format";
export const metadata = pageMetadata(
  "Best Restaurant — demonstração interativa",
  "Explore cardápio, carrinho, pedido e reserva em um restaurante fictício.",
  "/lab/restaurant",
);
export default async function RestaurantPage() {
  await connection();
  return (
    <LabFrame slug="best-restaurant">
      <RestaurantDemo initialToday={todayKey()} />
    </LabFrame>
  );
}

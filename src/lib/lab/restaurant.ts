import { z } from "zod";
import { addDays, todayKey, validDateKey } from "./format";
export const restaurantCategories = [
  "Todos",
  "Entradas",
  "Principais",
  "Sobremesas",
] as const;
export const restaurantProducts = [
  {
    id: "burrata",
    name: "Burrata da horta",
    category: "Entradas",
    description: "Tomates assados, manjericão e azeite de oliva.",
    priceCents: 4200,
    image: "/lab/food/burrata.webp",
  },
  {
    id: "risoto",
    name: "Risoto de cogumelos",
    category: "Principais",
    description: "Cogumelos, arroz cremoso, parmesão e tomilho.",
    priceCents: 6800,
    image: "/lab/food/risoto.webp",
  },
  {
    id: "ravioli",
    name: "Ravioli da casa",
    category: "Principais",
    description: "Abóbora, manteiga de sálvia e avelãs tostadas.",
    priceCents: 7200,
    image: "/lab/food/ravioli.webp",
  },
  {
    id: "torta",
    name: "Torta de chocolate",
    category: "Sobremesas",
    description: "Chocolate intenso e um toque de creme de baunilha.",
    priceCents: 3200,
    image: "/lab/food/torta.webp",
  },
] as const;
export type Cart = Record<string, number>;
export type CartAction =
  { type: "add" | "decrement" | "remove"; id: string } | { type: "clear" };
export function cartReducer(cart: Cart, action: CartAction): Cart {
  if (action.type === "clear") return {};
  if (!restaurantProducts.some((item) => item.id === action.id)) return cart;
  const next = { ...cart };
  const quantity = next[action.id] || 0;
  if (
    action.type === "remove" ||
    (action.type === "decrement" && quantity <= 1)
  )
    delete next[action.id];
  else if (action.type === "add") next[action.id] = Math.min(20, quantity + 1);
  else next[action.id] = quantity - 1;
  return next;
}
export function cartItems(cart: Cart) {
  return restaurantProducts
    .filter(
      (product) =>
        Number.isInteger(cart[product.id]) &&
        cart[product.id] > 0 &&
        cart[product.id] <= 20,
    )
    .map((product) => ({
      ...product,
      quantity: cart[product.id],
      subtotalCents: cart[product.id] * product.priceCents,
    }));
}
export function cartTotal(cart: Cart) {
  return cartItems(cart).reduce((sum, item) => sum + item.subtotalCents, 0);
}
export function reservationSchema(today = todayKey()) {
  return z.object({
    name: z.string().trim().min(2, "Informe um nome fictício.").max(80),
    date: z
      .string()
      .refine(
        (value) =>
          validDateKey(value) && value > today && value <= addDays(today, 30),
        "Escolha uma data nos próximos 30 dias, a partir de amanhã.",
      ),
    time: z.enum(["19:00", "19:30", "20:00", "20:30"]),
    guests: z.coerce
      .number()
      .int()
      .min(1)
      .max(6, "A demonstração permite até 6 pessoas."),
  });
}

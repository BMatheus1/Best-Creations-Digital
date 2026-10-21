"use client";
import { useReducer, useState, type FormEvent } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Minus,
  Plus,
  RotateCcw,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import {
  cartItems,
  cartReducer,
  cartTotal,
  reservationSchema,
  restaurantCategories,
  restaurantProducts,
} from "@/lib/lab/restaurant";
import { addDays, money, prettyDate } from "@/lib/lab/format";
import { DemoDialog } from "./DemoDialog";
import { useDemoReady } from "./useDemoReady";
type Reservation = { name: string; date: string; time: string; guests: number };
type Order = {
  code: string;
  items: ReturnType<typeof cartItems>;
  total: number;
};
export function RestaurantDemo({ initialToday }: { initialToday: string }) {
  const demo = useDemoReady();
  const [cart, dispatch] = useReducer(cartReducer, {});
  const [category, setCategory] = useState<string>("Todos");
  const [notice, setNotice] = useState(
    "Cardápio e preços demonstrativos. Experimente sem enviar um pedido real.",
  );
  const [order, setOrder] = useState<Order | null>(null);
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderIndex, setOrderIndex] = useState(1);
  const [reserveOpen, setReserveOpen] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [today] = useState(initialToday);
  const items = cartItems(cart);
  const total = cartTotal(cart);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const products = restaurantProducts.filter(
    (item) => category === "Todos" || item.category === category,
  );
  function reset() {
    dispatch({ type: "clear" });
    setCategory("Todos");
    setOrder(null);
    setOrderOpen(false);
    setOrderIndex(1);
    setReserveOpen(false);
    setReservation(null);
    setErrors({});
    setNotice(
      "Demonstração reiniciada. Todos os pedidos e reservas simulados foram descartados.",
    );
  }
  function simulateOrder() {
    if (!items.length) return;
    setOrder({
      code: `DEMO-${String(orderIndex).padStart(3, "0")}`,
      items,
      total,
    });
    setOrderIndex((current) => current + 1);
    setOrderOpen(true);
    dispatch({ type: "clear" });
    setNotice(
      "Pedido simulado preparado. Nenhum restaurante recebeu uma solicitação.",
    );
  }
  function reserve(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const result = reservationSchema(today).safeParse(
      Object.fromEntries(new FormData(form)),
    );
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value?.[0] || "Revise o campo."],
          ),
        ),
      );
      const field = form.elements.namedItem(
        String(result.error.issues[0].path[0]),
      );
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    setReservation(result.data);
    setErrors({});
    setNotice("Reserva fictícia simulada apenas nesta sessão.");
  }
  const fieldError = (field: string) =>
    errors[field] ? (
      <span id={`restaurant-error-${field}`} className="lab-error" role="alert">
        {errors[field]}
      </span>
    ) : null;
  return (
    <section
      ref={demo}
      className="lab-app restaurant-app"
      aria-label="Best Restaurant — ambiente demonstrativo"
    >
      <header className="restaurant-topbar">
        <div className="restaurant-brand">
          <span>oliva.</span>
          <small>BEST RESTAURANT / DEMO</small>
        </div>
        <nav aria-label="Restaurante demonstrativo">
          <a href="#restaurant-menu">Cardápio</a>
          <button
            onClick={() => {
              setReserveOpen(true);
              setErrors({});
            }}
          >
            Reservar <CalendarDays size={15} aria-hidden="true" />
          </button>
          <a href="#restaurant-cart" className="restaurant-cart-link">
            <ShoppingBag size={16} aria-hidden="true" /> Seu pedido{" "}
            <span data-testid="cart-count">{count}</span>
          </a>
        </nav>
        <button className="restaurant-reset" onClick={reset}>
          <RotateCcw size={15} aria-hidden="true" />
          <span>Reiniciar demo</span>
        </button>
      </header>
      <div className="restaurant-hero">
        <div>
          <p className="lab-eyebrow">COZINHA AUTORAL · RESTAURANTE FICTÍCIO</p>
          <h1>
            À mesa,
            <br />o tempo ganha
            <br /> <em>outro sabor.</em>
          </h1>
          <p>
            Ingredientes que se encontram. Receitas que acolhem. Uma experiência
            criada para você explorar.
          </p>
          <a href="#restaurant-menu" className="restaurant-hero-link">
            Conheça nosso cardápio <ArrowDown size={16} aria-hidden="true" />
          </a>
        </div>
        <figure>
          <Image
            src="/lab/food/ravioli.webp"
            alt="Ravioli de abóbora com sálvia. Imagem gerada para a demonstração."
            width={1000}
            height={667}
            loading="eager"
            sizes="(max-width: 800px) 100vw, 55vw"
          />
          <figcaption>IMAGEM GERADA · AMBIENTE CONCEITUAL</figcaption>
        </figure>
      </div>
      <div className="restaurant-body">
        <div className="restaurant-menu" id="restaurant-menu">
          <div className="restaurant-section-heading">
            <div>
              <p className="lab-eyebrow">ESCOLHAS COM ALMA</p>
              <h2>O nosso cardápio.</h2>
            </div>
            <span>Preços demonstrativos</span>
          </div>
          <p className="lab-status" role="status">
            {notice}
          </p>
          <div
            className="restaurant-filters"
            role="group"
            aria-label="Categorias do cardápio"
          >
            {restaurantCategories.map((item) => (
              <button
                key={item}
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="restaurant-products">
            {products.map((product) => (
              <article key={product.id} className="restaurant-product">
                <div>
                  <Image
                    src={product.image}
                    alt={`${product.name}. Imagem gastronômica gerada para a demo.`}
                    width={1000}
                    height={667}
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 45vw, 30vw"
                  />
                </div>
                <p className="restaurant-product-category">
                  {product.category}
                </p>
                <div className="restaurant-product-heading">
                  <h3>{product.name}</h3>
                  <span>{money(product.priceCents)}</span>
                </div>
                <p>{product.description}</p>
                <button
                  className="restaurant-add"
                  disabled={(cart[product.id] || 0) >= 20}
                  aria-label={`Adicionar ${product.name}`}
                  onClick={() => {
                    dispatch({ type: "add", id: product.id });
                    setNotice(
                      `${product.name} adicionado ao pedido demonstrativo.`,
                    );
                  }}
                >
                  Adicionar ao pedido <Plus size={17} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
          <p className="restaurant-media-note">
            Imagens criadas com IA para este restaurante fictício. Não
            representam pratos à venda ou um estabelecimento real.
          </p>
        </div>
        <aside
          className="restaurant-cart"
          id="restaurant-cart"
          aria-label="Carrinho demonstrativo"
        >
          <div className="restaurant-cart-heading">
            <div>
              <p className="lab-eyebrow">ESCOLHIDO POR VOCÊ</p>
              <h2 tabIndex={-1} data-dialog-return>
                Seu pedido.
              </h2>
            </div>
            <ShoppingBag size={23} strokeWidth={1.3} aria-hidden="true" />
          </div>
          <span className="restaurant-cart-demo">
            SIMULAÇÃO · SEM PAGAMENTO
          </span>
          {items.length ? (
            <ul className="restaurant-cart-items">
              {items.map((item) => (
                <li key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <span>{money(item.subtotalCents)}</span>
                  </div>
                  <div className="restaurant-cart-row">
                    <div className="restaurant-quantity">
                      <button
                        className="lab-icon"
                        aria-label={`Diminuir ${item.name}`}
                        onClick={() => {
                          dispatch({ type: "decrement", id: item.id });
                          setNotice("Quantidade atualizada.");
                        }}
                      >
                        <Minus size={14} aria-hidden="true" />
                      </button>
                      <span aria-label={`Quantidade de ${item.name}`}>
                        {item.quantity}
                      </span>
                      <button
                        className="lab-icon"
                        disabled={item.quantity >= 20}
                        aria-label={`Aumentar ${item.name}`}
                        onClick={() => {
                          dispatch({ type: "add", id: item.id });
                          setNotice("Quantidade atualizada.");
                        }}
                      >
                        <Plus size={14} aria-hidden="true" />
                      </button>
                    </div>
                    <button
                      className="lab-icon"
                      aria-label={`Remover ${item.name}`}
                      onClick={() => {
                        dispatch({ type: "remove", id: item.id });
                        setNotice("Prato removido do pedido demonstrativo.");
                      }}
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="restaurant-empty">
              <span aria-hidden="true">✳</span>
              <p>
                Sua próxima boa escolha
                <br />
                começa no cardápio.
              </p>
            </div>
          )}
          <div className="restaurant-totals">
            <div>
              <span>Subtotal</span>
              <strong data-testid="cart-total">{money(total)}</strong>
            </div>
            <p>Sem taxa, cobrança ou envio. Apenas demonstração.</p>
          </div>
          <button
            className="lab-button"
            disabled={!items.length}
            onClick={simulateOrder}
          >
            Simular pedido <ArrowRight size={16} aria-hidden="true" />
          </button>
          <button
            className="restaurant-clear"
            disabled={!items.length}
            onClick={() => {
              dispatch({ type: "clear" });
              setNotice("Pedido demonstrativo reiniciado.");
            }}
          >
            Limpar pedido
          </button>
          {order && (
            <button
              className="restaurant-last-order"
              onClick={() => setOrderOpen(true)}
            >
              Rever último pedido simulado
            </button>
          )}
          <p className="restaurant-cart-note">
            Os dados ficam nesta página. Recarregar ou reiniciar a demo descarta
            o cenário.
          </p>
        </aside>
      </div>
      <div className="restaurant-bottom-note">
        <span>oliva.</span>
        <p>
          Uma experiência fictícia da Best Creations.
          <br />
          Sem pedidos, reservas ou pagamentos reais.
        </p>
      </div>
      <DemoDialog
        open={orderOpen}
        title="Pedido de demonstração"
        onClose={() => setOrderOpen(false)}
      >
        {order && (
          <div className="restaurant-order-confirm">
            <CheckCircle2 size={38} strokeWidth={1.2} aria-hidden="true" />
            <p className="lab-eyebrow">{order.code}</p>
            <h3>Uma escolha bem servida.</h3>
            <p>
              Simulação preparada apenas no navegador. Nenhum pedido foi enviado
              e nenhum valor foi cobrado.
            </p>
            <ul>
              {order.items.map((item) => (
                <li key={item.id}>
                  <span>
                    {item.quantity} × {item.name}
                  </span>
                  <strong>{money(item.subtotalCents)}</strong>
                </li>
              ))}
            </ul>
            <div>
              <span>Total demonstrativo</span>
              <strong>{money(order.total)}</strong>
            </div>
            <button className="lab-button" onClick={() => setOrderOpen(false)}>
              Continuar explorando <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </DemoDialog>
      <DemoDialog
        open={reserveOpen}
        title={
          reservation ? "Reserva simulada" : "Uma mesa, uma possibilidade."
        }
        onClose={() => setReserveOpen(false)}
      >
        {reservation ? (
          <div className="restaurant-reservation-confirm">
            <CheckCircle2 size={36} strokeWidth={1.2} aria-hidden="true" />
            <h3>Simulação registrada.</h3>
            <p>
              <strong>{reservation.name}</strong>
              <br />
              {prettyDate(reservation.date)} · {reservation.time} ·{" "}
              {reservation.guests}{" "}
              {reservation.guests === 1 ? "pessoa" : "pessoas"}
            </p>
            <p>
              Nenhuma mesa real foi reservada. Esta informação existe somente
              nesta sessão.
            </p>
            <button
              className="lab-button"
              onClick={() => {
                setReservation(null);
                setErrors({});
              }}
            >
              Nova simulação
            </button>
          </div>
        ) : (
          <form className="lab-form" noValidate onSubmit={reserve}>
            <p className="lab-dialog-note">
              Use um nome inventado. Não pedimos contato nem enviamos mensagens.
            </p>
            <label>
              Nome fictício
              <input
                name="name"
                required
                maxLength={80}
                placeholder="Ex.: Alex Exemplo"
                aria-invalid={!!errors.name}
                aria-describedby={
                  errors.name ? "restaurant-error-name" : undefined
                }
              />
              {fieldError("name")}
            </label>
            <div className="lab-form-grid">
              <label>
                Data da simulação
                <input
                  type="date"
                  name="date"
                  required
                  min={addDays(today, 1)}
                  max={addDays(today, 30)}
                  defaultValue={addDays(today, 1)}
                  aria-invalid={!!errors.date}
                  aria-describedby={
                    errors.date ? "restaurant-error-date" : undefined
                  }
                />
                {fieldError("date")}
              </label>
              <label>
                Horário
                <select name="time">
                  <option>19:00</option>
                  <option>19:30</option>
                  <option>20:00</option>
                  <option>20:30</option>
                </select>
              </label>
            </div>
            <label>
              Número de pessoas
              <select name="guests" defaultValue="2">
                {[1, 2, 3, 4, 5, 6].map((number) => (
                  <option key={number} value={number}>
                    {number} {number === 1 ? "pessoa" : "pessoas"}
                  </option>
                ))}
              </select>
              {fieldError("guests")}
            </label>
            <button className="lab-button" type="submit">
              Simular reserva <CalendarDays size={16} aria-hidden="true" />
            </button>
          </form>
        )}
      </DemoDialog>
    </section>
  );
}

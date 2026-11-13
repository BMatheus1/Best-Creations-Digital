import Image from "next/image";
import type { ReactNode } from "react";

const photos = {
  vitta: "Corredora com roupa esportiva em cenário urbano",
  tenis: "Tênis esportivos pretos em piso de concreto",
  lumina: "Sala de tratamentos com linho e pedra em tons de areia",
  sapore: "Pizza margherita artesanal com manjericão",
  forma: "Residência de concreto cercada por oliveiras",
  wellness: "Atleta treinando com halteres em academia",
};
type PhotoName = keyof typeof photos;
type Props = {
  concept: string;
  screen: number;
  navigate: (screen: number) => void;
  choices: Record<string, string>;
  select: (key: string, value: string) => void;
};

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});
const treatments = ["Massagem relaxante", "Ritual facial", "Escalda-pés"];
const professionals = ["Clara Mendes", "Helena Costa", "Lia Rocha"];
const products = ["Tênis Pulso", "Conjunto Linha", "Jaqueta Ritmo"];
const pizzas = ["Margherita", "Calabresa artesanal", "Cogumelos"];
const places = ["Casa das Oliveiras", "Casa Pátio", "Pavilhão do Jardim"];
const clients = [
  ["Casa Norte", "Proposta", 4800],
  ["Ateliê 41", "Fechado", 7200],
  ["Café Horizonte", "Em contato", 2900],
] as const;

function Photo({ name }: { name: PhotoName }) {
  return (
    <Image
      className="concept-photo"
      src={"/catalogo/" + name + ".webp"}
      alt={photos[name]}
      width={512}
      height={512}
      sizes="(max-width: 760px) 90vw, 450px"
    />
  );
}

function Action({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button type="button" className="demo-action" onClick={onClick}>
      {children}
    </button>
  );
}

function Options({
  label,
  values,
  value,
  onChange,
}: {
  label: string;
  values: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="demo-options" role="group" aria-label={label}>
      <span>{label}</span>
      <div>
        {values.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={item === value}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

function Hero({
  photo,
  title,
  subtitle,
  action,
  onAction,
}: {
  photo: PhotoName;
  title: string;
  subtitle: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="demo-hero">
      <Photo name={photo} />
      <div>
        <h4>{title}</h4>
        <p>{subtitle}</p>
        <Action onClick={onAction}>{action}</Action>
      </div>
    </div>
  );
}

function Rows({
  rows,
  action,
  onSelect,
}: {
  rows: readonly (readonly [string, string])[];
  action?: string;
  onSelect?: (name: string) => void;
}) {
  return (
    <ul className="demo-rows">
      {rows.map(([name, detail]) => (
        <li key={name}>
          <div>
            <strong>{name}</strong>
            <small>{detail}</small>
          </div>
          {action && onSelect && (
            <Action onClick={() => onSelect(name)}>
              {action}
              <span className="sr-only"> {name}</span>
            </Action>
          )}
        </li>
      ))}
    </ul>
  );
}

function Vitta({ screen, navigate, choices, select }: Props) {
  const item = choices.product ?? products[0];
  const size = choices.size ?? "M";
  const color = choices.color ?? "Preto";
  const price = item === products[0] ? 329 : item === products[1] ? 219 : 289;
  const quantity = Number(choices.quantity ?? 0);
  function open(name: string) {
    select("product", name);
    select("size", name === products[0] ? "39" : "M");
    navigate(2);
  }
  if (screen === 0)
    return (
      <Hero
        photo="vitta"
        title="Feita para mover."
        subtitle="Da rua à pista. Peças para o seu ritmo."
        action="Ver coleção"
        onAction={() => navigate(1)}
      />
    );
  if (screen === 1) {
    const category = choices.category ?? "Todos";
    const items =
      category === "Tênis"
        ? products.slice(0, 1)
        : category === "Vestuário"
          ? products.slice(1)
          : products;
    return (
      <>
        <h4>Coleção em movimento</h4>
        <Options
          label="Categoria"
          values={["Todos", "Tênis", "Vestuário"]}
          value={category}
          onChange={(v) => select("category", v)}
        />
        <div className="demo-card-grid">
          {items.map((name) => (
            <button type="button" key={name} onClick={() => open(name)}>
              <Photo name={name === products[0] ? "tenis" : "vitta"} />
              <strong>{name}</strong>
            </button>
          ))}
        </div>
      </>
    );
  }
  if (screen === 2)
    return (
      <div className="demo-detail">
        <Photo name={item === products[0] ? "tenis" : "vitta"} />
        <div>
          <h4>{item}</h4>
          <p>{money.format(price)}</p>
          <Options
            label="Tamanho"
            values={
              item === products[0] ? ["38", "39", "40", "41"] : ["P", "M", "G"]
            }
            value={choices.size ?? (item === products[0] ? "39" : "M")}
            onChange={(v) => select("size", v)}
          />
          <Options
            label="Cor"
            values={["Preto", "Grafite"]}
            value={color}
            onChange={(v) => select("color", v)}
          />
          <Action
            onClick={() => {
              select("bag", item);
              select(
                "bagDetail",
                (choices.size ?? (item === products[0] ? "39" : size)) +
                  " · " +
                  color,
              );
              select("price", String(price));
              select("quantity", "1");
              navigate(3);
            }}
          >
            Adicionar ao carrinho
          </Action>
        </div>
      </div>
    );
  if (screen === 3)
    return (
      <>
        <h4>Seu carrinho</h4>
        {quantity ? (
          <>
            <Rows
              rows={[
                [choices.bag, choices.bagDetail + " · " + quantity + " un."],
              ]}
              action="Remover"
              onSelect={() => select("quantity", "0")}
            />
            <p>Total demonstrativo</p>
            <strong>{money.format(Number(choices.price) * quantity)}</strong>
          </>
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
        <Action onClick={() => navigate(1)}>Ver produtos</Action>
      </>
    );
  return (
    <>
      <Photo name="tenis" />
      <h4>Escolhas para hoje</h4>
      <Rows
        rows={[
          [products[0], money.format(329)],
          [products[1], money.format(219)],
        ]}
        action="Ver"
        onSelect={open}
      />
      <MobileNav
        items={["Início", "Coleção", "Carrinho"]}
        onSelect={(i) => navigate([4, 1, 3][i])}
      />
    </>
  );
}

function Lumina({ screen, navigate, choices, select }: Props) {
  const treatment = choices.treatment ?? treatments[0];
  const person = choices.person ?? professionals[0];
  function choose(name: string) {
    select("treatment", name);
    navigate(2);
  }
  if (screen === 0)
    return (
      <Hero
        photo="lumina"
        title="Um tempo para você."
        subtitle="Rituais de cuidado em um espaço de pausa."
        action="Conhecer tratamentos"
        onAction={() => navigate(1)}
      />
    );
  if (screen === 1)
    return (
      <>
        <h4>Rituais de cuidado</h4>
        <Rows
          rows={treatments.map((name, i) => [
            name,
            [
              "60 min · " + money.format(180),
              "45 min · " + money.format(140),
              "30 min · " + money.format(90),
            ][i],
          ])}
          action="Escolher"
          onSelect={choose}
        />
      </>
    );
  if (screen === 3)
    return (
      <>
        <h4>Quem cuida de você</h4>
        <Rows
          rows={professionals.map((name, i) => [
            name,
            ["Terapias corporais", "Estética facial", "Bem-estar"][i],
          ])}
          action="Selecionar"
          onSelect={(name) => {
            select("person", name);
            navigate(2);
          }}
        />
      </>
    );
  if (screen === 4)
    return (
      <>
        <Photo name="lumina" />
        <h4>Seu momento Lumina</h4>
        <Rows rows={[[treatment, "Sessão de autocuidado"]]} />
        <Action onClick={() => navigate(2)}>Escolher horário</Action>
        <MobileNav
          items={["Início", "Tratamentos", "Equipe"]}
          onSelect={(i) => navigate([4, 1, 3][i])}
        />
      </>
    );
  const date = choices.date ?? "12/12";
  const hour = choices.hour ?? "10:00";
  return (
    <>
      <h4>Escolha seu horário</h4>
      <p>
        {treatment} com {person}
      </p>
      <Options
        label="Data"
        values={["12/12", "13/12", "14/12"]}
        value={date}
        onChange={(v) => select("date", v)}
      />
      <Options
        label="Horário"
        values={["10:00", "14:30", "16:00"]}
        value={hour}
        onChange={(v) => select("hour", v)}
      />
      <Action
        onClick={() =>
          select(
            "booking",
            treatment + " · " + person + " · " + date + " às " + hour,
          )
        }
      >
        Preparar resumo
      </Action>
      {choices.booking && (
        <p role="status">Agendamento simulado: {choices.booking}.</p>
      )}
    </>
  );
}

function Sapore({ screen, navigate, choices, select }: Props) {
  const pizza = choices.pizza ?? pizzas[0];
  const size = choices.pizzaSize ?? "Média";
  const extra = choices.extra ?? "Sem adicional";
  const total =
    (size === "Grande" ? 79 : 59) + (extra === "Sem adicional" ? 0 : 8);
  function choose(name: string) {
    select("pizza", name);
    navigate(2);
  }
  if (screen === 0)
    return (
      <Hero
        photo="sapore"
        title="Da massa ao forno."
        subtitle="Fermentação lenta. Ingredientes frescos. Pizza de verdade."
        action="Abrir cardápio"
        onAction={() => navigate(1)}
      />
    );
  if (screen === 1)
    return (
      <>
        <h4>Do nosso forno</h4>
        <Rows
          rows={pizzas.map((name, i) => [
            name,
            [
              "Tomate, mozzarella e manjericão",
              "Calabresa e cebola roxa",
              "Cogumelos e tomilho",
            ][i],
          ])}
          action="Montar"
          onSelect={choose}
        />
      </>
    );
  if (screen === 2)
    return (
      <div className="demo-detail">
        <Photo name="sapore" />
        <div>
          <h4>{pizza}</h4>
          <Options
            label="Tamanho"
            values={["Média", "Grande"]}
            value={size}
            onChange={(v) => select("pizzaSize", v)}
          />
          <Options
            label="Adicional"
            values={["Sem adicional", "Mozzarella", "Manjericão"]}
            value={extra}
            onChange={(v) => select("extra", v)}
          />
          <Action
            onClick={() => {
              select("order", pizza + " · " + size + " · " + extra);
              select("orderTotal", money.format(total));
              select("progress", "0");
              navigate(3);
            }}
          >
            Adicionar · {money.format(total)}
          </Action>
        </div>
      </div>
    );
  if (screen === 3) {
    const progress = Number(choices.progress ?? 0);
    const stages = [
      "No carrinho",
      "Preparando",
      "No forno",
      "Saiu para entrega",
    ];
    return (
      <>
        <h4>Acompanhe seu pedido</h4>
        <p>
          {choices.order ?? "Pedido exemplo · Margherita média"}{" "}
          {choices.orderTotal ?? money.format(59)}
        </p>
        <ol className="demo-timeline">
          {stages.map((stage, i) => (
            <li key={stage} aria-current={i === progress ? "step" : undefined}>
              {stage}
            </li>
          ))}
        </ol>
        {progress < 3 && (
          <Action onClick={() => select("progress", String(progress + 1))}>
            {progress === 0 ? "Simular pedido" : "Avançar simulação"}
          </Action>
        )}
        <p role="status">{stages[progress]} · Nenhum pedido real</p>
      </>
    );
  }
  return (
    <>
      <Photo name="sapore" />
      <h4>Pizza para hoje</h4>
      <Rows
        rows={pizzas.map((name) => [name, "A partir de " + money.format(59)])}
        action="Montar"
        onSelect={choose}
      />
      <MobileNav
        items={["Cardápio", "Pedido"]}
        onSelect={(i) => navigate(i === 0 ? 4 : 3)}
      />
    </>
  );
}

function Nexus({ screen, choices, select, navigate }: Props) {
  const filter = choices.filter ?? "Todos";
  const sum = clients.reduce((total, client) => total + client[2], 0);
  const filtered = clients.filter(
    (client) => filter === "Todos" || filter === client[1],
  );
  return (
    <div className="nexus-layout">
      {screen !== 4 && (
        <aside>
          <strong>Nexus</strong>
          {["Visão geral", "Clientes", "Vendas", "Relatórios"].map(
            (label, i) => (
              <button
                type="button"
                key={label}
                aria-current={screen === i ? "page" : undefined}
                onClick={() => navigate(i)}
              >
                {label}
              </button>
            ),
          )}
        </aside>
      )}
      <div className="nexus-body">
        <h4>
          {
            [
              "Visão geral",
              "Clientes",
              "Pipeline de vendas",
              "Relatório comercial",
              "Resumo da operação",
            ][screen]
          }
        </h4>
        {[0, 3, 4].includes(screen) && (
          <div className="nexus-metrics">
            <div>
              <small>Carteira comercial</small>
              <strong>{money.format(sum)}</strong>
            </div>
            <div>
              <small>Clientes</small>
              <strong>{clients.length}</strong>
            </div>
          </div>
        )}
        {[0, 3].includes(screen) && (
          <div className="nexus-chart" aria-label="Valor por cliente">
            {clients.map(([name, , value]) => (
              <div key={name}>
                <span>{name}</span>
                <i style={{ width: (value / 7200) * 100 + "%" }} />
                <small>{money.format(value)}</small>
              </div>
            ))}
          </div>
        )}
        {[1, 2].includes(screen) && (
          <>
            <Options
              label="Filtrar por etapa"
              values={["Todos", "Proposta", "Fechado", "Em contato"]}
              value={filter}
              onChange={(v) => select("filter", v)}
            />
            <Rows
              rows={filtered.map(([name, stage, value]) => [
                name,
                stage + " · " + money.format(value),
              ])}
            />
          </>
        )}
        {screen === 4 && (
          <>
            <Rows rows={clients.map(([name, stage]) => [name, stage])} />
            <MobileNav
              items={["Resumo", "Clientes", "Vendas"]}
              onSelect={(i) => navigate([4, 1, 2][i])}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Forma({ screen, navigate, choices, select }: Props) {
  const project = choices.place ?? places[0];
  const filter = choices.architecture ?? "Todos";
  const view = choices.view ?? "Fachada";
  if (screen === 0)
    return (
      <Hero
        photo="forma"
        title="Entre luz e matéria."
        subtitle="Arquitetura que acolhe o cotidiano."
        action="Ver projetos"
        onAction={() => navigate(1)}
      />
    );
  if (screen === 1)
    return (
      <>
        <h4>Projetos selecionados</h4>
        <Options
          label="Categoria"
          values={["Todos", "Residencial", "Paisagismo"]}
          value={filter}
          onChange={(v) => select("architecture", v)}
        />
        <Rows
          rows={places
            .filter(
              (_, i) =>
                filter === "Todos" ||
                (filter === "Residencial" ? i < 2 : i === 2),
            )
            .map((name) => [
              name,
              name === places[2] ? "Paisagismo" : "Residencial",
            ])}
          action="Explorar"
          onSelect={(name) => {
            select("place", name);
            navigate(2);
          }}
        />
      </>
    );
  if (screen === 2)
    return (
      <>
        <h4>{project}</h4>
        <div className={"forma-view " + (view === "Pátio" ? "view-patio" : "")}>
          <Photo name="forma" />
        </div>
        <Options
          label="Enquadramento"
          values={["Fachada", "Pátio"]}
          value={view}
          onChange={(v) => select("view", v)}
        />
        <Action
          onClick={() =>
            select(
              "place",
              places[(places.indexOf(project) + 1) % places.length],
            )
          }
        >
          Próximo projeto
        </Action>
      </>
    );
  if (screen === 3)
    return (
      <>
        <p>ARQUITETURA · INTERIORES · PAISAGEM</p>
        <h4>O escritório</h4>
        <p>
          Desenhamos a partir do lugar. A luz, o clima e os materiais orientam
          cada decisão, da implantação ao detalhe.
        </p>
        <Photo name="forma" />
      </>
    );
  return (
    <>
      <Photo name="forma" />
      <h4>{places[0]}</h4>
      <p>Concreto, vidro e sombra no ritmo da paisagem.</p>
      <MobileNav
        items={["Obras", "Escritório"]}
        onSelect={(i) => navigate(i === 0 ? 1 : 3)}
      />
    </>
  );
}

function MobileNav({
  items,
  onSelect,
}: {
  items: string[];
  onSelect: (index: number) => void;
}) {
  return (
    <div
      className="demo-mobile-nav"
      role="group"
      aria-label="Navegação do aplicativo"
    >
      {items.map((item, i) => (
        <button type="button" key={item} onClick={() => onSelect(i)}>
          {item}
        </button>
      ))}
    </div>
  );
}

function Wellness({ screen, navigate, choices, select }: Props) {
  if (screen === 0)
    return (
      <Hero
        photo="wellness"
        title="Treine do seu jeito."
        subtitle="Estrutura, orientação e aulas para diferentes rotinas."
        action="Conhecer planos"
        onAction={() => navigate(1)}
      />
    );
  if (screen === 1)
    return (
      <>
        <h4>Planos e unidades</h4>
        <Options
          label="Unidade"
          values={["Centro", "Vila Nova"]}
          value={choices.unit ?? "Centro"}
          onChange={(v) => select("unit", v)}
        />
        <Rows
          rows={[
            ["Essencial", money.format(119) + " / mês · Musculação"],
            ["Completo", money.format(169) + " / mês · Musculação e aulas"],
          ]}
        />
      </>
    );
  if (screen === 2)
    return (
      <>
        <h4>Encontre sua modalidade</h4>
        <Rows
          rows={[
            ["Funcional", "Treinos em grupo · 45 min"],
            ["Mobilidade", "Aula guiada · 30 min"],
            ["Musculação", "Treino individual"],
          ]}
          action="Ver agenda"
          onSelect={(name) => {
            select("class", name);
            navigate(4);
          }}
        />
      </>
    );
  if (screen === 3) {
    const tab = choices.appTab ?? "Treino";
    return (
      <>
        <h4>{tab === "Treino" ? "Treino do dia" : tab}</h4>
        {tab === "Treino" && (
          <Rows
            rows={[
              ["Agachamento", "3 séries · 10 repetições"],
              ["Remada", "3 séries · 12 repetições"],
              ["Prancha", "3 séries · 30 segundos"],
            ]}
          />
        )}
        {tab === "Evolução" && (
          <Rows
            rows={[
              ["Outubro", "8 treinos concluídos"],
              ["Novembro", "12 treinos concluídos"],
            ]}
          />
        )}
        {tab === "Histórico" && (
          <Rows
            rows={[
              ["10/11", "Treino de membros inferiores"],
              ["08/11", "Treino de membros superiores"],
            ]}
          />
        )}
        {tab === "Perfil" && (
          <Rows rows={[["Marina Alves", "Aluna fictícia · Plano Completo"]]} />
        )}
        <MobileNav
          items={["Treino", "Evolução", "Histórico", "Perfil"]}
          onSelect={(i) =>
            select("appTab", ["Treino", "Evolução", "Histórico", "Perfil"][i])
          }
        />
        <Action onClick={() => navigate(4)}>Agenda de aulas</Action>
      </>
    );
  }
  const hour = choices.classHour ?? "08:00";
  return (
    <>
      <h4>Agenda de aulas</h4>
      <p>{choices.class ?? "Funcional"} · 12/12</p>
      <Options
        label="Horário"
        values={["08:00", "12:00", "18:30"]}
        value={hour}
        onChange={(v) => select("classHour", v)}
      />
      <Action onClick={() => select("classBooking", hour)}>
        Simular reserva
      </Action>
      {choices.classBooking && (
        <p role="status">
          Aula selecionada às {choices.classBooking}. Reserva demonstrativa.
        </p>
      )}
      <MobileNav
        items={["Meu treino", "Modalidades"]}
        onSelect={(i) => navigate(i === 0 ? 3 : 2)}
      />
    </>
  );
}

const previews: Record<string, (props: Props) => ReactNode> = {
  vitta: Vitta,
  lumina: Lumina,
  sapore: Sapore,
  nexus: Nexus,
  forma: Forma,
  wellness: Wellness,
};

export function ConceptPreview(props: Props) {
  const Preview = previews[props.concept];
  return (
    <div className={"concept-preview demo-" + props.concept}>
      {!(props.concept === "nexus" && props.screen !== 4) && (
        <div className="demo-brand">{props.concept}</div>
      )}
      <Preview {...props} />
    </div>
  );
}

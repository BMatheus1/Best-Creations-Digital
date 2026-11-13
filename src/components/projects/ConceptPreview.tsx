import Image from "next/image";
import type { ReactNode } from "react";
import { getConcept, type PreviewDevice } from "@/data/concepts";

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
  device: PreviewDevice;
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

function Vitta({ screen, device, navigate, choices, select }: Props) {
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
              select("checkout", "");
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
        {device === "mobile" && quantity > 0 && (
          <Action onClick={() => navigate(5)}>Finalizar compra</Action>
        )}
      </>
    );
  if (screen === 5)
    return (
      <>
        <h4>Resumo da compra</h4>
        {quantity ? (
          <>
            <Rows
              rows={[
                [choices.bag, choices.bagDetail],
                ["Entrega padrão", "3 a 5 dias úteis · Grátis"],
                ["Total", money.format(Number(choices.price))],
              ]}
            />
            <Action onClick={() => select("checkout", "confirmado")}>
              Simular compra
            </Action>
            {choices.checkout && (
              <p role="status">Compra simulada. Nenhuma cobrança foi feita.</p>
            )}
          </>
        ) : (
          <Action onClick={() => navigate(1)}>Escolher produtos</Action>
        )}
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
        <h4>Seu momento de cuidado</h4>
        <Rows rows={[[treatment, "Sessão de autocuidado"]]} />
        <Action onClick={() => navigate(2)}>Escolher horário</Action>
      </>
    );
  if (screen === 5)
    return (
      <>
        <h4>Confirmação de horário</h4>
        {choices.booking ? (
          <p role="status">Agendamento simulado: {choices.booking}.</p>
        ) : (
          <p>Escolha um tratamento e horário para ver seu resumo.</p>
        )}
        <Action onClick={() => navigate(2)}>Voltar à agenda</Action>
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
        onClick={() => {
          select(
            "booking",
            treatment + " · " + person + " · " + date + " às " + hour,
          );
          navigate(5);
        }}
      >
        Revisar horário
      </Action>
    </>
  );
}

function Pizzaria({ screen, device, navigate, choices, select }: Props) {
  const pizza = choices.pizza ?? pizzas[0];
  const size = choices.pizzaSize ?? "Média";
  const extra = choices.extra ?? "Sem adicional";
  const offer = choices.offer === "retirada" && size === "Média";
  const total =
    (size === "Grande" ? 79 : offer ? 49 : 59) +
    (extra === "Sem adicional" ? 0 : 8);
  function choose(name: string) {
    select("pizza", name);
    select("offer", "");
    navigate(2);
  }
  if (screen === 0)
    return (
      <>
        <Hero
          photo="sapore"
          title="Da massa ao forno."
          subtitle="Fermentação lenta. Ingredientes frescos. Pizza de verdade."
          action="Abrir cardápio"
          onAction={() => navigate(1)}
        />
        <div className="demo-feature">
          <strong>Destaque da casa · Margherita</strong>
          <Action onClick={() => navigate(8)}>Ver promoções</Action>
        </div>
      </>
    );
  if (screen === 8)
    return (
      <>
        <h4>Ofertas da casa</h4>
        <p>Margherita média com preço especial para retirada.</p>
        <Photo name="sapore" />
        <Action
          onClick={() => {
            select("pizza", pizzas[0]);
            select("pizzaSize", "Média");
            select("extra", "Sem adicional");
            select("offer", "retirada");
            navigate(2);
          }}
        >
          Montar oferta
        </Action>
      </>
    );
  if (screen === 1)
    return (
      <>
        <h4>Do nosso forno</h4>
        {choices.orderNotice && <p role="status">{choices.orderNotice}</p>}
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
          {offer && <p>Oferta para retirada no balcão</p>}
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
              select("pickup", offer ? "Retirada no balcão" : "Entrega");
              navigate(5);
            }}
          >
            Adicionar · {money.format(total)}
          </Action>
        </div>
      </div>
    );
  if (screen === 5)
    return (
      <>
        <h4>Seu carrinho</h4>
        {choices.order ? (
          <>
            <Rows
              rows={[
                [choices.order, choices.orderTotal],
                [choices.pickup, "Pedido demonstrativo"],
              ]}
            />
            <Action
              onClick={() => {
                select("activeOrder", choices.order);
                select("activeTotal", choices.orderTotal);
                select("activePickup", choices.pickup);
                select("progress", "0");
                select("order", "");
                navigate(device === "mobile" ? 3 : 1);
                if (device === "desktop")
                  select(
                    "orderNotice",
                    "Pedido simulado. Nenhum pedido foi enviado.",
                  );
              }}
            >
              Simular pedido
            </Action>
            <Action onClick={() => select("order", "")}>Remover pizza</Action>
          </>
        ) : (
          <p>Seu carrinho está vazio.</p>
        )}
        <Action onClick={() => navigate(1)}>Voltar ao cardápio</Action>
      </>
    );
  if (screen === 6)
    return (
      <>
        <h4>Perfil e pedidos</h4>
        <div className="demo-feature">
          <strong>Ana Ribeiro</strong>
          <p>Cliente demonstrativa</p>
        </div>
        <Rows
          rows={[
            ...(choices.activeOrder
              ? [[choices.activeOrder, "Pedido simulado recente"] as const]
              : []),
            ["Calabresa artesanal · Grande", "Entregue · Pedido anterior"],
            ["Margherita · Média", "Entregue · Pedido anterior"],
          ]}
        />
        <Action onClick={() => navigate(3)}>Ver pedido atual</Action>
      </>
    );
  if (screen === 3) {
    const progress = Number(choices.progress ?? 0);
    const stages = [
      "Pedido recebido",
      "Preparando",
      "No forno",
      choices.activePickup === "Retirada no balcão"
        ? "Pronto para retirada"
        : "Saiu para entrega",
    ];
    return (
      <>
        <h4>Acompanhe seu pedido</h4>
        <p>
          {choices.activeOrder ?? "Pedido exemplo · Margherita média"}{" "}
          {choices.activeTotal ?? money.format(59)}
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
            Avançar simulação
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
    </>
  );
}

function Nexus({ screen, device, choices, select, navigate }: Props) {
  const filter = choices.filter ?? "Todos";
  const sum = clients.reduce((total, client) => total + client[2], 0);
  const filtered = clients.filter(
    (client) => filter === "Todos" || filter === client[1],
  );
  return (
    <div className="nexus-layout">
      {device === "desktop" && (
        <aside>
          <strong>Gestão Bc.</strong>
          {[
            [0, "Visão geral"],
            [1, "Clientes"],
            [2, "Vendas"],
            [3, "Relatórios"],
            [5, "Atividades"],
          ].map(([i, label]) => (
            <button
              type="button"
              key={label}
              aria-current={screen === i ? "page" : undefined}
              onClick={() => navigate(Number(i))}
            >
              {label}
            </button>
          ))}
        </aside>
      )}
      <div className="nexus-body">
        <h4>
          {
            [
              "Visão geral",
              "Clientes",
              device === "mobile"
                ? "Indicadores de vendas"
                : "Etapas de vendas",
              "Relatório comercial",
              "Resumo da operação",
              "Atividades recentes",
            ][screen]
          }
        </h4>
        {([0, 3, 4].includes(screen) ||
          (device === "mobile" && screen === 2)) && (
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
        {([0, 3].includes(screen) || (device === "mobile" && screen === 2)) && (
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
        {(screen === 1 || (screen === 2 && device === "desktop")) && (
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
            <Action onClick={() => navigate(5)}>Ver atividades</Action>
          </>
        )}
        {screen === 5 && (
          <Rows
            rows={[
              ["Ateliê 41 · Venda fechada", "Hoje · R$ 7.200,00"],
              ["Casa Norte · Proposta enviada", "Ontem · R$ 4.800,00"],
              ["Café Horizonte · Contato registrado", "Ontem · R$ 2.900,00"],
            ]}
          />
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
  if (screen === 5)
    return (
      <>
        <h4>Vamos conversar?</h4>
        <p>Conte ao escritório o tipo de projeto que você tem em mente.</p>
        <Options
          label="Tipo de projeto"
          values={["Residencial", "Interiores", "Paisagismo"]}
          value={choices.inquiry ?? "Residencial"}
          onChange={(value) => select("inquiry", value)}
        />
        <Action
          onClick={() =>
            select("contactSummary", choices.inquiry ?? "Residencial")
          }
        >
          Preparar contato
        </Action>
        {choices.contactSummary && (
          <p role="status">
            Interesse em {choices.contactSummary}. Contato demonstrativo, sem
            envio.
          </p>
        )}
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
        <Action onClick={() => navigate(5)}>Contato</Action>
      </>
    );
  return (
    <>
      <Photo name="forma" />
      <h4>{places[0]}</h4>
      <p>Concreto, vidro e sombra no ritmo da paisagem.</p>
      <Action onClick={() => navigate(1)}>Ver projetos</Action>
    </>
  );
}

function Wellness({ screen, device, navigate, choices, select }: Props) {
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
  if (screen === 5)
    return (
      <>
        <h4>Olá, Marina</h4>
        <div className="demo-feature">
          <strong>Seu próximo treino</strong>
          <p>Força e mobilidade · 35 min · 3 exercícios</p>
          <Action onClick={() => navigate(3)}>Ver treino do dia</Action>
        </div>
        <Rows
          rows={[
            ["Esta semana", "3 de 4 treinos concluídos"],
            ["Próxima aula", "Funcional · 12/12 · 08:00"],
          ]}
        />
        <Action onClick={() => navigate(4)}>Consultar agenda</Action>
      </>
    );
  if (screen === 3)
    return (
      <>
        <h4>Treino do dia</h4>
        <Photo name="wellness" />
        <p>Força e mobilidade · 35 minutos</p>
        <Action onClick={() => navigate(6)}>Abrir exercícios</Action>
      </>
    );
  if (screen === 6)
    return (
      <>
        <h4>Exercícios</h4>
        <Rows
          rows={[
            ["Agachamento", "3 séries · 10 repetições"],
            ["Remada", "3 séries · 12 repetições"],
            ["Prancha", "3 séries · 30 segundos"],
          ]}
          action="Concluir"
          onSelect={(name) => select("exercise:" + name, "concluído")}
        />
        <p role="status">
          {
            Object.keys(choices).filter((key) => key.startsWith("exercise:"))
              .length
          }{" "}
          de 3 exercícios concluídos
        </p>
      </>
    );
  if (screen === 7)
    return (
      <>
        <h4>Sua evolução</h4>
        <label>
          Meta semanal <progress value={3} max={4} /> 3 de 4 treinos
        </label>
        <Rows
          rows={[
            ["Novembro", "12 treinos concluídos"],
            ["Outubro", "8 treinos concluídos"],
            ["10/11", "Treino de membros inferiores"],
            ["08/11", "Treino de membros superiores"],
          ]}
        />
      </>
    );
  if (screen === 8)
    return (
      <>
        <h4>Perfil do aluno</h4>
        <div className="demo-feature">
          <strong>Marina Alves</strong>
          <p>Aluna fictícia · Plano Completo</p>
        </div>
        <Rows
          rows={[
            ["Unidade", "Centro"],
            ["Plano", "Musculação e aulas em grupo"],
          ]}
        />
      </>
    );
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
      {device === "desktop" && (
        <Action onClick={() => navigate(2)}>Ver modalidades</Action>
      )}
    </>
  );
}

const previews: Record<string, (props: Props) => ReactNode> = {
  vitta: Vitta,
  lumina: Lumina,
  sapore: Pizzaria,
  nexus: Nexus,
  forma: Forma,
  wellness: Wellness,
};

export function ConceptPreview(props: Props) {
  const Preview = previews[props.concept];
  const concept = getConcept(props.concept)!;
  const navigation = concept.mobile.filter(([id]) => {
    if (props.concept === "sapore") return [4, 1, 5, 6].includes(id);
    if (props.concept === "wellness") return [5, 3, 4, 8].includes(id);
    return id !== 2 && id !== 5;
  });
  const shortLabels: Record<string, string> = {
    "Início do app": "Início",
    "Início da loja": "Início",
    "Início da clínica": "Início",
    "Início do portfólio": "Início",
    "Início do aluno": "Início",
    "Resumo do negócio": "Resumo",
    "Perfil e histórico": "Perfil",
    "Galeria de projetos": "Projetos",
    "Agenda de aulas": "Agenda",
    "Treino do dia": "Treino",
  };
  return (
    <div className={"concept-preview demo-" + props.concept}>
      {!(props.concept === "nexus" && props.device === "desktop") && (
        <div className="demo-brand">{concept.name}</div>
      )}
      <div className="demo-content">
        <Preview {...props} />
      </div>
      {props.device === "mobile" && (
        <nav className="demo-mobile-nav" aria-label="Navegação da demonstração">
          {navigation.map(([id, label]) => (
            <button
              type="button"
              key={id}
              aria-current={props.screen === id ? "page" : undefined}
              onClick={() => props.navigate(id)}
            >
              {shortLabels[label] ?? label}
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

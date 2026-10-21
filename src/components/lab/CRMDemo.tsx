"use client";
import { useReducer, useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  Check,
  CheckCheck,
  History,
  LayoutDashboard,
  ListTodo,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  Columns3,
  RotateCcw,
} from "lucide-react";
import {
  crmClientSchema,
  crmReducer,
  crmSegments,
  crmStages,
  crmStats,
  money,
  seedCRM,
  type CRMClient,
  type CRMStage,
} from "@/lib/lab/crm";
import { DemoDialog } from "./DemoDialog";
import { useDemoReady } from "./useDemoReady";
const areas = [
  { id: "overview", label: "Visão geral", icon: LayoutDashboard },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "pipeline", label: "Pipeline", icon: Columns3 },
  { id: "tasks", label: "Tarefas", icon: ListTodo },
] as const;
export function CRMDemo() {
  const demo = useDemoReady();
  const newClient = useRef<HTMLButtonElement>(null);
  const pipeline = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(crmReducer, undefined, seedCRM);
  const [area, setArea] = useState<(typeof areas)[number]["id"]>("overview");
  const [search, setSearch] = useState("");
  const [stage, setStage] = useState("Todos");
  const [segment, setSegment] = useState("Todos");
  const [editor, setEditor] = useState<CRMClient | "new" | null>(null);
  const [history, setHistory] = useState<number | null>(null);
  const [notice, setNotice] = useState(
    "Cenário fictício. Explore sem criar uma conta.",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const filtered = state.clients.filter(
    (client) =>
      (stage === "Todos" || client.stage === stage) &&
      (segment === "Todos" || client.segment === segment) &&
      `${client.name} ${client.company}`
        .toLocaleLowerCase("pt-BR")
        .includes(search.toLocaleLowerCase("pt-BR")),
  );
  const stats = crmStats(area === "clients" ? filtered : state.clients);
  const selected = typeof editor === "object" ? editor : null;
  const historyClient = state.clients.find((client) => client.id === history);
  function reset() {
    dispatch({ type: "reset" });
    setSearch("");
    setStage("Todos");
    setSegment("Todos");
    setEditor(null);
    setHistory(null);
    setNotice(
      "Cenário original restaurado. Todas as alterações da sessão foram descartadas.",
    );
  }
  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const result = crmClientSchema.safeParse(data);
    if (!result.success) {
      setErrors(
        Object.fromEntries(
          Object.entries(result.error.flatten().fieldErrors).map(
            ([key, value]) => [key, value?.[0] || "Revise este campo."],
          ),
        ),
      );
      const first = result.error.issues[0].path[0];
      const field = form.elements.namedItem(String(first));
      if (field instanceof HTMLElement) field.focus();
      return;
    }
    dispatch({ type: "save", id: selected?.id, data: result.data });
    setEditor(null);
    setErrors({});
    setNotice(
      selected
        ? "Cliente fictício atualizado."
        : "Cliente fictício adicionado ao cenário.",
    );
  }
  const fieldError = (name: string) =>
    errors[name] ? (
      <span id={`crm-error-${name}`} className="lab-error" role="alert">
        {errors[name]}
      </span>
    ) : null;
  function clientTable() {
    const rows = area === "overview" ? state.clients : filtered;
    return rows.length ? (
      <div className="crm-table-wrap">
        <table className="crm-table">
          <caption className="sr-only">Clientes fictícios do cenário</caption>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Segmento</th>
              <th>Etapa</th>
              <th>Oportunidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((client) => (
              <tr key={client.id}>
                <td data-label="Cliente">
                  <div className="crm-person">
                    <span className="crm-avatar" aria-hidden="true">
                      {client.name[0]}
                      {client.name.split(" ")[1]?.[0]}
                    </span>
                    <div>
                      <strong>{client.name}</strong>
                      <small>{client.company}</small>
                    </div>
                  </div>
                </td>
                <td data-label="Segmento">{client.segment}</td>
                <td data-label="Etapa">
                  <span
                    className={`crm-stage stage-${crmStages.indexOf(client.stage)}`}
                  >
                    {client.stage}
                  </span>
                </td>
                <td data-label="Oportunidade">{money(client.valueCents)}</td>
                <td data-label="Ações">
                  <div className="crm-row-actions">
                    <button
                      className="lab-icon"
                      aria-label={`Histórico de ${client.name}`}
                      onClick={() => setHistory(client.id)}
                    >
                      <History size={16} aria-hidden="true" />
                    </button>
                    <button
                      className="lab-icon"
                      aria-label={`Editar ${client.name}`}
                      onClick={() => {
                        setErrors({});
                        setEditor(client);
                      }}
                    >
                      <Pencil size={15} aria-hidden="true" />
                    </button>
                    <button
                      className="lab-icon"
                      aria-label={`Excluir ${client.name}`}
                      onClick={() => {
                        dispatch({ type: "delete", id: client.id });
                        newClient.current?.focus({ preventScroll: true });
                        setNotice(
                          "Cliente fictício excluído. O cenário pode ser restaurado.",
                        );
                      }}
                    >
                      <Trash2 size={15} aria-hidden="true" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="lab-empty">
        <Users size={30} strokeWidth={1} aria-hidden="true" />
        <h3>Nenhum cliente neste filtro.</h3>
        <p>Experimente outra busca ou adicione um contato fictício.</p>
        <button
          className="lab-button secondary"
          onClick={() => {
            setSearch("");
            setStage("Todos");
            setSegment("Todos");
          }}
        >
          Limpar filtros
        </button>
      </div>
    );
  }
  const taskList = (
    <ul className="crm-tasks">
      {state.tasks.map((task) => (
        <li key={task.id}>
          <label>
            <input
              type="checkbox"
              checked={task.done}
              onChange={() => {
                dispatch({ type: "task-toggle", id: task.id });
                setNotice("Tarefa atualizada.");
              }}
            />
            <span className={task.done ? "is-done" : ""}>{task.title}</span>
          </label>
          {task.done ? (
            <CheckCheck size={17} aria-hidden="true" />
          ) : (
            <span className="crm-task-dot" aria-hidden="true" />
          )}
        </li>
      ))}
    </ul>
  );
  return (
    <section
      ref={demo}
      className="lab-app crm-app"
      aria-label="Best CRM — ambiente demonstrativo"
    >
      <header className="crm-topbar">
        <div className="crm-product">
          <span className="crm-product-mark" aria-hidden="true">
            <Columns3 size={22} />
          </span>
          <h1>
            best<span>CRM</span>
          </h1>
          <span className="lab-demo-chip">DEMO</span>
        </div>
        <button className="lab-button secondary" onClick={reset}>
          <RotateCcw size={15} aria-hidden="true" /> Restaurar cenário
        </button>
      </header>
      <div className="crm-workspace">
        <aside className="crm-sidebar">
          <p>WORKSPACE FICTÍCIO</p>
          <nav aria-label="Áreas do CRM">
            {areas.map((item) => (
              <button
                key={item.id}
                aria-pressed={area === item.id}
                onClick={() => setArea(item.id)}
              >
                <item.icon size={18} aria-hidden="true" />
                {item.label}
                {item.id === "tasks" && (
                  <span>{state.tasks.filter((task) => !task.done).length}</span>
                )}
              </button>
            ))}
          </nav>
          <div className="crm-sidebar-note">
            <span className="crm-avatar" aria-hidden="true">
              DE
            </span>
            <div>
              <strong>Demo do estúdio</strong>
              <small>Todos os dados são fictícios</small>
            </div>
          </div>
        </aside>
        <div className="crm-main">
          <div className="crm-page-heading">
            <div>
              <p className="lab-eyebrow">GESTÃO EM MOVIMENTO</p>
              <h2>
                {area === "overview"
                  ? "Uma visão clara do seu negócio."
                  : area === "clients"
                    ? "Relacionamentos, em primeiro lugar."
                    : area === "pipeline"
                      ? "Cada oportunidade, um próximo passo."
                      : "Pequenas ações. Grandes caminhos."}
              </h2>
            </div>
            <button
              className="lab-button"
              ref={newClient}
              data-dialog-return
              onClick={() => {
                setErrors({});
                setEditor("new");
                setArea("clients");
              }}
            >
              <Plus size={17} aria-hidden="true" /> Novo cliente
            </button>
          </div>
          <p className="lab-status" role="status">
            {notice}
          </p>
          <div className="crm-metrics">
            <div>
              <span>
                {area === "clients"
                  ? "Clientes no filtro"
                  : "Clientes no cenário"}
              </span>
              <strong data-testid="crm-client-count">{stats.count}</strong>
              <small>Contatos demonstrativos</small>
            </div>
            <div>
              <span>Oportunidades abertas</span>
              <strong>{stats.open}</strong>
              <small>Em acompanhamento</small>
            </div>
            <div>
              <span>Valor de oportunidades</span>
              <strong>{money(stats.totalCents)}</strong>
              <small>Valores fictícios</small>
            </div>
            <div>
              <span>Concluído no cenário</span>
              <strong>{money(stats.wonCents)}</strong>
              <small>Sem receita comercial real</small>
            </div>
          </div>
          {area === "overview" && (
            <>
              <div className="crm-overview-grid">
                <section className="crm-panel">
                  <div className="crm-panel-heading">
                    <div>
                      <p className="lab-eyebrow">PIPELINE COMERCIAL</p>
                      <h3>O ritmo das oportunidades</h3>
                    </div>
                    <button
                      className="lab-icon"
                      aria-label="Explorar pipeline"
                      onClick={() => setArea("pipeline")}
                    >
                      <ArrowUpRight size={21} aria-hidden="true" />
                    </button>
                  </div>
                  <div
                    className="crm-bar-chart"
                    role="img"
                    aria-label={`Distribuição por etapa: ${crmStages.map((item) => `${item}: ${state.clients.filter((client) => client.stage === item).length}`).join(", ")}`}
                  >
                    {crmStages.map((item, i) => {
                      const count = state.clients.filter(
                        (client) => client.stage === item,
                      ).length;
                      return (
                        <div key={item}>
                          <span>{count}</span>
                          <i
                            style={{
                              height: `${Math.max(3, (count / Math.max(1, state.clients.length)) * 230)}px`,
                            }}
                            className={`bar-${i}`}
                          />
                          <small>{item}</small>
                        </div>
                      );
                    })}
                  </div>
                  <p className="crm-chart-note">
                    O gráfico acompanha as alterações feitas nesta sessão.
                  </p>
                </section>
                <section className="crm-panel">
                  <div className="crm-panel-heading">
                    <div>
                      <p className="lab-eyebrow">SUA ORGANIZAÇÃO</p>
                      <h3>Na lista de hoje</h3>
                    </div>
                    <ListTodo size={20} aria-hidden="true" />
                  </div>
                  {taskList}
                  <button
                    className="crm-inline-button"
                    onClick={() => setArea("tasks")}
                  >
                    Gerenciar tarefas{" "}
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </section>
              </div>
              <section className="crm-panel">
                <div className="crm-panel-heading">
                  <div>
                    <p className="lab-eyebrow">PESSOAS & POSSIBILIDADES</p>
                    <h3>Seus contatos demonstrativos</h3>
                  </div>
                  <button
                    className="crm-inline-button"
                    onClick={() => setArea("clients")}
                  >
                    Ver todos <ArrowUpRight size={15} aria-hidden="true" />
                  </button>
                </div>
                {clientTable()}
              </section>
            </>
          )}
          {area === "clients" && (
            <section className="crm-panel">
              <div className="crm-filters">
                <label className="crm-search">
                  <Search size={17} aria-hidden="true" />
                  <span className="sr-only">Buscar clientes</span>
                  <input
                    type="search"
                    placeholder="Buscar nome ou empresa"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                </label>
                <label>
                  <span>Etapa</span>
                  <select
                    aria-label="Filtrar por etapa"
                    value={stage}
                    onChange={(event) => setStage(event.target.value)}
                  >
                    <option>Todos</option>
                    {crmStages.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
                <label>
                  <span>Segmento</span>
                  <select
                    aria-label="Filtrar por segmento"
                    value={segment}
                    onChange={(event) => setSegment(event.target.value)}
                  >
                    <option>Todos</option>
                    {crmSegments.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </label>
              </div>
              {clientTable()}
            </section>
          )}
          {area === "pipeline" && (
            <div
              className="crm-pipeline"
              role="region"
              ref={pipeline}
              tabIndex={0}
              aria-label="Pipeline comercial"
            >
              {crmStages.map((item, i) => (
                <section className="crm-pipeline-column" key={item}>
                  <h3>
                    <span className={`crm-stage stage-${i}`}>{item}</span>
                    <small>
                      {
                        state.clients.filter((client) => client.stage === item)
                          .length
                      }
                    </small>
                  </h3>
                  {state.clients
                    .filter((client) => client.stage === item)
                    .map((client) => (
                      <article key={client.id}>
                        <small>{client.company}</small>
                        <h4>{client.name}</h4>
                        <p>{money(client.valueCents)}</p>
                        <label>
                          <span className="sr-only">
                            Etapa de {client.name}
                          </span>
                          <select
                            value={client.stage}
                            onChange={(event) => {
                              dispatch({
                                type: "stage",
                                id: client.id,
                                stage: event.target.value as CRMStage,
                              });
                              pipeline.current?.focus({ preventScroll: true });
                              setNotice(
                                `Oportunidade movida para ${event.target.value}.`,
                              );
                            }}
                          >
                            {crmStages.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        </label>
                        <button
                          className="crm-inline-button"
                          onClick={() => setHistory(client.id)}
                        >
                          Ver histórico <History size={14} aria-hidden="true" />
                        </button>
                      </article>
                    ))}
                  {!state.clients.some((client) => client.stage === item) && (
                    <p className="crm-pipeline-empty">
                      Nenhuma oportunidade nesta etapa.
                    </p>
                  )}
                </section>
              ))}
            </div>
          )}
          {area === "tasks" && (
            <section className="crm-panel crm-task-panel">
              <div className="crm-panel-heading">
                <div>
                  <p className="lab-eyebrow">FOCO NO PRÓXIMO PASSO</p>
                  <h3>Tarefas da demonstração</h3>
                </div>
                <span>
                  {state.tasks.filter((task) => task.done).length} /{" "}
                  {state.tasks.length}
                </span>
              </div>
              <form
                className="crm-task-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const form = event.currentTarget;
                  dispatch({
                    type: "task-add",
                    title: String(new FormData(form).get("task")),
                  });
                  form.reset();
                  setNotice("Tarefa fictícia adicionada.");
                }}
              >
                <label className="sr-only" htmlFor="crm-new-task">
                  Nova tarefa
                </label>
                <input
                  id="crm-new-task"
                  name="task"
                  placeholder="Escreva uma tarefa demonstrativa"
                  required
                  minLength={3}
                  maxLength={160}
                />
                <button className="lab-button" type="submit">
                  <Plus size={16} aria-hidden="true" /> Adicionar tarefa
                </button>
              </form>
              {taskList}
            </section>
          )}
          <p className="lab-session-note">
            Ambiente local da página. Sem banco de produção, login ou envios.
            Use apenas dados inventados. Recarregar descarta as alterações.
          </p>
        </div>
      </div>
      <DemoDialog
        open={editor !== null}
        title={selected ? "Editar cliente fictício" : "Novo cliente fictício"}
        onClose={() => setEditor(null)}
      >
        <p className="lab-dialog-note">
          Use apenas informações inventadas. E-mails devem terminar em .example.
        </p>
        <form
          className="lab-form"
          key={selected?.id || "new"}
          noValidate
          onSubmit={save}
        >
          <label>
            Nome fictício
            <input
              name="name"
              defaultValue={selected?.name || ""}
              maxLength={80}
              required
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "crm-error-name" : undefined}
            />
            {fieldError("name")}
          </label>
          <label>
            Empresa fictícia
            <input
              name="company"
              defaultValue={selected?.company || ""}
              maxLength={80}
              required
              aria-invalid={!!errors.company}
              aria-describedby={
                errors.company ? "crm-error-company" : undefined
              }
            />
            {fieldError("company")}
          </label>
          <label>
            E-mail fictício <small>(opcional)</small>
            <input
              name="email"
              type="email"
              defaultValue={selected?.email || ""}
              placeholder="nome@empresa.example"
              maxLength={150}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "crm-error-email" : undefined}
            />
            {fieldError("email")}
          </label>
          <div className="lab-form-grid">
            <label>
              Segmento
              <select
                name="segment"
                defaultValue={selected?.segment || "Serviços"}
              >
                {crmSegments.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
            <label>
              Etapa
              <select name="stage" defaultValue={selected?.stage || "Novo"}>
                {crmStages.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            Valor fictício da oportunidade (R$)
            <input
              name="value"
              type="number"
              min="0"
              max="1000000"
              step="0.01"
              required
              defaultValue={selected ? selected.valueCents / 100 : 0}
              aria-invalid={!!errors.value}
              aria-describedby={errors.value ? "crm-error-value" : undefined}
            />
            {fieldError("value")}
          </label>
          <div className="lab-form-actions">
            <button
              type="button"
              className="lab-button secondary"
              onClick={() => setEditor(null)}
            >
              Cancelar
            </button>
            <button className="lab-button" type="submit">
              <Check size={16} aria-hidden="true" /> Salvar cliente
            </button>
          </div>
        </form>
      </DemoDialog>
      <DemoDialog
        open={!!historyClient}
        title={`Histórico de ${historyClient?.name || "cliente"}`}
        onClose={() => setHistory(null)}
      >
        <p className="lab-dialog-note">
          Interações simuladas do cenário e ações feitas nesta sessão.
        </p>
        <ol className="crm-history">
          {historyClient?.history.map((event, index) => (
            <li key={index}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{event}</p>
            </li>
          ))}
        </ol>
      </DemoDialog>
    </section>
  );
}

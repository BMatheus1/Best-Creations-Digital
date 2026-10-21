"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  RotateCcw,
  Scissors,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  availableTimes,
  bookingProfessionals,
  bookingServices,
  bookingTimes,
  createAppointment,
  seedAppointments,
  type Appointment,
  type BookingProfessionalId,
  type BookingServiceId,
} from "@/lib/lab/booking";
import { addDays, money, prettyDate } from "@/lib/lab/format";
import { useDemoReady } from "./useDemoReady";
export function BookingDemo({ initialToday }: { initialToday: string }) {
  const demo = useDemoReady();
  const [today] = useState(initialToday);
  const [appointments, setAppointments] = useState(() =>
    seedAppointments(initialToday),
  );
  const [view, setView] = useState<"book" | "manage">("book");
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<BookingServiceId | null>(null);
  const [professionalId, setProfessionalId] =
    useState<BookingProfessionalId>("clara");
  const [date, setDate] = useState(() => addDays(initialToday, 1));
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [week, setWeek] = useState(0);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(
    "Explore com nomes fictícios. Nenhuma reserva comercial será criada.",
  );
  const [confirmed, setConfirmed] = useState<Appointment | null>(null);
  const [nextId, setNextId] = useState(2003);
  const workspace = useRef<HTMLDivElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const previous = useRef("book-0");
  useEffect(() => {
    const current = `${view}-${step}`;
    if (previous.current !== current) {
      const heading = workspace.current?.querySelector<HTMLElement>("h3");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
    previous.current = current;
  }, [view, step]);
  const service = bookingServices.find((item) => item.id === serviceId);
  const professional = bookingProfessionals.find(
    (item) => item.id === professionalId,
  )!;
  const times = availableTimes(
    serviceId || "",
    professionalId,
    date,
    appointments,
    today,
  );
  function reset() {
    setAppointments(seedAppointments(today));
    setView("book");
    setStep(0);
    setServiceId(null);
    setProfessionalId("clara");
    setDate(addDays(today, 1));
    setTime("");
    setName("");
    setWeek(0);
    setError("");
    setConfirmed(null);
    setNextId(2003);
    setNotice("Cenário original restaurado. Nenhum dado foi enviado.");
  }
  function newBooking() {
    setView("book");
    setStep(0);
    setConfirmed(null);
    setTime("");
    setError("");
    setName("");
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    const result = createAppointment(
      { name, serviceId, professionalId, date, time },
      appointments,
      nextId,
      today,
    );
    if (!result.success) {
      setError(result.error);
      nameField.current?.focus();
      return;
    }
    setAppointments((current) => [...current, result.appointment]);
    setNextId((current) => current + 1);
    setConfirmed(result.appointment);
    setStep(3);
    setError("");
    setNotice("Agendamento simulado criado apenas nesta sessão.");
  }
  const days = Array.from({ length: 7 }, (_, index) =>
    addDays(today, 1 + week * 7 + index),
  ).filter((item) => item <= addDays(today, 30));
  return (
    <section
      ref={demo}
      className="lab-app booking-app"
      aria-label="Best Booking — ambiente demonstrativo"
    >
      <header className="booking-topbar">
        <div className="booking-product">
          <CalendarDays size={24} strokeWidth={1.5} aria-hidden="true" />
          <h1>
            best <em>booking</em>
          </h1>
          <span className="lab-demo-chip">DEMO</span>
        </div>
        <button className="lab-button secondary" onClick={reset}>
          <RotateCcw size={15} aria-hidden="true" /> Restaurar cenário
        </button>
      </header>
      <div className="booking-layout">
        <aside className="booking-story">
          <p className="lab-eyebrow">STUDIO LUME · NEGÓCIO FICTÍCIO</p>
          <h2>
            Um momento
            <br /> para <em>você.</em>
          </h2>
          <p>
            Escolha o cuidado, encontre um horário e experimente um jeito mais
            leve de agendar.
          </p>
          <div className="booking-art" aria-hidden="true">
            <div />
            <i />
            <span>lume.</span>
          </div>
          <div className="booking-story-footer">
            <span>
              <Clock3 size={15} aria-hidden="true" /> Fluxo em três etapas
            </span>
            <span>
              <CheckCircle2 size={15} aria-hidden="true" /> Sem cadastro
            </span>
          </div>
        </aside>
        <div className="booking-workspace" ref={workspace}>
          <nav className="booking-tabs" aria-label="Áreas do agendamento">
            <button
              aria-pressed={view === "book"}
              onClick={() => setView("book")}
            >
              Agendar
            </button>
            <button
              aria-pressed={view === "manage"}
              onClick={() => setView("manage")}
            >
              Agendamentos{" "}
              <span>
                {appointments.filter((item) => item.status === "booked").length}
              </span>
            </button>
          </nav>
          <p className="lab-status" role="status">
            {notice}
          </p>
          {view === "book" && (
            <>
              {step < 3 && (
                <ol
                  className="booking-progress"
                  aria-label="Etapas do agendamento"
                >
                  {["O cuidado", "Seu horário", "Revisão"].map(
                    (item, index) => (
                      <li
                        key={item}
                        aria-current={step === index ? "step" : undefined}
                        className={index <= step ? "active" : ""}
                      >
                        <span>
                          {index < step ? (
                            <Check size={12} aria-hidden="true" />
                          ) : (
                            `0${index + 1}`
                          )}
                        </span>
                        {item}
                      </li>
                    ),
                  )}
                </ol>
              )}
              {step === 0 && (
                <div className="booking-step">
                  <p className="lab-eyebrow">01 / O CUIDADO</p>
                  <h3>Como podemos cuidar de você?</h3>
                  <p className="booking-step-description">
                    Serviços e preços fictícios para experimentar o fluxo.
                  </p>
                  <div
                    className="booking-services"
                    role="group"
                    aria-label="Escolher serviço"
                  >
                    {bookingServices.map((item, index) => (
                      <button
                        key={item.id}
                        aria-pressed={serviceId === item.id}
                        onClick={() => {
                          setServiceId(item.id);
                          setTime("");
                        }}
                      >
                        <span
                          className="booking-service-icon"
                          aria-hidden="true"
                        >
                          {index === 0 ? (
                            <Scissors size={22} />
                          ) : index === 1 ? (
                            <UserRound size={22} />
                          ) : (
                            <Sparkles size={22} />
                          )}
                        </span>
                        <span>
                          <strong>{item.name}</strong>
                          <small>{item.description}</small>
                          <i>
                            {item.duration} min · {money(item.priceCents)}
                          </i>
                        </span>
                        <span className="booking-radio" aria-hidden="true">
                          {serviceId === item.id && <Check size={13} />}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="booking-step-actions">
                    <span>Você pode voltar e mudar suas escolhas.</span>
                    <button
                      className="lab-button"
                      disabled={!serviceId}
                      onClick={() => setStep(1)}
                    >
                      Continuar <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
              {step === 1 && (
                <div className="booking-step">
                  <p className="lab-eyebrow">02 / SEU HORÁRIO</p>
                  <h3>Um espaço na sua rotina.</h3>
                  <fieldset className="booking-professionals">
                    <legend>Escolha o profissional fictício</legend>
                    {bookingProfessionals.map((item) => (
                      <button
                        key={item.id}
                        aria-pressed={professionalId === item.id}
                        onClick={() => {
                          setProfessionalId(item.id);
                          setTime("");
                        }}
                      >
                        <span className="booking-avatar" aria-hidden="true">
                          {item.initials}
                        </span>
                        <span>
                          <strong>{item.name}</strong>
                          <small>{item.specialty}</small>
                        </span>
                        {professionalId === item.id && (
                          <Check size={15} aria-hidden="true" />
                        )}
                      </button>
                    ))}
                  </fieldset>
                  <div className="booking-calendar-heading">
                    <label>
                      Data desejada
                      <input
                        type="date"
                        value={date}
                        min={addDays(today, 1)}
                        max={addDays(today, 30)}
                        onChange={(event) => {
                          setDate(event.target.value);
                          setTime("");
                        }}
                      />
                    </label>
                    <div>
                      <button
                        className="lab-icon"
                        aria-label="Semana anterior"
                        disabled={week === 0}
                        onClick={() => setWeek((current) => current - 1)}
                      >
                        <ChevronLeft size={19} aria-hidden="true" />
                      </button>
                      <button
                        className="lab-icon"
                        aria-label="Próxima semana"
                        disabled={week >= 4}
                        onClick={() => setWeek((current) => current + 1)}
                      >
                        <ChevronRight size={19} aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div
                    className="booking-days"
                    role="group"
                    aria-label="Próximos dias"
                  >
                    {days.map((day) => (
                      <button
                        key={day}
                        aria-pressed={date === day}
                        aria-label={`Selecionar ${prettyDate(day)}`}
                        onClick={() => {
                          setDate(day);
                          setTime("");
                        }}
                      >
                        <small>
                          {new Intl.DateTimeFormat("pt-BR", {
                            weekday: "short",
                            timeZone: "UTC",
                          }).format(new Date(day + "T12:00:00Z"))}
                        </small>
                        <strong>{day.slice(-2)}</strong>
                        <span>
                          {prettyDate(day).split(" ").slice(2).join(" ")}
                        </span>
                      </button>
                    ))}
                  </div>
                  <fieldset className="booking-slots">
                    <legend>
                      Horários demonstrativos · {prettyDate(date)}
                    </legend>
                    {bookingTimes.map((item) => (
                      <button
                        key={item}
                        disabled={!times.includes(item)}
                        aria-pressed={time === item}
                        onClick={() => setTime(item)}
                      >
                        {item}
                        <span className="sr-only">
                          {!times.includes(item) ? " indisponível" : ""}
                        </span>
                      </button>
                    ))}
                  </fieldset>
                  {times.length === 0 && (
                    <p className="lab-inline-note">
                      Nenhum horário disponível nesta data. Escolha outro dia ou
                      profissional.
                    </p>
                  )}
                  <div className="booking-step-actions">
                    <button className="booking-back" onClick={() => setStep(0)}>
                      <ArrowLeft size={16} aria-hidden="true" /> Voltar
                    </button>
                    <button
                      className="lab-button"
                      disabled={!time || !times.includes(time)}
                      onClick={() => setStep(2)}
                    >
                      Revisar <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
              {step === 2 && (
                <form
                  className="booking-step lab-form"
                  noValidate
                  onSubmit={submit}
                >
                  <p className="lab-eyebrow">03 / REVISÃO</p>
                  <h3>Tudo pronto para experimentar?</h3>
                  <div className="booking-summary">
                    <div>
                      <span>Serviço fictício</span>
                      <strong>{service?.name}</strong>
                    </div>
                    <div>
                      <span>Profissional</span>
                      <strong>{professional.name}</strong>
                    </div>
                    <div>
                      <span>Data & horário</span>
                      <strong>
                        {prettyDate(date)} · {time}
                      </strong>
                    </div>
                    <div>
                      <span>Preço demonstrativo</span>
                      <strong>
                        {money(service?.priceCents || 0)} · {service?.duration}{" "}
                        min
                      </strong>
                    </div>
                  </div>
                  <label>
                    Seu nome fictício
                    <input
                      name="booking-name"
                      ref={nameField}
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        setError("");
                      }}
                      placeholder="Ex.: Alex Exemplo"
                      maxLength={80}
                      required
                      aria-invalid={!!error}
                      aria-describedby={
                        error ? "booking-error" : "booking-name-help"
                      }
                    />
                  </label>
                  <p id="booking-name-help" className="lab-inline-note">
                    Não informe telefone ou dados reais. Nada será enviado.
                  </p>
                  {error && (
                    <p id="booking-error" className="lab-error" role="alert">
                      {error}
                    </p>
                  )}
                  <div className="booking-step-actions">
                    <button
                      className="booking-back"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      <ArrowLeft size={16} aria-hidden="true" /> Voltar
                    </button>
                    <button className="lab-button" type="submit">
                      Simular agendamento <Check size={16} aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
              {step === 3 && confirmed && (
                <div className="booking-confirmation">
                  <CheckCircle2
                    size={44}
                    strokeWidth={1.2}
                    aria-hidden="true"
                  />
                  <p className="lab-eyebrow">DEMO-{confirmed.id}</p>
                  <h3>Simulação concluída.</h3>
                  <p>
                    O horário fictício foi adicionado à sua lista desta sessão.
                    Nenhuma reserva comercial foi criada.
                  </p>
                  <div className="booking-confirmation-summary">
                    <strong>{confirmed.name}</strong>
                    <span>
                      {service?.name} · {professional.name}
                    </span>
                    <span>
                      {prettyDate(confirmed.date)} às {confirmed.time}
                    </span>
                  </div>
                  <button
                    className="lab-button"
                    onClick={() => setView("manage")}
                  >
                    Ver agendamentos <ArrowRight size={16} aria-hidden="true" />
                  </button>
                  <button className="booking-back" onClick={newBooking}>
                    Experimentar outro horário
                  </button>
                </div>
              )}
            </>
          )}
          {view === "manage" && (
            <div className="booking-management">
              <div className="booking-management-heading">
                <div>
                  <p className="lab-eyebrow">SOMENTE NESTA SESSÃO</p>
                  <h3>Sua agenda demonstrativa.</h3>
                </div>
                <button className="lab-button secondary" onClick={newBooking}>
                  Novo agendamento
                </button>
              </div>
              <div className="booking-appointments">
                {appointments.length ? (
                  appointments.map((item) => (
                    <article
                      key={item.id}
                      className={
                        item.status === "cancelled" ? "is-cancelled" : ""
                      }
                    >
                      <div className="booking-date-tile">
                        <strong>{item.date.slice(-2)}</strong>
                        <span>
                          {prettyDate(item.date).split(" ").slice(2).join(" ")}
                        </span>
                      </div>
                      <div>
                        <span className="booking-appointment-id">
                          DEMO-{item.id} ·{" "}
                          {item.status === "booked" ? "SIMULADO" : "CANCELADO"}
                        </span>
                        <h4>{item.name}</h4>
                        <p>
                          {
                            bookingServices.find(
                              (service) => service.id === item.serviceId,
                            )?.name
                          }
                        </p>
                        <small>
                          {
                            bookingProfessionals.find(
                              (professional) =>
                                professional.id === item.professionalId,
                            )?.name
                          }{" "}
                          · {item.time}
                        </small>
                      </div>
                      {item.status === "booked" ? (
                        <button
                          className="booking-cancel"
                          aria-label={`Cancelar agendamento de ${item.name}`}
                          onClick={() => {
                            setAppointments((current) =>
                              current.map((appointment) =>
                                appointment.id === item.id
                                  ? { ...appointment, status: "cancelled" }
                                  : appointment,
                              ),
                            );
                            setNotice(
                              "Agendamento fictício cancelado. O horário voltou a ficar disponível.",
                            );
                          }}
                        >
                          Cancelar
                        </button>
                      ) : (
                        <span className="booking-cancelled-label">
                          Cancelado
                        </span>
                      )}
                    </article>
                  ))
                ) : (
                  <div className="lab-empty">
                    <p>Ainda não há agendamentos nesta sessão.</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <p className="lab-session-note">
            Profissionais, preços e agendamentos são fictícios. Alterações ficam
            na memória da página e podem ser restauradas.
          </p>
        </div>
      </div>
    </section>
  );
}

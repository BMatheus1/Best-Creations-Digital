"use client";
import { useEffect, useRef, useState } from "react";
import { useForm, useWatch, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Copy, Check } from "lucide-react";
import { company } from "@/data/company";
import { quoteSchema, type QuoteValues } from "@/lib/validations";
import {
  createWhatsAppUrl,
  formatQuote,
  officialWhatsAppNumber,
} from "@/lib/whatsapp";
const mainOptions = [
  {
    value: "Site institucional",
    label: "Site",
    detail: "Uma presença com identidade.",
  },
  {
    value: "Landing page",
    label: "Landing page",
    detail: "Uma página com um objetivo.",
  },
  {
    value: "Sistema web",
    label: "Sistema",
    detail: "Mais fluidez para sua operação.",
  },
  {
    value: "Aplicativo",
    label: "Aplicativo",
    detail: "Sua ideia na palma da mão.",
  },
  {
    value: "Design/UI",
    label: "Design & UX/UI",
    detail: "Forma, clareza e experiência.",
  },
  {
    value: "Automação",
    label: "IA / Automação",
    detail: "Novas formas de simplificar.",
  },
  {
    value: "Outro",
    label: "Vamos descobrir juntos",
    detail: "Conte o que você imagina.",
  },
] as const;
const extraOptions = [
  "Inteligência artificial",
  "Cardápio digital",
  "Manutenção",
] as const;
const steps = ["Solução", "Sua ideia", "Contato", "Revisão", "Mensagem"];
const titles = [
  "Qual solução você procura?",
  "Toda criação começa com uma ideia.",
  "Como podemos conversar?",
  "Cada detalhe, do seu jeito.",
  "Sua ideia está pronta para conversar.",
];
const fieldsByStep: FieldPath<QuoteValues>[][] = [
  ["service"],
  ["description", "deadline", "budget"],
  ["name", "company", "phone", "email"],
];
export function ProjectWizard({
  initialService,
  initialReference,
}: {
  initialService?: QuoteValues["service"];
  initialReference?: string;
}) {
  const [step, setStep] = useState(0);
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [opened, setOpened] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(0);
  const {
    register,
    trigger,
    handleSubmit,
    getValues,
    control,
    formState: { errors, isReady },
  } = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    shouldUnregister: false,
    defaultValues: {
      service: initialService,
      name: "",
      company: "",
      phone: "",
      email: "",
      description: initialReference
        ? `Quero desenvolver uma solução inspirada em ${initialReference}.`
        : "",
      deadline: "",
      budget: "",
    },
  });
  const selected = useWatch({ control, name: "service" });
  const description = useWatch({
    control,
    name: "description",
    defaultValue: initialReference
      ? `Quero desenvolver uma solução inspirada em ${initialReference}.`
      : "",
  });
  useEffect(() => {
    if (previousStep.current !== step) title.current?.focus();
    previousStep.current = step;
  }, [step]);
  async function next() {
    if (await trigger(fieldsByStep[step], { shouldFocus: true }))
      setStep(step + 1);
  }
  function finish(values: QuoteValues) {
    setMessage(formatQuote(values));
    setCopied(false);
    setCopyError(false);
    setOpened(false);
    setStep(4);
  }
  function edit(target: number) {
    setStep(target);
    setMessage("");
  }
  function errorFor(field: keyof QuoteValues) {
    return errors[field] ? (
      <p className="field-error" id={field + "-error"} role="alert">
        {errors[field]?.message}
      </p>
    ) : null;
  }
  function accessibility(field: keyof QuoteValues) {
    return {
      "aria-invalid": Boolean(errors[field]),
      "aria-describedby": errors[field] ? field + "-error" : undefined,
    };
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  const values = getValues();
  const url =
    createWhatsAppUrl(company.whatsapp, message) ||
    createWhatsAppUrl(officialWhatsAppNumber, message)!;
  return (
    <div className="project-wizard">
      <div className="wizard-progress">
        <div>
          <span className="eyebrow">START A PROJECT</span>
          <span>0{step + 1} / 05</span>
        </div>
        <div className="progress-track">
          <span style={{ transform: `scaleX(${(step + 1) / steps.length})` }} />
        </div>
        <ol aria-label="Etapas do projeto">
          {steps.map((label, index) => (
            <li
              key={label}
              aria-current={step === index ? "step" : undefined}
              className={index <= step ? "is-reached" : ""}
            >
              <span>0{index + 1}</span>
              {label}
            </li>
          ))}
        </ol>
      </div>
      {initialReference && (
        <p className="quote-reference">
          Referência da coleção: <strong>{initialReference}</strong>
        </p>
      )}
      <form
        noValidate
        data-ready={isReady ? "true" : undefined}
        onSubmit={(event) => {
          event.preventDefault();
          if (step < 3) void next();
          else if (step === 3) void handleSubmit(finish)(event);
        }}
        onChange={() => {
          if (message) setMessage("");
        }}
      >
        <div key={step} className="wizard-step content-swap">
          <p className="eyebrow">
            0{step + 1} / {steps[step].toUpperCase()}
          </p>
          <h2 ref={title} tabIndex={-1} id="wizard-title">
            {titles[step]}
          </h2>
          {step === 0 && (
            <>
              <p className="step-description">
                Escolha um ponto de partida. Podemos refinar o caminho juntos.
              </p>
              <fieldset className="solution-choices">
                <legend className="sr-only">Tipo de solução</legend>
                {mainOptions.map((option, index) => (
                  <label className="solution-choice" key={option.value}>
                    <input
                      type="radio"
                      value={option.value}
                      required
                      {...register("service")}
                      {...accessibility("service")}
                    />
                    <span className="choice-number">0{index + 1}</span>
                    <span>
                      <b>{option.label}</b>
                      <small>{option.detail}</small>
                    </span>
                    <span className="choice-check" aria-hidden="true">
                      <Check size={15} />
                    </span>
                  </label>
                ))}
              </fieldset>
              <details
                className="extra-solutions"
                open={extraOptions.some((value) => value === selected)}
              >
                <summary>Outras soluções específicas</summary>
                <div>
                  {extraOptions.map((option) => (
                    <label key={option}>
                      <input
                        type="radio"
                        value={option}
                        required
                        {...register("service")}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </details>
              {errorFor("service")}
            </>
          )}
          {step === 1 && (
            <>
              <p className="step-description">
                Qual é o desafio? O que você quer tornar possível?
              </p>
              <div className="field">
                <label htmlFor="description">Sua ideia *</label>
                <textarea
                  id="description"
                  rows={6}
                  maxLength={2000}
                  placeholder="Conte sobre seu negócio, seus objetivos e o que você imagina criar."
                  required
                  {...register("description")}
                  {...accessibility("description")}
                />
                <div className="textarea-bottom">
                  {errorFor("description")}
                  <span>{description.length} / 2000</span>
                </div>
              </div>
              <details className="optional-brief">
                <summary>
                  Prazo e investimento <span>opcional</span>
                </summary>
                <div className="form-row">
                  <div className="field">
                    <label htmlFor="deadline">Prazo desejado</label>
                    <select id="deadline" {...register("deadline")}>
                      <option value="">A definir</option>
                      <option>Sem prazo definido</option>
                      <option>Até 1 mês</option>
                      <option>De 1 a 3 meses</option>
                      <option>Mais de 3 meses</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="budget">Investimento previsto</label>
                    <select id="budget" {...register("budget")}>
                      <option value="">A definir</option>
                      <option>A definir em conjunto</option>
                      <option>Até R$ 3.000</option>
                      <option>De R$ 3.000 a R$ 8.000</option>
                      <option>De R$ 8.000 a R$ 20.000</option>
                      <option>Acima de R$ 20.000</option>
                    </select>
                  </div>
                </div>
                <p className="fine-print">
                  As faixas indicam sua preferência. Não representam preços ou
                  propostas.
                </p>
              </details>
            </>
          )}
          {step === 2 && (
            <>
              <p className="step-description">
                Só o necessário para começar uma boa conversa. Campos com * são
                obrigatórios.
              </p>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="name">Seu nome *</label>
                  <input
                    id="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    {...register("name")}
                    {...accessibility("name")}
                  />
                  {errorFor("name")}
                </div>
                <div className="field">
                  <label htmlFor="company">
                    Empresa <span>(opcional)</span>
                  </label>
                  <input
                    id="company"
                    autoComplete="organization"
                    maxLength={120}
                    {...register("company")}
                    {...accessibility("company")}
                  />
                  {errorFor("company")}
                </div>
              </div>
              <div className="form-row">
                <div className="field">
                  <label htmlFor="phone">WhatsApp ou telefone *</label>
                  <input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    maxLength={25}
                    placeholder="DDD + número"
                    required
                    {...register("phone")}
                    {...accessibility("phone")}
                  />
                  {errorFor("phone")}
                </div>
                <div className="field">
                  <label htmlFor="email">
                    E-mail <span>(opcional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    {...register("email")}
                    {...accessibility("email")}
                  />
                  {errorFor("email")}
                </div>
              </div>
              <p className="fine-print">
                Seus dados permanecem nesta página até você escolher
                compartilhá-los. <Link href="/privacidade">Saiba mais.</Link>
              </p>
            </>
          )}
          {step === 3 && (
            <>
              <p className="step-description">
                Confira seu resumo. Você pode ajustar qualquer informação.
              </p>
              <div className="review-block">
                <div>
                  <h3>A solução</h3>
                  <button type="button" onClick={() => edit(0)}>
                    Editar solução
                  </button>
                </div>
                <p>{values.service}</p>
              </div>
              <div className="review-block">
                <div>
                  <h3>Sua ideia</h3>
                  <button type="button" onClick={() => edit(1)}>
                    Editar ideia
                  </button>
                </div>
                <p className="review-description">{values.description}</p>
                {values.deadline && <p>Prazo: {values.deadline}</p>}
                {values.budget && <p>Investimento previsto: {values.budget}</p>}
              </div>
              <div className="review-block">
                <div>
                  <h3>Contato</h3>
                  <button type="button" onClick={() => edit(2)}>
                    Editar contato
                  </button>
                </div>
                <p>
                  {values.name}
                  {values.company ? " · " + values.company : ""}
                </p>
                <p>{values.phone}</p>
                {values.email && <p>{values.email}</p>}
              </div>
              <p className="fine-print">
                Nenhuma solicitação foi enviada. A próxima etapa prepara a
                mensagem.
              </p>
            </>
          )}
          {step === 4 && (
            <>
              <p className="step-description">
                Seu resumo está pronto. O envio da mensagem depende da sua
                confirmação no WhatsApp.
              </p>
              <label className="summary-label" htmlFor="quote-message">
                Mensagem preparada
              </label>
              <textarea
                className="prepared-message"
                id="quote-message"
                value={message}
                readOnly
                rows={10}
              />
              <div className="send-actions">
                <a
                  className="button button-light"
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpened(true)}
                >
                  Abrir WhatsApp <ArrowUpRight size={18} aria-hidden="true" />
                  <span className="sr-only"> — abre em nova aba</span>
                </a>
                <button
                  className="text-link copy-button"
                  type="button"
                  onClick={copy}
                >
                  <Copy size={16} aria-hidden="true" />
                  {copied ? "Resumo copiado" : "Copiar resumo"}
                </button>
              </div>
              <p className="fine-print" role="status">
                {copyError
                  ? "A cópia automática não está disponível. Selecione o texto acima para copiar manualmente."
                  : copied
                    ? "Resumo copiado. Você escolhe onde compartilhar."
                    : opened
                      ? "Conversa aberta. Confirme o envio no WhatsApp."
                      : "Nenhuma solicitação foi enviada."}
              </p>
            </>
          )}
        </div>
        <div className="wizard-actions">
          {step > 0 ? (
            <button
              type="button"
              className="text-link"
              onClick={() => setStep(step - 1)}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar
            </button>
          ) : (
            <Link href="/servicos" className="text-link">
              Conhecer as soluções <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          )}
          {step < 4 && (
            <button className="button button-light" type="submit">
              {step === 3 ? "Preparar mensagem" : "Continuar"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

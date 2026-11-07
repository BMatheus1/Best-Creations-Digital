import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
import { privacyPolicy, privacySections } from "@/data/privacy-policy";
import { createWhatsAppUrl } from "@/lib/whatsapp";
import "./privacy.css";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: privacyPolicy.description,
  alternates: { canonical: privacyPolicy.url },
  openGraph: {
    title: "Política de Privacidade | Best Creations",
    description: privacyPolicy.description,
    url: privacyPolicy.url,
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    title: "Política de Privacidade | Best Creations",
    description: privacyPolicy.description,
  },
};

export default function PrivacyPolicyPage() {
  const contactUrl = createWhatsAppUrl(
    company.whatsapp,
    "Olá, Best Creations! Gostaria de falar sobre privacidade e o tratamento dos meus dados.",
  )!;
  return (
    <main id="conteudo" className="privacy-page shell">
      <Link className="text-link" href="/">
        <ArrowLeft size={16} aria-hidden="true" /> Voltar ao início
      </Link>
      <header className="privacy-heading">
        <p className="eyebrow">BEST CREATIONS / TRANSPARÊNCIA</p>
        <h1>
          Política de <em>Privacidade</em>
        </h1>
        <p className="privacy-intro">{privacyPolicy.description}</p>
        <p className="privacy-date">
          Última atualização:{" "}
          <time dateTime={privacyPolicy.updatedAt}>7 de novembro de 2026</time>
        </p>
        <div className="privacy-scope">
          <span>Site institucional</span>
          <span>Studio Factory</span>
          <span>Integrações autorizadas</span>
        </div>
      </header>
      <div className="privacy-layout">
        <nav
          className="privacy-index"
          aria-label="Seções da política de privacidade"
        >
          <p className="eyebrow">NESTA PÁGINA</p>
          <ol>
            {privacySections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#contato">
                <span aria-hidden="true">12</span>Contato e solicitações
              </a>
            </li>
          </ol>
        </nav>
        <article
          className="privacy-content"
          aria-label="Política de privacidade da Best Creations"
        >
          {privacySections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <p className="privacy-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")} / PRIVACIDADE
              </p>
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.link && (
                <p>
                  <a
                    href={section.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {section.link.label}
                    <span className="sr-only"> — abre em nova aba</span>
                  </a>
                </p>
              )}
            </section>
          ))}
          <section
            id="contato"
            className="privacy-contact"
            aria-labelledby="contato-title"
          >
            <p className="privacy-number" aria-hidden="true">
              12 / VAMOS CONVERSAR
            </p>
            <h2 id="contato-title">Contato e solicitações</h2>
            <p>
              Para dúvidas sobre esta política ou solicitações relativas a dados
              tratados pela Best Creations, utilize nosso WhatsApp
              institucional: +55 11 91916-4884. Informe que o assunto é
              privacidade e descreva sua solicitação, evitando enviar
              informações sensíveis desnecessárias.
            </p>
            <a
              className="button button-light"
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar sobre privacidade{" "}
              <ArrowUpRight size={17} aria-hidden="true" />
              <span className="sr-only"> — abre em nova aba</span>
            </a>
            {company.email && (
              <p>
                Você também pode escrever para{" "}
                <a href={`mailto:${company.email}`}>{company.email}</a>.
              </p>
            )}
          </section>
        </article>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Github, Play } from "lucide-react";
import {
  allProjects,
  projects,
  getProject,
  projectQuoteUrl,
} from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
export const dynamicParams = false;
export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    ...(!project.featured ? { robots: { index: false, follow: true } } : {}),
    ...pageMetadata(
      project.name,
      project.description + " " + project.status + ".",
      "/projetos/" + slug,
    ),
    openGraph: {
      title: project.name + " | Best Creations",
      description: project.description,
      images: [
        {
          url: "/projetos/" + slug + "/opengraph-image",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next =
    projects[
      (projects.findIndex((item) => item.slug === slug) + 1) % projects.length
    ];
  return (
    <main id="conteudo" className="inner-page case-page shell">
      <Breadcrumb label={project.name} collection />
      <header className="case-heading">
        <p className="eyebrow">{project.label}</p>
        <h1>{project.name}</h1>
        <div>
          <p>{project.description}</p>
          <span className="status-label">{project.status}</span>
        </div>
      </header>
      <div className="case-actions">
        {project.demoUrl && (
          <Link href={project.demoUrl} className="button button-light">
            <Play size={16} aria-hidden="true" /> Experimentar demo
          </Link>
        )}
        {project.publishedUrl && (
          <a
            className="button button-light"
            href={project.publishedUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar aplicação <ArrowUpRight size={17} aria-hidden="true" />
            <span className="sr-only"> — abre em nova aba</span>
          </a>
        )}
        {project.repository && (
          <a
            className="text-link"
            href={project.repository}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={17} aria-hidden="true" /> Ver repositório
            <span className="sr-only"> — abre em nova aba</span>
          </a>
        )}
        <span className="case-kind">
          {project.kind === "real"
            ? "PROJETO REAL · AUDITADO"
            : project.demoUrl
              ? "DEMONSTRAÇÃO INTERATIVA"
              : "PROJETO CONCEITUAL"}
        </span>
      </div>
      <figure className="case-cover">
        <ProjectVisual image={project.images[0]} priority />
        <figcaption>
          {project.images[0]?.caption || "Prévia ainda não disponibilizada."}
        </figcaption>
      </figure>
      <nav className="case-nav" aria-label="Neste projeto">
        <a href="#visao-geral">Visão geral</a>
        <a href="#escopo">Recursos & tecnologia</a>
        <a href="#galeria">Galeria</a>
        <Link href="/projetos">
          Toda a coleção <ArrowUpRight size={14} aria-hidden="true" />
        </Link>
      </nav>
      <aside className="evidence-note">
        <span className="eyebrow">CONTEXTO & EVIDÊNCIAS</span>
        <p>{project.evidence}</p>
        {project.audit && (
          <span className="audit-stamp">
            Auditoria do código · 21.10.2026 · revisão{" "}
            {project.audit.revision.slice(0, 8)}
          </span>
        )}
      </aside>
      <section id="visao-geral" className="case-story">
        <div>
          <p className="eyebrow">01 / A DIREÇÃO</p>
          <h2>
            Uma necessidade.
            <br />
            <em>Uma experiência.</em>
          </h2>
        </div>
        <div>
          <h3>O desafio</h3>
          <p>{project.problem}</p>
          <h3>
            {project.featureState === "verified"
              ? "A solução"
              : "A solução proposta"}
          </h3>
          <p>{project.solution}</p>
        </div>
      </section>
      <section id="escopo" className="case-specs">
        <div>
          <p className="eyebrow">
            02 /{" "}
            {project.featureState === "verified"
              ? "RECURSOS IMPLEMENTADOS"
              : "RECURSOS PROPOSTOS"}
          </p>
          <ul>
            {project.features.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">
            {project.technologies.length
              ? "TECNOLOGIAS CONFIRMADAS"
              : "POSSIBILIDADES TÉCNICAS"}
          </p>
          <div className="tech-tags">
            {(project.technologies.length
              ? project.technologies
              : project.proposedTechnologies
            ).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p className="fine-print">
            {project.kind === "real"
              ? "Recursos identificados no código auditado. Isso não equivale a homologação integral de integrações ou garantia de disponibilidade do produto."
              : project.demoUrl
                ? "Ações executadas somente neste ambiente demonstrativo. Sem backend de produção, credenciais ou envios externos."
                : "Proposta visual; implementação e stack não comprovadas."}
          </p>
          {project.documentedFeatures?.length ? (
            <details className="case-disclosure">
              <summary>Documentado · sem reprodução integral</summary>
              <ul>
                {project.documentedFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </details>
          ) : null}
          {project.plannedFeatures?.length ? (
            <details className="case-disclosure">
              <summary>Planejado / em desenvolvimento</summary>
              <ul>
                {project.plannedFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </details>
          ) : null}
          {project.limitations?.length ? (
            <details className="case-disclosure">
              <summary>Limitações desta apresentação</summary>
              <ul>
                {project.limitations.map((limitation) => (
                  <li key={limitation}>{limitation}</li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </section>
      <section id="galeria" className="case-gallery">
        <div className="editorial-heading">
          <p className="eyebrow">03 / DE PERTO</p>
          <h2>
            Da ideia.
            <br />
            <em>Aos detalhes.</em>
          </h2>
        </div>
        <ProjectGallery images={project.images} name={project.name} />
      </section>
      <section className="case-commercial">
        <p className="eyebrow">O PRÓXIMO PODE SER SEU.</p>
        <h2>Gostou dessa solução?</h2>
        <p>Podemos desenvolver algo personalizado para o seu negócio.</p>
        <Link className="button button-light" href={projectQuoteUrl(project)}>
          Solicitar projeto semelhante{" "}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
      <div className="next-project">
        <div>
          <p className="eyebrow">O PRÓXIMO DA COLEÇÃO</p>
          <Link href={"/projetos/" + next.slug}>
            {next.name}
            <ArrowUpRight size={31} strokeWidth={1} aria-hidden="true" />
          </Link>
        </div>
        <Link className="text-link" href="/projetos">
          Voltar ao showroom <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

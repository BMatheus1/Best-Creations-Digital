"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { projectFilters } from "@/data/project-filters";
import type { Project } from "@/types";
import { ProjectVisual } from "./ProjectVisual";

export type CollectionItem = Pick<
  Project,
  | "slug"
  | "name"
  | "categories"
  | "label"
  | "theme"
  | "status"
  | "description"
  | "technologies"
  | "kind"
  | "images"
  | "demoUrl"
  | "publishedUrl"
>;
export function ProjectCollection({ items }: { items: CollectionItem[] }) {
  const [category, setCategory] = useState<string>("Todos");
  const [index, setIndex] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const filtered = items.filter(
    (item) =>
      category === "Todos" ||
      item.categories.includes(category as Project["category"]),
  );
  if (category === "Sistemas") {
    const binanceIndex = filtered.findIndex(
      (item) => item.slug === "binance-ai-research",
    );
    const expensesIndex = filtered.findIndex(
      (item) => item.slug === "my-expenses",
    );
    if (binanceIndex !== -1 && expensesIndex !== -1) {
      [filtered[binanceIndex], filtered[expensesIndex]] = [
        filtered[expensesIndex],
        filtered[binanceIndex],
      ];
    }
  }
  const project = filtered[index];
  function move(direction: number) {
    if (filtered.length)
      setIndex(
        (current) => (current + direction + filtered.length) % filtered.length,
      );
  }
  return (
    <section
      className="collection showroom"
      aria-label="Coleção de projetos"
      tabIndex={0}
      onKeyDown={(event) => {
        if ((event.target as HTMLElement).closest(".collection-filters"))
          return;
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();
          event.currentTarget.focus();
          move(event.key === "ArrowRight" ? 1 : -1);
        }
      }}
    >
      <div className="showroom-title">
        <div>
          <p className="eyebrow">BEST CREATIONS — THE COLLECTION</p>
          <p>
            Ideias que você pode <em>explorar.</em>
          </p>
        </div>
        <p>
          Projetos reais. Experiências autorais.
          <br />
          Um olhar sobre o que podemos criar.
        </p>
      </div>
      <div
        className="collection-filters"
        role="group"
        aria-label="Filtrar projetos por categoria"
      >
        {projectFilters.map((filter) => (
          <button
            key={filter}
            aria-pressed={category === filter}
            onClick={() => {
              setCategory(filter);
              setIndex(0);
            }}
          >
            {filter === "Inteligência artificial"
              ? "Inteligência Artificial"
              : filter}
          </button>
        ))}
      </div>
      <div className="collection-toolbar">
        <p className="eyebrow">
          {category === "Todos" ? "SELEÇÃO DO ESTÚDIO" : category}
        </p>
        <div className="collection-controls">
          <span aria-live="polite" aria-atomic="true">
            {String(project ? index + 1 : 0).padStart(2, "0")} /{" "}
            {String(filtered.length).padStart(2, "0")}
          </span>
          <button
            className="icon-button"
            aria-label="Projeto anterior"
            disabled={filtered.length < 2}
            onClick={() => move(-1)}
          >
            <ArrowLeft size={20} aria-hidden="true" />
          </button>
          <button
            className="icon-button"
            aria-label="Próximo projeto"
            disabled={filtered.length < 2}
            onClick={() => move(1)}
          >
            <ArrowRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
      {project ? (
        <article
          key={project.slug}
          className="showroom-piece content-swap"
          aria-label={project.name}
          data-active-project={project.slug}
        >
          <div className="showroom-copy">
            <p className="eyebrow">{project.label}</p>
            <h2>{project.name}</h2>
            <span className="status-label">{project.status}</span>
            <p className="showroom-description">{project.description}</p>
            <p className="showroom-stack">
              {project.technologies.slice(0, 4).join(" / ")}
            </p>
            <div className="showroom-actions">
              <Link
                href={`/projetos/${project.slug}`}
                className="button button-light"
              >
                Explorar projeto <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              {project.demoUrl && (
                <Link href={project.demoUrl} className="text-link accented">
                  <Play size={15} aria-hidden="true" /> Experimentar
                </Link>
              )}
              {project.publishedUrl && (
                <a
                  href={project.publishedUrl}
                  className="text-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar aplicação{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                  <span className="sr-only"> — abre em nova aba</span>
                </a>
              )}
            </div>
            <p className="showroom-kind">
              {project.kind === "real"
                ? "PROJETO REAL · CÓDIGO AUDITADO"
                : "DEMONSTRAÇÃO INTERATIVA · DADOS FICTÍCIOS"}
            </p>
          </div>
          <div
            className={`showroom-visual showroom-${project.theme}`}
            onTouchStart={(event) => {
              touch.current = {
                x: event.touches[0].clientX,
                y: event.touches[0].clientY,
              };
            }}
            onTouchEnd={(event) => {
              if (!touch.current) return;
              const x = event.changedTouches[0].clientX - touch.current.x;
              const y = event.changedTouches[0].clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(x) > 60 && Math.abs(x) > Math.abs(y) * 1.3) {
                event.preventDefault();
                move(x < 0 ? 1 : -1);
              }
            }}
          >
            <div className="showroom-frame">
              <div className="frame-top">
                <span />
                <span />
                <span />
                <i>
                  {project.kind === "real"
                    ? "PROJECT / ORIGINAL"
                    : "LAB / INTERACTIVE"}
                </i>
              </div>
              <Link
                className="collection-image-link"
                href={`/projetos/${project.slug}`}
                aria-label={`Explorar projeto ${project.name}`}
              >
                <ProjectVisual image={project.images[0]} priority />
                <span className="image-explore">
                  <ArrowUpRight size={25} aria-hidden="true" />
                </span>
              </Link>
            </div>
            <p>
              {project.images[0]?.kind === "diagram"
                ? "DIAGRAMA BASEADO NO CÓDIGO"
                : project.kind === "real"
                  ? "CAPTURA REAL · CONTEXTO NO ESTUDO DE CASO"
                  : "CAPTURA DA DEMO FUNCIONAL"}
            </p>
          </div>
        </article>
      ) : (
        <div className="showroom-empty" role="status">
          <p className="eyebrow">EM CURADORIA</p>
          <h2>Novas perspectivas em breve.</h2>
          <p>Ainda não há projetos nesta categoria.</p>
          <button
            className="text-link accented"
            onClick={() => setCategory("Todos")}
          >
            Explorar toda a coleção <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
      <div
        className="collection-index"
        role="group"
        aria-label="Selecionar projeto"
      >
        {filtered.map((item, position) => (
          <button
            key={item.slug}
            onClick={() => setIndex(position)}
            aria-label={`Mostrar ${item.name}`}
            aria-pressed={position === index}
          >
            <span>{String(position + 1).padStart(2, "0")}</span>
            <span>{item.name}</span>
            <i />
          </button>
        ))}
      </div>
      <p className="collection-note">
        Escolha uma categoria, use os controles ou as setas com a coleção em
        foco. No mobile, você também pode deslizar a prévia. Projetos reais e
        demos estão identificados em cada experiência.
      </p>
    </section>
  );
}

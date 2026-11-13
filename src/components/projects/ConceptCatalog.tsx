"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Maximize2,
  X,
} from "lucide-react";
import { concepts, type CatalogConcept } from "@/data/concepts";
import { containDialogFocus } from "@/lib/dialog";
import { ConceptPreview } from "./ConceptPreview";

export function ConceptCatalog() {
  const [model, setModel] = useState(0);
  return (
    <section className="concept-catalog" aria-labelledby="concept-title">
      <div className="concept-intro">
        <h2 id="concept-title">
          Explore nosso <em>catálogo</em>
        </h2>
        <p>
          Conheça diferentes conceitos de sites, sistemas e aplicativos. Explore
          as prévias e encontre inspiração para seu próximo projeto.
        </p>
      </div>
      <div
        className="concept-index"
        role="group"
        aria-label="Selecionar modelo"
      >
        {concepts.map((item, index) => (
          <button
            type="button"
            key={item.id}
            aria-pressed={index === model}
            onClick={() => setModel(index)}
          >
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            {item.name}
          </button>
        ))}
      </div>
      <ConceptGallery key={model} concept={concepts[model]} />
    </section>
  );
}

function ConceptGallery({ concept }: { concept: CatalogConcept }) {
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [choices, setChoices] = useState<Record<string, string>>({});
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const invoker = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!expanded) return;
    dialog.current?.showModal();
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [expanded]);
  function select(key: string, value: string) {
    setChoices((current) => ({ ...current, [key]: value }));
  }
  function openPreview(button: HTMLButtonElement) {
    invoker.current = button;
    setExpanded(true);
  }
  const touch = useRef<{ x: number; y: number } | null>(null);
  const title = concept.screens[index];
  const device = concept.mobile.includes(index) ? "mobile" : "desktop";
  function move(direction: number) {
    setIndex(
      (current) =>
        (current + direction + concept.screens.length) % concept.screens.length,
    );
  }
  const controls = (
    <>
      <button
        type="button"
        className="icon-button"
        aria-label="Prévia anterior"
        onClick={() => move(-1)}
      >
        <ArrowLeft aria-hidden="true" size={18} />
      </button>
      <span aria-live="polite">
        {index + 1} / {concept.screens.length}
      </span>
      <button
        type="button"
        className="icon-button"
        aria-label="Próxima prévia"
        onClick={() => move(1)}
      >
        <ArrowRight aria-hidden="true" size={18} />
      </button>
    </>
  );
  return (
    <article className="concept-feature content-swap" aria-label={concept.name}>
      <header className="concept-info">
        <p className="eyebrow">{concept.category}</p>
        <h3>{concept.name}</h3>
        <p>{concept.description}</p>
        <span className="concept-disclaimer">
          Conceito demonstrativo · Dados fictícios
        </span>
        <button
          type="button"
          className="text-link"
          onClick={(event) => openPreview(event.currentTarget)}
        >
          Explorar modelo <ArrowUpRight aria-hidden="true" size={16} />
        </button>
        <Link
          className="button button-light"
          href={{
            pathname: "/iniciar-projeto",
            query: { referencia: concept.id },
          }}
        >
          Quero um projeto nesse estilo{" "}
          <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </header>
      <div
        className="concept-gallery"
        role="region"
        aria-label={"Prévias de " + concept.name}
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget &&
            !(
              event.target instanceof HTMLElement &&
              event.target.closest(".concept-controls, .concept-thumbnails")
            )
          )
            return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        <div className="concept-controls">
          <span>{title}</span>
          {controls}
          <button
            type="button"
            className="icon-button"
            aria-label="Ampliar prévia"
            onClick={(event) => openPreview(event.currentTarget)}
          >
            <Maximize2 aria-hidden="true" size={17} />
          </button>
        </div>
        <div
          className="concept-stage"
          data-expanded={expanded}
          onTouchStart={(event) => {
            touch.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchCancel={() => {
            touch.current = null;
          }}
          onTouchEnd={(event) => {
            const start = touch.current;
            touch.current = null;
            if (!start) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4)
              move(dx < 0 ? 1 : -1);
          }}
        >
          <div className={"concept-frame device-" + device} data-screen={title}>
            {!expanded && (
              <ConceptPreview
                concept={concept.id}
                screen={index}
                navigate={setIndex}
                choices={choices}
                select={select}
              />
            )}
          </div>
        </div>
        <div
          className="concept-thumbnails"
          role="group"
          aria-label="Miniaturas de prévias"
        >
          {concept.screens.map((label, position) => (
            <button
              key={label}
              type="button"
              aria-pressed={index === position}
              onClick={() => setIndex(position)}
            >
              <Image
                className="concept-thumb"
                src={`/catalogo/previas/${concept.id}-${position + 1}.webp`}
                width={200}
                height={120}
                alt=""
                unoptimized
              />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>
      <dialog
        ref={dialog}
        className="concept-dialog"
        aria-label={"Prévia ampliada de " + concept.name}
        onClose={() => {
          setExpanded(false);
          invoker.current?.focus();
        }}
        onKeyDown={(event) => {
          containDialogFocus(event, event.currentTarget);
          if (
            event.target instanceof HTMLElement &&
            event.target.closest(".concept-controls") &&
            (event.key === "ArrowLeft" || event.key === "ArrowRight")
          ) {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {expanded && (
          <>
            <div className="concept-controls">
              <span>{title}</span>
              {controls}
              <button
                ref={closeButton}
                type="button"
                className="icon-button"
                aria-label="Fechar prévia"
                onClick={() => dialog.current?.close()}
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="concept-stage">
              <div className={"concept-frame device-" + device}>
                <ConceptPreview
                  concept={concept.id}
                  screen={index}
                  navigate={setIndex}
                  choices={choices}
                  select={select}
                />
              </div>
            </div>
          </>
        )}
      </dialog>
    </article>
  );
}

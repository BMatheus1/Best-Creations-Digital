"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import type { Project, ProjectImage } from "@/types";
import { containDialogFocus } from "@/lib/dialog";

export function ProjectGallery({
  images,
  theme,
  name,
}: {
  images?: ProjectImage[];
  theme?: Project["theme"];
  name: string;
}) {
  const items =
    images ||
    (theme
      ? [
          {
            src: `/visuals/project-${theme}.svg`,
            width: 1200,
            height: 760,
            alt: `Estudo ilustrativo de ${name}`,
            kind: "demonstration" as const,
            caption: "Estudo visual conceitual. Não é screenshot do produto.",
          },
        ]
      : []);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState<string[]>([]);
  const modal = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const image = items[index];
  useEffect(() => {
    if (!open || !modal.current) return;
    const dialog = modal.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector("button")?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [open]);
  function close() {
    modal.current?.close();
    setOpen(false);
    opener.current?.focus();
  }
  function move(direction: number) {
    if (items.length)
      setIndex((value) => (value + direction + items.length) % items.length);
  }
  if (!image)
    return (
      <div className="preview-unavailable">
        <p>Imagens ainda não disponibilizadas para este projeto.</p>
      </div>
    );
  const unavailable = failed.includes(image.src);
  const picture = (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      sizes="(max-width: 700px) 100vw, 90vw"
      onError={() => setFailed((list) => [...list, image.src])}
    />
  );
  const controls = (
    <>
      <button
        className="icon-button"
        aria-label="Imagem anterior"
        disabled={items.length < 2}
        onClick={() => move(-1)}
      >
        <ArrowLeft size={17} aria-hidden="true" />
      </button>
      <button
        className="icon-button"
        aria-label="Próxima imagem"
        disabled={items.length < 2}
        onClick={() => move(1)}
      >
        <ArrowRight size={17} aria-hidden="true" />
      </button>
    </>
  );
  return (
    <div className="gallery-viewer">
      <div className="gallery-toolbar">
        <span aria-live="polite">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")} ·{" "}
          {image.kind === "diagram"
            ? "DIAGRAMA"
            : image.kind === "screenshot"
              ? "CAPTURA DE INTERFACE"
              : "ESTUDO VISUAL"}
        </span>
        <div>
          {controls}
          <button
            className="icon-button"
            ref={opener}
            aria-label="Ampliar imagem"
            disabled={unavailable}
            onClick={() => setOpen(true)}
          >
            <Maximize2 size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        className={`gallery-image ${image.height > image.width ? "is-portrait" : ""}`}
        key={image.src}
      >
        {unavailable ? (
          <div className="preview-unavailable">
            <p>
              Esta imagem está indisponível. Continue pelas informações do
              projeto.
            </p>
          </div>
        ) : (
          picture
        )}
      </div>
      <p className="fine-print">{image.caption}</p>
      <dialog
        ref={modal}
        className="gallery-modal"
        aria-label={`Galeria de ${name} ampliada`}
        onKeyDown={(event) => {
          containDialogFocus(event, event.currentTarget);
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
      >
        <div className="gallery-modal-controls">
          <button
            className="close-menu"
            onClick={close}
            aria-label="Fechar visualização"
          >
            <X size={24} aria-hidden="true" />
          </button>
          <div>{controls}</div>
        </div>
        {unavailable ? <p>Imagem indisponível.</p> : picture}
        <p>{image.caption}</p>
      </dialog>
    </div>
  );
}

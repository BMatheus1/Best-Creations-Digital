"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, X } from "lucide-react";
import { Brand } from "@/components/ui/Brand";
import { StudioArtwork } from "@/components/visuals/StudioArtwork";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { company, navigation } from "@/data/company";
import { containDialogFocus } from "@/lib/dialog";
import type { ProjectImage } from "@/types";
export function Header({ previewImage }: { previewImage?: ProjectImage }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const current = navigation[preview];
  useEffect(() => {
    if (!open || !dialog.current) return;
    const modal = dialog.current;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    firstLink.current?.focus();
    return () => {
      modal.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  function closeMenu() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <header className="site-header">
        <div className="header-inner shell">
          <Brand />
          <span className="header-edition">
            INDEPENDENT DIGITAL STUDIO <i />
          </span>
          <div className="header-actions">
            <Link className="header-start" href="/iniciar-projeto">
              Iniciar projeto <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
            <button
              className={`menu-trigger ${open ? "is-open" : ""}`}
              ref={trigger}
              aria-label="Abrir menu"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="experience-menu"
              onClick={() => setOpen(true)}
            >
              <span>MENU</span>
              <span className="menu-bars" aria-hidden="true">
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>
      </header>
      <dialog
        ref={dialog}
        id="experience-menu"
        className="fullscreen-menu"
        onKeyDown={(event) => containDialogFocus(event, event.currentTarget)}
        aria-labelledby="menu-title"
        onCancel={(event) => {
          event.preventDefault();
          closeMenu();
        }}
      >
        <div className="menu-top shell">
          <Brand onNavigate={closeMenu} />
          <span className="eyebrow">EXPLORE BEST CREATIONS</span>
          <button
            className="close-menu"
            aria-label="Fechar menu"
            onClick={closeMenu}
          >
            <span>FECHAR</span>
            <X size={23} strokeWidth={1.2} aria-hidden="true" />
          </button>
        </div>
        <h2 id="menu-title" className="sr-only">
          Navegação em tela cheia
        </h2>
        <div className="menu-body shell">
          <nav aria-label="Navegação principal">
            <ol>
              {navigation.map((item, index) => (
                <li key={item.href}>
                  <Link
                    ref={index === 0 ? firstLink : undefined}
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onMouseEnter={() => setPreview(index)}
                    onFocus={() => setPreview(index)}
                    onClick={closeMenu}
                    className={preview === index ? "preview-active" : ""}
                  >
                    <span className="menu-index">0{index + 1}</span>
                    <span>{item.label}</span>
                    <ArrowUpRight
                      size={30}
                      strokeWidth={1}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <div className="menu-preview" data-preview={current.preview}>
            <div key={current.preview} className="preview-swap">
              {current.preview === "collection" ? (
                <ProjectVisual theme="restaurant" image={previewImage} />
              ) : (
                <StudioArtwork
                  id={`menu-${current.preview}`}
                  variant={current.preview}
                />
              )}
              <div className="menu-preview-caption">
                <span className="eyebrow">0{preview + 1} / 05</span>
                <p>{current.edition}</p>
                <span>DESIGN COM INTENÇÃO. TECNOLOGIA COM PROPÓSITO.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-bottom shell">
          <span>SEU PRÓXIMO MOVIMENTO COMEÇA AQUI.</span>
          <a href={company.instagram} target="_blank" rel="noopener noreferrer">
            Instagram <ArrowUpRight size={13} aria-hidden="true" />
            <span className="sr-only"> — abre em nova aba</span>
          </a>
        </div>
      </dialog>
    </>
  );
}

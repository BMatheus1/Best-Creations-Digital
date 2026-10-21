"use client";
import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import { containDialogFocus } from "@/lib/dialog";
export function DemoDialog({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const modal = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (!open || !modal.current) return;
    const dialog = modal.current;
    const opener = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    dialog.querySelector<HTMLElement>("input, button, select")?.focus();
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      const fallback = dialog
        .closest(".lab-app")
        ?.querySelector<HTMLElement>("[data-dialog-return]");
      if (
        opener instanceof HTMLElement &&
        opener.isConnected &&
        !opener.matches(":disabled")
      )
        opener.focus({ preventScroll: true });
      else fallback?.focus({ preventScroll: true });
    };
  }, [open]);
  return (
    <dialog
      ref={modal}
      className="lab-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => containDialogFocus(event, event.currentTarget)}
    >
      <div className="lab-dialog-heading">
        <h2 id={titleId}>{title}</h2>
        <button
          className="lab-icon"
          aria-label="Fechar janela"
          onClick={onClose}
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>
      {open ? children : null}
    </dialog>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname.startsWith("/lab/")) return null;
  return (
    <a
      className="whatsapp-contact"
      href={company.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Best Creations no WhatsApp (abre em nova aba)"
    >
      <MessageCircle size={23} aria-hidden="true" />
      <span>Vamos conversar?</span>
      <ArrowUpRight
        className="whatsapp-contact-arrow"
        size={16}
        aria-hidden="true"
      />
    </a>
  );
}

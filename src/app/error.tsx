"use client";

import Link from "next/link";
import { ArrowUpRight, RotateCcw } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="conteudo" className="not-found container">
      <p className="eyebrow">UMA PAUSA NO CAMINHO</p>
      <h1>
        Vamos tentar
        <br />
        <span className="serif gold-text">mais uma vez.</span>
      </h1>
      <p>
        Não foi possível carregar esta página agora. Você pode tentar novamente
        ou voltar ao início.
      </p>
      <div className="hero-actions">
        <button type="button" className="button button-gold" onClick={reset}>
          Tentar novamente <RotateCcw size={16} aria-hidden="true" />
        </button>
        <Link href="/" className="text-link">
          Voltar ao início <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

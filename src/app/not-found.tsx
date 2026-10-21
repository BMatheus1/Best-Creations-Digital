import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function NotFound() {
  return (
    <main id="conteudo" className="not-found container">
      <p className="eyebrow">404 / UM CAMINHO DIFERENTE</p>
      <h1>
        Essa página ainda
        <br />
        <span className="serif gold-text">não ganhou forma.</span>
      </h1>
      <p>Volte para conhecer nossas soluções e projetos.</p>
      <Link href="/" className="button button-gold">
        Voltar ao início <ArrowUpRight size={17} aria-hidden="true" />
      </Link>
    </main>
  );
}

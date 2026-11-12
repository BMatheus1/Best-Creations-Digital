import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SignatureArtwork } from "@/components/visuals/SignatureArtwork";
import { BrandGlyph } from "@/components/visuals/BrandMark";
import { brandPalette } from "@/data/brand";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";
import "./home.css";
export const metadata = pageMetadata(
  "O digital além do comum",
  company.description,
  "/",
);
export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.name,
    description: company.description,
    ...(company.siteUrl ? { url: company.siteUrl } : {}),
    sameAs: [company.instagram],
  };
  return (
    <main id="conteudo" className="experience-home">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <SignatureArtwork>
        <div className="home-surface home-surface-dark" aria-hidden="true" />
        <div className="home-surface home-surface-light" aria-hidden="true" />
        <svg
          className="home-signature"
          viewBox="-300 -205 600 410"
          aria-hidden="true"
          focusable="false"
        >
          <BrandGlyph b={brandPalette.white} c={brandPalette.black} />
        </svg>
        <div className="home-content">
          <div className="home-copy">
            <p className="home-eyebrow">ESTÚDIO DIGITAL INDEPENDENTE</p>
            <h1>
              O digital além do <em>comum.</em>
            </h1>
            <p>
              Criamos experiências digitais que unem design, tecnologia e
              estratégia.
            </p>
          </div>
          <nav
            className="home-navigation"
            aria-label="Explore a Best Creations"
          >
            <Link href="/servicos">
              <span>Explorar serviços</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/projetos">
              <span>Explore o showroom.</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/estudio">
              <span>O estúdio</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/iniciar-projeto">
              <span>Iniciar projeto</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </SignatureArtwork>
      <noscript>
        <p className="no-script shell">
          Explore as páginas pelos links. Os navegadores de serviços e projetos
          e o formulário usam JavaScript. Para contato direto, acesse o{" "}
          <a href={company.whatsappUrl}>WhatsApp da Best Creations</a>.
        </p>
      </noscript>
    </main>
  );
}

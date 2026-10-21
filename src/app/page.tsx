import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SignatureArtwork } from "@/components/visuals/SignatureArtwork";
import { StudioArtwork } from "@/components/visuals/StudioArtwork";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/metadata";
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
      <div className="home-stage">
        <div className="home-atmosphere" aria-hidden="true" />
        <SignatureArtwork>
          <StudioArtwork id="home-signature" className="home-art" />
        </SignatureArtwork>
        <div className="home-topline shell">
          <p className="eyebrow">
            <span className="live-dot" />
            BEST CREATIONS — DIGITAL EXPERIENCE
          </p>
          <span>ESTÉTICA. ENGENHARIA. EMOÇÃO.</span>
        </div>
        <div className="home-copy shell">
          <p className="home-kicker">FEITO PARA IR ALÉM.</p>
          <h1>
            O digital
            <br />
            além do <em>comum.</em>
          </h1>
          <div className="home-copy-bottom">
            <p>
              Criamos experiências digitais que unem
              <br className="desktop-only" /> design, tecnologia e estratégia.
            </p>
            <div className="home-ctas">
              <Link href="/servicos" className="button button-light">
                Explorar <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/iniciar-projeto" className="text-link">
                Iniciar projeto <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
        <div className="home-caption">
          <span>THE SIGNATURE / 001</span>
          <i />
          <span>DESIGN + TECHNOLOGY</span>
        </div>
        <div className="home-portal shell">
          <Link href="/projetos">
            <span className="portal-number">01 / THE COLLECTION</span>
            <span>Explore o showroom.</span>
            <ArrowRight size={20} strokeWidth={1} aria-hidden="true" />
          </Link>
          <Link href="/estudio">
            <span className="portal-number">02 / THE STUDIO</span>
            <span>Independente por natureza.</span>
            <ArrowRight size={20} strokeWidth={1} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <noscript>
        <p className="no-script shell">
          Explore as páginas pelos links. Os navegadores de serviços e projetos
          e o formulário usam JavaScript. Para contato direto, acesse o{" "}
          <a href={company.instagram}>Instagram oficial</a>.
        </p>
      </noscript>
    </main>
  );
}

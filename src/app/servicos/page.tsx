import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ServiceExplorer } from "@/components/services/ServiceExplorer";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Serviços — explore as possibilidades",
  "Explore sites, sistemas, aplicativos, design, soluções para negócios, inteligência artificial, automações e manutenção sob medida.",
  "/servicos",
);
export default function ServicesPage() {
  return (
    <main id="conteudo" className="inner-page shell">
      <Breadcrumb label="Serviços" />
      <div className="page-intro">
        <div>
          <p className="eyebrow">01 / EXPLORE</p>
          <h1>
            Cada ideia pede
            <br />
            uma <em>solução própria.</em>
          </h1>
        </div>
        <p>
          Sete especialidades. Um ponto de partida:
          <br />o que faz sentido para o seu negócio.
        </p>
      </div>
      <ServiceExplorer />
    </main>
  );
}

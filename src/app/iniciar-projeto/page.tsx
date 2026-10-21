import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProjectWizard } from "@/components/forms/ProjectWizard";
import { StudioArtwork } from "@/components/visuals/StudioArtwork";
import { company } from "@/data/company";
import { serviceOptions } from "@/data/services";
import type { QuoteValues } from "@/lib/validations";
import { pageMetadata } from "@/lib/metadata";
import { getProject } from "@/data/projects";
export const metadata = pageMetadata(
  "Iniciar projeto — seu próximo capítulo",
  "Conte sua ideia em poucos passos. Prepare uma solicitação de projeto personalizada para conversar com a Best Creations.",
  "/iniciar-projeto",
);
export default async function StartProject({
  searchParams,
}: {
  searchParams: Promise<{
    servico?: string | string[];
    referencia?: string | string[];
  }>;
}) {
  const query = await searchParams;
  const reference =
    typeof query.referencia === "string"
      ? getProject(query.referencia)
      : undefined;
  const initialService =
    typeof query.servico === "string" &&
    serviceOptions.includes(query.servico as QuoteValues["service"])
      ? (query.servico as QuoteValues["service"])
      : undefined;
  return (
    <main id="conteudo" className="inner-page start-page shell">
      <Breadcrumb label="Iniciar projeto" />
      <h1 className="sr-only">Iniciar um projeto com a Best Creations</h1>
      <div className="start-layout">
        <aside className="start-aside">
          <p className="eyebrow">YOUR NEXT CHAPTER</p>
          <p className="start-manifesto">
            Uma ideia sua.
            <br />
            <em>Uma criação nossa.</em>
          </p>
          <StudioArtwork id="project-contact" variant="contact" />
          <p>
            Uma conversa clara.
            <br />
            Uma solução com propósito.
          </p>
          <a
            className="text-link"
            href={company.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Prefere o Instagram? ↗
            <span className="sr-only"> — abre em nova aba</span>
          </a>
        </aside>
        <ProjectWizard
          initialService={initialService}
          initialReference={reference?.name}
        />
      </div>
      <noscript>
        <p className="no-script">
          O formulário progressivo precisa de JavaScript. Entre em contato pelo{" "}
          <a href={company.instagram}>Instagram oficial</a>.
        </p>
      </noscript>
    </main>
  );
}

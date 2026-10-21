import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { ProjectCollection } from "@/components/projects/ProjectCollection";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/data/projects";
export const metadata = pageMetadata(
  "Projetos — the collection",
  "Explore projetos reais auditados e experimente demos de CRM, agendamento e restaurante no showroom da Best Creations.",
  "/projetos",
);
export default function ProjectsPage() {
  const collection = projects.map(
    ({
      slug,
      name,
      categories,
      label,
      theme,
      status,
      description,
      technologies,
      kind,
      images,
      demoUrl,
      publishedUrl,
    }) => ({
      slug,
      name,
      categories,
      label,
      theme,
      status,
      description,
      technologies,
      kind,
      images: images.slice(0, 1),
      demoUrl,
      publishedUrl,
    }),
  );
  return (
    <main id="conteudo" className="inner-page collection-page shell">
      <Breadcrumb label="Projetos" />
      <h1 className="sr-only">Projetos — The Collection</h1>
      <ProjectCollection items={collection} />
    </main>
  );
}

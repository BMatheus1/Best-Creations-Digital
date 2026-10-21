import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projectQuoteUrl } from "@/data/projects";
export function LabFrame({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const project = getProject(slug)!;
  return (
    <main id="conteudo" className="lab-page">
      <div className="lab-context shell">
        <Link href="/projetos" className="text-link">
          <ArrowLeft size={15} aria-hidden="true" /> Voltar ao showroom
        </Link>
        <p>
          DEMONSTRAÇÃO INTERATIVA <span>· DADOS FICTÍCIOS</span>
        </p>
        <Link href={`/projetos/${slug}`} className="text-link">
          O estudo de caso <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
      {children}
      <div className="lab-commercial shell">
        <div>
          <p className="eyebrow">GOSTOU DA EXPERIÊNCIA?</p>
          <p>Imagine o que podemos criar para o seu negócio.</p>
        </div>
        <Link className="text-link accented" href={projectQuoteUrl(project)}>
          Solicitar projeto semelhante{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}

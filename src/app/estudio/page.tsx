import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Breadcrumb } from "@/components/layout/Breadcrumb";
import { StudioArtwork } from "@/components/visuals/StudioArtwork";
import { principles, process, industries } from "@/data/studio";
import { faq } from "@/data/faq";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "O estúdio — independente por natureza",
  "Conheça a filosofia, as especialidades e o processo da Best Creations, um estúdio independente que une design e desenvolvimento.",
  "/estudio",
);
export default function StudioPage() {
  return (
    <main id="conteudo" className="inner-page studio-page shell">
      <Breadcrumb label="O estúdio" />
      <section className="studio-opening">
        <div>
          <p className="eyebrow">03 / THE STUDIO</p>
          <h1>
            Tecnologia nas mãos.
            <br />
            <em>
              Criatividade
              <br />
              na essência.
            </em>
          </h1>
          <p className="studio-lead">
            Somos um estúdio independente de criação e desenvolvimento digital.
            Transformamos necessidades reais em experiências com identidade,
            funcionalidade e possibilidades de evolução.
          </p>
        </div>
        <div className="studio-brand-art">
          <StudioArtwork id="studio-signature" variant="studio" />
          <span>INDEPENDENT BY NATURE. PRECISE BY DESIGN.</span>
        </div>
      </section>
      <section className="studio-philosophy">
        <p className="eyebrow">NOSSA FORMA DE VER O DIGITAL</p>
        <h2>
          Uma boa experiência
          <br />
          se sente. <em>E funciona.</em>
        </h2>
        <p>
          A Best Creations nasceu da ideia de aproximar tecnologia e
          criatividade de pessoas e negócios. Acreditamos em uma presença
          digital que equilibra design, usabilidade e atenção aos detalhes — da
          primeira conversa à última linha de código.
        </p>
      </section>
      <section className="studio-principles">
        <div className="editorial-heading">
          <p className="eyebrow">O QUE ORIENTA CADA CRIAÇÃO</p>
          <h2>
            O detalhe
            <br />
            <em>é a diferença.</em>
          </h2>
        </div>
        <div>
          {principles.map((principle, index) => (
            <article key={principle.title}>
              <span>0{index + 1}</span>
              <h3>{principle.title}</h3>
              <p>{principle.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-process">
        <div className="editorial-heading">
          <p className="eyebrow">UM CAMINHO COMPARTILHADO</p>
          <h2>
            Da conversa
            <br />
            <em>à construção.</em>
          </h2>
        </div>
        <ol>
          {process.map((step, index) => (
            <li key={step.title}>
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="studio-specialties">
        <div>
          <p className="eyebrow">ESPECIALIDADES & CONTEXTOS</p>
          <h2>
            Seu universo.
            <br />
            <em>Novas possibilidades.</em>
          </h2>
          <p>
            Sites, aplicativos, sistemas, design, soluções para negócios,
            inteligência artificial, automações e evolução digital.
          </p>
          <Link className="text-link accented" href="/servicos">
            Explorar especialidades{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <div>
          {industries.map((industry) => (
            <details key={industry.title}>
              <summary>
                {industry.title}
                <Plus size={18} aria-hidden="true" />
              </summary>
              <p>{industry.text}</p>
            </details>
          ))}
        </div>
      </section>
      <details className="studio-faq">
        <summary>
          <span>
            <span className="eyebrow">ANTES DO PRIMEIRO PASSO</span>
            <span className="faq-heading">
              Boas perguntas. Respostas claras.
            </span>
          </span>
          <Plus size={25} strokeWidth={1} aria-hidden="true" />
        </summary>
        <div>
          {faq.map((item) => (
            <details key={item.question}>
              <summary>
                {item.question}
                <Plus size={17} aria-hidden="true" />
              </summary>
              <p>
                {item.answer.replace(
                  "Preencha o formulário",
                  "Acesse Iniciar projeto e preencha o formulário",
                )}
              </p>
            </details>
          ))}
        </div>
      </details>
      <section className="studio-end">
        <h2>
          O próximo capítulo
          <br />
          <em>pode ser o seu.</em>
        </h2>
        <Link className="button button-light" href="/iniciar-projeto">
          Iniciar projeto <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}

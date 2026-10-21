"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { services } from "@/data/services";
import { StudioArtwork } from "@/components/visuals/StudioArtwork";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import type { Project } from "@/types";
const ordered = [
  "sites",
  "sistemas",
  "apps",
  "negocios",
  "design",
  "ia",
  "manutencao",
].map((id) => services.find((service) => service.id === id)!);
const quoteTypes: Record<string, string> = {
  sites: "Site institucional",
  sistemas: "Sistema web",
  apps: "Aplicativo",
  negocios: "Cardápio digital",
  design: "Design/UI",
  ia: "Inteligência artificial",
  manutencao: "Manutenção",
};
export function ServiceExplorer() {
  const [index, setIndex] = useState(0);
  const service = ordered[index];
  const previewThemes: Partial<Record<string, Project["theme"]>> = {
    sistemas: "finance",
    apps: "diet",
    negocios: "restaurant",
    design: "beauty",
  };
  const previewTheme = previewThemes[service.id];
  function change(direction: number) {
    setIndex(
      (current) => (current + direction + ordered.length) % ordered.length,
    );
  }
  return (
    <div className="service-explorer">
      <aside className="service-selector">
        <span className="eyebrow">ESCOLHA SEU PRÓXIMO PASSO</span>
        <div role="group" aria-label="Categorias de serviços">
          {ordered.map((item, itemIndex) => (
            <button
              key={item.id}
              aria-pressed={index === itemIndex}
              onClick={() => setIndex(itemIndex)}
            >
              <span>0{itemIndex + 1}</span>
              {item.title}
              <ArrowUpRight size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
        <p>
          Uma necessidade real.
          <br />
          Uma solução com identidade.
        </p>
      </aside>
      <div className="mobile-service-selector">
        <label htmlFor="category-selector">Explore as soluções</label>
        <select
          id="category-selector"
          value={index}
          onChange={(event) => setIndex(Number(event.target.value))}
        >
          {ordered.map((item, itemIndex) => (
            <option value={itemIndex} key={item.id}>
              0{itemIndex + 1} — {item.title}
            </option>
          ))}
        </select>
        <div className="mobile-service-arrows">
          <button
            className="icon-button"
            aria-label="Solução anterior"
            onClick={() => change(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <span>0{index + 1} / 07</span>
          <button
            className="icon-button"
            aria-label="Próxima solução"
            onClick={() => change(1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
      <div className="service-stage" data-active-service={service.id}>
        <div key={service.id} className="service-presentation content-swap">
          <div className="service-copy">
            <p className="eyebrow">0{index + 1} / POSSIBILIDADES SOB MEDIDA</p>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <Link
              href={`/iniciar-projeto?servico=${encodeURIComponent(quoteTypes[service.id])}`}
              className="text-link accented"
            >
              Criar essa solução <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
          <div className={`service-art service-art-${service.id}`}>
            {previewTheme ? (
              <ProjectVisual theme={previewTheme} />
            ) : (
              <StudioArtwork
                id={`solution-${service.id}`}
                variant={
                  service.id === "ia"
                    ? "data"
                    : service.id === "manutencao"
                      ? "maintenance"
                      : "interfaces"
                }
              />
            )}
            <span className="art-caption">
              EXPLORAÇÃO VISUAL / {service.shortTitle.toUpperCase()}
            </span>
          </div>
          <details className="solution-details">
            <summary>
              Explorar solução{" "}
              <Plus size={20} strokeWidth={1.2} aria-hidden="true" />
            </summary>
            <div>
              <h3>O que podemos construir</h3>
              <ul>
                {service.deliverables.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <h3>Na prática</h3>
              <p>{service.example}</p>
              <Link
                className="text-link accented"
                href={`/iniciar-projeto?servico=${encodeURIComponent(quoteTypes[service.id])}`}
              >
                Iniciar um projeto <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </details>
        </div>
        <div className="service-stage-bottom">
          <span>DESIGN PENSADO. TECNOLOGIA APLICADA.</span>
          <span>
            0{index + 1}
            <i />
            07
          </span>
        </div>
      </div>
    </div>
  );
}

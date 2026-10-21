import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!company.siteUrl) return [];
  return [
    { url: company.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...["servicos", "projetos", "estudio", "iniciar-projeto"].map((path) => ({
      url: `${company.siteUrl}/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: `${company.siteUrl}/privacidade`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...projects.map((project) => ({
      url: `${company.siteUrl}/projetos/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

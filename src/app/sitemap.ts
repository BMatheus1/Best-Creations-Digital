import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import { privacyPolicy } from "@/data/privacy-policy";
export default function sitemap(): MetadataRoute.Sitemap {
  const policyEntry = {
    url: privacyPolicy.url,
    lastModified: privacyPolicy.updatedAt,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  };
  if (!company.siteUrl) return [policyEntry];
  return [
    { url: company.siteUrl, changeFrequency: "monthly", priority: 1 },
    ...["servicos", "projetos", "estudio", "iniciar-projeto"].map((path) => ({
      url: `${company.siteUrl}/${path}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    policyEntry,
    ...projects.map((project) => ({
      url: `${company.siteUrl}/projetos/${project.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

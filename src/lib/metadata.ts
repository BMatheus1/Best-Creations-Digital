import type { Metadata } from "next";
import { company } from "@/data/company";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    openGraph: {
      title: `${title} | Best Creations`,
      description,
      ...(company.siteUrl ? { url: `${company.siteUrl}${path}` } : {}),
    },
    twitter: { title: `${title} | Best Creations`, description },
    ...(company.siteUrl
      ? { alternates: { canonical: `${company.siteUrl}${path}` } }
      : {}),
  };
}

export type ProjectCategory =
  | "Websites"
  | "Aplicativos"
  | "Sistemas"
  | "Inteligência artificial"
  | "Demonstrações";
export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "screenshot" | "diagram" | "demonstration";
  caption: string;
}
export interface Project {
  id: string;
  slug: string;
  name: string;
  category: ProjectCategory;
  label: string;
  description: string;
  status: string;
  evidence: string;
  theme: "restaurant" | "beauty" | "finance" | "diet" | "data";
  problem: string;
  solution: string;
  features: string[];
  proposedTechnologies: string[];
  categories: ProjectCategory[];
  kind: "real" | "demo";
  technologies: string[];
  featureState: "verified" | "planned";
  documentedFeatures?: string[];
  plannedFeatures?: string[];
  limitations?: string[];
  images: ProjectImage[];
  repository?: string;
  publishedUrl?: string;
  demoUrl?: string;
  featured: boolean;
  order: number;
  quoteService?: string;
  audit?: { date: string; revision: string; paths: string[] };
}
export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  deliverables: string[];
  example: string;
  icon:
    "globe" | "phone" | "layout" | "store" | "pen" | "sparkles" | "settings";
}

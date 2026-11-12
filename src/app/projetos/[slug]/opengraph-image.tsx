import { ImageResponse } from "next/og";
import { brandPalette } from "@/data/brand";
import { allProjects } from "@/data/projects";
export const alt = "Projeto da coleção Best Creations";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = allProjects.find((item) => item.slug === slug);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: brandPalette.black,
        padding: 80,
        borderBottom: `8px solid ${brandPalette.white}`,
        color: brandPalette.offWhite,
      }}
    >
      <span
        style={{ color: brandPalette.white, fontSize: 24, letterSpacing: 4 }}
      >
        BEST CREATIONS / ESTÚDIO DIGITAL
      </span>
      <span style={{ fontSize: 64, marginTop: 90 }}>
        {project?.name ?? "Projetos"}
      </span>
      <span style={{ color: brandPalette.gray, fontSize: 28, marginTop: 30 }}>
        {project?.description ?? "Explore novas possibilidades."}
      </span>
      <span style={{ color: brandPalette.white, fontSize: 22, marginTop: 55 }}>
        {project?.status ?? "Apresentação demonstrativa"}
      </span>
    </div>,
    size,
  );
}

"use client";
import { useState } from "react";
import Image from "next/image";
import type { Project, ProjectImage } from "@/types";
export function ProjectVisual({
  theme,
  gallery = false,
  priority = false,
  image,
}: {
  theme?: Project["theme"];
  gallery?: boolean;
  priority?: boolean;
  image?: ProjectImage;
}) {
  const src = image?.src || (theme ? `/visuals/project-${theme}.svg` : "");
  const [failed, setFailed] = useState("");
  if (!src || failed === src)
    return (
      <div className="preview-unavailable">
        <span>BC / EM PREPARAÇÃO</span>
        <p>Prévia real ainda não disponibilizada.</p>
      </div>
    );
  return (
    <div
      className={`project-visual visual-${theme || "product"} ${gallery ? "visual-gallery" : ""}`}
    >
      <Image
        src={src}
        alt={
          image?.alt ||
          "Estudo de interface demonstrativo, sem comprovação de entrega comercial"
        }
        width={image?.width || 1200}
        height={image?.height || 760}
        sizes="(max-width: 700px) 100vw, 90vw"
        loading={priority ? "eager" : "lazy"}
        onError={() => setFailed(src)}
      />
    </div>
  );
}

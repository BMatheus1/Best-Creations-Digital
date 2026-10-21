import { ImageResponse } from "next/og";
import { brandPaths } from "@/data/brand";
export const alt =
  "Best Creations — Design com intenção. Tecnologia com propósito.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0B0B0B",
        color: "#F6F2E9",
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        width: "100%",
        height: "100%",
        borderBottom: "8px solid #C9A44C",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
        <svg width="68" height="66" viewBox="0 0 128 124" fill="#C9A44C">
          <path d={brandPaths.b} fillRule="evenodd" />
          <path d={brandPaths.c} />
        </svg>
        <span style={{ fontSize: 21, letterSpacing: 5 }}>
          BEST CREATIONS / DIGITAL STUDIO
        </span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: -3,
          marginTop: 80,
          lineHeight: 1.08,
        }}
      >
        <span>O digital</span>
        <span style={{ color: "#C9A44C" }}>além do comum.</span>
      </div>
      <div
        style={{
          fontSize: 20,
          letterSpacing: 4,
          display: "flex",
          marginTop: 55,
          color: "#AAA7A0",
        }}
      >
        DESIGN · TECNOLOGIA · INOVAÇÃO
      </div>
    </div>,
    size,
  );
}

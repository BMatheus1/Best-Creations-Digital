import { ImageResponse } from "next/og";
import {
  brandBadgeGlyphTransform,
  brandBadgeHalf,
  brandBadgeViewBox,
  brandGlyphOffset,
  brandPalette,
  brandPaths,
} from "@/data/brand";
export const alt =
  "Best Creations — Design com intenção. Tecnologia com propósito.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        background: brandPalette.black,
        color: brandPalette.offWhite,
        display: "flex",
        flexDirection: "column",
        padding: "70px 80px",
        width: "100%",
        height: "100%",
        borderBottom: `8px solid ${brandPalette.white}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 25 }}>
        <svg width="74" height="74" viewBox={brandBadgeViewBox}>
          <circle
            r="245"
            fill={brandPalette.black}
            stroke={brandPalette.white}
            strokeWidth="8"
          />
          <path d={brandBadgeHalf} fill={brandPalette.white} />
          <g transform={brandBadgeGlyphTransform}>
            <g transform={brandGlyphOffset} fill={brandPalette.black}>
              <path
                d={brandPaths.b}
                fill={brandPalette.white}
                fillRule="evenodd"
              />
              <path d={brandPaths.c} />
              <path d={brandPaths.dot} />
            </g>
          </g>
        </svg>
        <span style={{ fontSize: 21, letterSpacing: 5 }}>
          BEST CREATIONS / ESTÚDIO DIGITAL
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
        <span style={{ color: brandPalette.white }}>além do comum.</span>
      </div>
      <div
        style={{
          fontSize: 20,
          letterSpacing: 4,
          display: "flex",
          marginTop: 55,
          color: brandPalette.gray,
        }}
      >
        DESIGN · TECNOLOGIA · INOVAÇÃO
      </div>
    </div>,
    size,
  );
}

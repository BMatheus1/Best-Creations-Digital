import type { SVGProps } from "react";
import {
  brandPaths,
  brandPalette,
  brandGlyphOffset,
  brandBadgeViewBox,
  brandBadgeHalf,
  brandBadgeGlyphTransform,
} from "@/data/brand";

export function BrandGlyph({
  b = "currentColor",
  c = "currentColor",
}: {
  b?: string;
  c?: string;
}) {
  return (
    <g transform={brandGlyphOffset}>
      <path
        className="brand-letter-b"
        d={brandPaths.b}
        fill={b}
        fillRule="evenodd"
      />
      <g className="brand-letter-c" fill={c}>
        <path d={brandPaths.c} />
        <path d={brandPaths.dot} />
      </g>
    </g>
  );
}

export function BrandMark({
  tone = "split",
  ...props
}: SVGProps<SVGSVGElement> & { tone?: "split" | "light" | "dark" }) {
  if (tone !== "split") {
    const ink = tone === "light" ? brandPalette.white : brandPalette.black;
    return (
      <svg viewBox="-300 -165 600 330" focusable="false" {...props}>
        <BrandGlyph b={ink} c={ink} />
      </svg>
    );
  }
  return (
    <svg viewBox={brandBadgeViewBox} focusable="false" {...props}>
      <circle
        r="245"
        fill={brandPalette.black}
        stroke={brandPalette.white}
        strokeWidth="8"
      />
      <path d={brandBadgeHalf} fill={brandPalette.white} />
      <g transform={brandBadgeGlyphTransform}>
        <BrandGlyph b={brandPalette.white} c={brandPalette.black} />
      </g>
    </svg>
  );
}

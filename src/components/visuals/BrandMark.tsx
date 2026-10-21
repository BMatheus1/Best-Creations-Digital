import type { SVGProps } from "react";
import { brandPaths } from "@/data/brand";

export function BrandGlyph({
  gold = "currentColor",
  graphite = "currentColor",
}: {
  gold?: string;
  graphite?: string;
}) {
  return (
    <>
      <g className="mark-piece mark-piece-b">
        <path d={brandPaths.b} fill={gold} fillRule="evenodd" />
        <path
          d="M13 13H55L78 36M31 94H50L62 82"
          stroke="currentColor"
          strokeOpacity=".38"
          strokeWidth=".45"
        />
      </g>
      <g className="mark-piece mark-piece-c">
        <path d={brandPaths.c} fill={graphite} />
        <path
          d="M115 28L99 12H76L51 37V85L76 110H99L115 94M69 45L84 30H91"
          stroke="currentColor"
          strokeOpacity=".42"
          strokeWidth=".45"
        />
      </g>
    </>
  );
}

export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 124" fill="none" focusable="false" {...props}>
      <BrandGlyph />
    </svg>
  );
}

import { BrandGlyph } from "./BrandMark";
import { brandPaths } from "@/data/brand";

export type ArtworkVariant =
  | "signature"
  | "interfaces"
  | "collection"
  | "studio"
  | "contact"
  | "data"
  | "maintenance";
export function StudioArtwork({
  id,
  variant = "signature",
  className = "",
}: {
  id: string;
  variant?: ArtworkVariant;
  className?: string;
}) {
  const gold = id + "-gold";
  const graphite = id + "-graphite";
  return (
    <div
      className={`studio-artwork art-${variant} ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1000 800" fill="none" focusable="false">
        <defs>
          <linearGradient
            id={id + "-signature-gold"}
            x1="12"
            y1="12"
            x2="92"
            y2="111"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#67512b" />
            <stop offset=".27" stopColor="#c9a44c" />
            <stop offset=".44" stopColor="#ead7a4" />
            <stop offset=".49" stopColor="#b89a58" />
            <stop offset=".78" stopColor="#8b6d34" />
            <stop offset="1" stopColor="#d4bb7f" />
          </linearGradient>
          <linearGradient
            id={id + "-signature-graphite"}
            x1="60"
            y1="16"
            x2="116"
            y2="104"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#777c78" />
            <stop offset=".25" stopColor="#b0b2a5" />
            <stop offset=".43" stopColor="#454946" />
            <stop offset=".52" stopColor="#202420" />
            <stop offset=".8" stopColor="#555a53" />
            <stop offset="1" stopColor="#8d9183" />
          </linearGradient>
          <linearGradient id={id + "-sheen"}>
            <stop stopColor="#fff5dc" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff5dc" stopOpacity=".7" />
            <stop offset="1" stopColor="#fff5dc" stopOpacity="0" />
          </linearGradient>
          <clipPath id={id + "-signature-clip"}>
            <path d={brandPaths.b} fillRule="evenodd" clipRule="evenodd" />
            <path d={brandPaths.c} />
          </clipPath>
          <linearGradient
            id={gold}
            x1="170"
            y1="100"
            x2="690"
            y2="700"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#342b1a" />
            <stop offset=".17" stopColor="#b3934c" />
            <stop offset=".29" stopColor="#f4e5b8" />
            <stop offset=".34" stopColor="#9c7a36" />
            <stop offset=".48" stopColor="#e4c780" />
            <stop offset=".65" stopColor="#61502d" />
            <stop offset=".79" stopColor="#d4b66a" />
            <stop offset="1" stopColor="#3c301d" />
          </linearGradient>
          <linearGradient
            id={graphite}
            x1="700"
            y1="150"
            x2="370"
            y2="680"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#202223" />
            <stop offset=".25" stopColor="#737675" />
            <stop offset=".29" stopColor="#343635" />
            <stop offset=".57" stopColor="#151718" />
            <stop offset=".8" stopColor="#666763" />
            <stop offset="1" stopColor="#151615" />
          </linearGradient>
          <radialGradient id={id + "-ground"}>
            <stop stopColor="#c9a44c" stopOpacity=".11" />
            <stop offset="1" stopColor="#c9a44c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="520"
          cy="651"
          rx="410"
          ry="110"
          fill={`url(#${id}-ground)`}
        />
        <g
          className="art-contours"
          stroke="#c9a44c"
          strokeOpacity=".13"
          strokeWidth=".7"
        >
          <ellipse
            cx="520"
            cy="430"
            rx="390"
            ry="270"
            transform="rotate(-22 520 430)"
          />
          <ellipse
            cx="520"
            cy="430"
            rx="430"
            ry="300"
            transform="rotate(-22 520 430)"
          />
          <path d="M90 650 890 190M140 710 935 250" />
        </g>
        {variant === "data" ? (
          <g stroke={`url(#${gold})`} strokeWidth="2">
            <path d="m240 275 260 135 245-170M240 275l55 290 205-155 218 145 27-315M295 565h423" />
            <circle cx="240" cy="275" r="63" fill="#171917" />
            <circle cx="500" cy="410" r="92" fill="#171917" />
            <circle cx="745" cy="240" r="58" fill="#171917" />
            <circle cx="295" cy="565" r="43" fill="#171917" />
            <circle cx="718" cy="555" r="54" fill="#171917" />
            <path d="m470 405 22 22 43-43" strokeWidth="5" />
            <path d="M215 275h50m455-35h50M278 565h34m-11-12v24M700 555h36" />
            <text
              x="235"
              y="170"
              fontSize="12"
              letterSpacing="3"
              fill="#c8b78f"
              stroke="none"
            >
              DADOS. CRITÉRIO. POSSIBILIDADES.
            </text>
          </g>
        ) : variant === "maintenance" ? (
          <g transform="rotate(-8 500 400)">
            <rect
              x="210"
              y="190"
              width="580"
              height="430"
              rx="7"
              fill="#141613"
              stroke="#77715f"
            />
            <path d="M210 240H790" stroke="#4a483c" />
            <circle cx="235" cy="214" r="4" fill="#c9a44c" />
            <path
              d="M265 300H510M265 337H445M265 374H475M265 411H410M265 448H455M265 485H375"
              stroke="#9a9d88"
              strokeWidth="7"
            />
            <circle
              cx="665"
              cy="435"
              r="100"
              fill="#1b2117"
              stroke={`url(#${gold})`}
              strokeWidth="3"
            />
            <path
              d="m622 433 31 31 58-62"
              stroke={`url(#${gold})`}
              strokeWidth="9"
            />
            <text
              x="264"
              y="560"
              fontSize="12"
              letterSpacing="2"
              fill="#c8b78f"
            >
              EVOLUIR FAZ PARTE.
            </text>
          </g>
        ) : variant === "interfaces" || variant === "collection" ? (
          <g
            className="art-interfaces"
            transform="translate(60 100) rotate(-8 450 280)"
          >
            <rect
              x="90"
              y="90"
              width="630"
              height="410"
              rx="6"
              fill="#111311"
              stroke="#686047"
            />
            <path d="M90 128H720" stroke="#4c4638" />
            <circle cx="111" cy="110" r="3" fill="#c9a44c" />
            <circle cx="123" cy="110" r="3" fill="#5c5543" />
            <text
              x="125"
              y="185"
              fill="#c9a44c"
              fontSize="15"
              letterSpacing="3"
            >
              BEST CREATIONS
            </text>
            <text
              x="125"
              y="259"
              fill="#f6f2e9"
              fontSize="49"
              letterSpacing="-2"
            >
              Ideias com forma.
            </text>
            <text x="125" y="305" fill="#aaa7a0" fontSize="17">
              Design. Tecnologia. Possibilidades.
            </text>
            <path d="M125 345H290" stroke="#c9a44c" strokeWidth="2" />
            <rect x="125" y="389" width="150" height="71" fill="#24251f" />
            <rect x="294" y="389" width="150" height="71" fill="#20221d" />
            <rect x="463" y="389" width="150" height="71" fill="#1b1e19" />
            <rect
              x="635"
              y="238"
              width="153"
              height="300"
              rx="24"
              fill="#101210"
              stroke="#8f8365"
              strokeWidth="3"
            />
            <rect x="688" y="250" width="45" height="8" rx="4" fill="#3c3b31" />
            <path
              d="M660 292H755M660 315H720"
              stroke="#aaa7a0"
              strokeWidth="4"
            />
            <circle
              cx="710"
              cy="398"
              r="43"
              stroke={`url(#${gold})`}
              strokeWidth="10"
            />
            <path d="M662 476H755" stroke="#c9a44c" strokeWidth="2" />
          </g>
        ) : variant === "contact" ? (
          <g transform="rotate(-13 500 400)">
            <path
              d="M220 280H780V590H220Z"
              fill="#111311"
              stroke={`url(#${gold})`}
              strokeWidth="3"
            />
            <path
              d="m220 280 280 210 280-210M220 590l202-170m358 170L578 420"
              stroke={`url(#${gold})`}
              strokeWidth="3"
            />
            <circle cx="500" cy="490" r="68" fill="#171917" stroke="#645636" />
            <path
              d="M470 490h60m-24-24 24 24-24 24"
              stroke={`url(#${gold})`}
              strokeWidth="6"
            />
          </g>
        ) : (
          <g
            className="metal-monogram"
            transform="translate(170 60) scale(5.1) rotate(-10 64 62)"
            color="#f2dfb4"
          >
            <g transform="translate(2.2 2.8)" opacity=".8">
              <BrandGlyph gold="#332a1b" graphite="#20231f" />
            </g>
            <BrandGlyph
              gold={`url(#${id}-signature-gold)`}
              graphite={`url(#${id}-signature-graphite)`}
            />
            <g clipPath={`url(#${id}-signature-clip)`}>
              <g className="mark-sheen">
                <path d="M-80-30H-35L25 155H-20Z" fill={`url(#${id}-sheen)`} />
              </g>
            </g>
          </g>
        )}
        <path
          d="M118 150v17m-8-8h17M871 650v17m-8-8h17"
          stroke="#a08c5c"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

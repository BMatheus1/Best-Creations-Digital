import { BrandGlyph } from "./BrandMark";
import { brandPalette } from "@/data/brand";

export type ArtworkVariant =
  | "signature"
  | "interfaces"
  | "collection"
  | "studio"
  | "contact"
  | "data"
  | "maintenance";
export function StudioArtwork({
  variant = "signature",
  className = "",
}: {
  variant?: ArtworkVariant;
  className?: string;
}) {
  const isSignature = variant === "signature" || variant === "studio";
  return (
    <div
      className={`studio-artwork art-${variant} ${className}`}
      aria-hidden="true"
    >
      {isSignature ? (
        <svg viewBox="0 0 840 490" fill="none" focusable="false">
          <g className="bc-signature">
            <rect
              x="1"
              y="1"
              width="838"
              height="488"
              fill={brandPalette.black}
              stroke={brandPalette.lineDark}
              strokeWidth="2"
            />
            <path
              className="bc-paper"
              d="M420 0H840V490H420Z"
              fill={brandPalette.white}
            />
            <path
              className="bc-seam"
              d="M420 0V490"
              stroke={brandPalette.white}
              strokeWidth="2"
            />
            <g transform="translate(420 245) scale(1.04)">
              <BrandGlyph b={brandPalette.white} c={brandPalette.black} />
            </g>
          </g>
        </svg>
      ) : (
        <svg viewBox="0 0 1000 800" fill="none" focusable="false">
          {variant === "data" ? (
            <g stroke="#c4c4c7" strokeWidth="2">
              <path d="m240 275 260 135 245-170M240 275l55 290 205-155 218 145 27-315M295 565h423" />
              <circle cx="240" cy="275" r="63" fill="#191a1c" />
              <circle cx="500" cy="410" r="92" fill="#191a1c" />
              <circle cx="745" cy="240" r="58" fill="#191a1c" />
              <circle cx="295" cy="565" r="43" fill="#191a1c" />
              <circle cx="718" cy="555" r="54" fill="#191a1c" />
              <path d="m470 405 22 22 43-43" strokeWidth="5" />
              <path d="M215 275h50m455-35h50M278 565h34m-11-12v24M700 555h36" />
              <text
                x="235"
                y="170"
                fontSize="12"
                letterSpacing="3"
                fill="#b8b8bb"
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
                fill="#191a1c"
                stroke="#67686a"
              />
              <path d="M210 240H790" stroke="#343537" />
              <circle cx="235" cy="214" r="4" fill="#f5f4f0" />
              <path
                d="M265 300H510M265 337H445M265 374H475M265 411H410M265 448H455M265 485H375"
                stroke="#a6a6a9"
                strokeWidth="7"
              />
              <circle
                cx="665"
                cy="435"
                r="100"
                fill="#191a1c"
                stroke="#c4c4c7"
                strokeWidth="3"
              />
              <path d="m622 433 31 31 58-62" stroke="#c4c4c7" strokeWidth="9" />
              <text
                x="264"
                y="560"
                fontSize="12"
                letterSpacing="2"
                fill="#b8b8bb"
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
                fill="#111214"
                stroke="#696a6c"
              />
              <path d="M90 128H720" stroke="#343537" />
              <circle cx="111" cy="110" r="3" fill="#f5f4f0" />
              <circle cx="123" cy="110" r="3" fill="#66676a" />
              <text
                x="125"
                y="185"
                fill="#f5f4f0"
                fontSize="15"
                letterSpacing="3"
              >
                BEST CREATIONS
              </text>
              <text
                x="125"
                y="259"
                fill="#f5f4f0"
                fontSize="49"
                letterSpacing="-2"
              >
                Ideias com forma.
              </text>
              <text x="125" y="305" fill="#b8b8bb" fontSize="17">
                Design. Tecnologia. Possibilidades.
              </text>
              <path d="M125 345H290" stroke="#f5f4f0" strokeWidth="2" />
              <rect x="125" y="389" width="150" height="71" fill="#27282a" />
              <rect x="294" y="389" width="150" height="71" fill="#212224" />
              <rect x="463" y="389" width="150" height="71" fill="#191a1c" />
              <rect
                x="635"
                y="238"
                width="153"
                height="300"
                rx="24"
                fill="#111214"
                stroke="#929295"
                strokeWidth="3"
              />
              <rect
                x="688"
                y="250"
                width="45"
                height="8"
                rx="4"
                fill="#343537"
              />
              <path
                d="M660 292H755M660 315H720"
                stroke="#b8b8bb"
                strokeWidth="4"
              />
              <circle
                cx="710"
                cy="398"
                r="43"
                stroke="#c4c4c7"
                strokeWidth="10"
              />
              <path d="M662 476H755" stroke="#f5f4f0" strokeWidth="2" />
            </g>
          ) : variant === "contact" ? (
            <g transform="rotate(-13 500 400)">
              <path
                d="M220 280H780V590H220Z"
                fill="#111214"
                stroke="#c4c4c7"
                strokeWidth="3"
              />
              <path
                d="m220 280 280 210 280-210M220 590l202-170m358 170L578 420"
                stroke="#c4c4c7"
                strokeWidth="3"
              />
              <circle
                cx="500"
                cy="490"
                r="68"
                fill="#191a1c"
                stroke="#66676a"
              />
              <path
                d="M470 490h60m-24-24 24 24-24 24"
                stroke="#c4c4c7"
                strokeWidth="6"
              />
            </g>
          ) : null}
        </svg>
      )}
    </div>
  );
}

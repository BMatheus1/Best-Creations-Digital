import Link from "next/link";
import { BrandMark } from "@/components/visuals/BrandMark";

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="brand"
      aria-label="Best Creations — início"
    >
      <BrandMark className="brand-mark" aria-hidden="true" />
      <span>
        <span className="brand-name">BEST CREATIONS</span>
        <span className="brand-signature">
          D I G I T A L &nbsp; S T U D I O
        </span>
      </span>
    </Link>
  );
}

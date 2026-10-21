import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { company } from "@/data/company";
export function Footer() {
  return (
    <footer className="site-footer shell">
      <span>© {new Date().getFullYear()} BEST CREATIONS</span>
      <span className="footer-philosophy">
        DESIGN WITH INTENTION. BUILT WITH PURPOSE.
      </span>
      <div>
        <a href={company.instagram} target="_blank" rel="noopener noreferrer">
          Instagram <ArrowUpRight size={12} aria-hidden="true" />
          <span className="sr-only"> — abre em nova aba</span>
        </a>
        <Link href="/privacidade">Privacidade</Link>
      </div>
    </footer>
  );
}

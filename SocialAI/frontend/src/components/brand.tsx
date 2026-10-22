import { Send } from "lucide-react";
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand ${light ? "brand-light" : ""}`}>
      <span className="brand-icon">
        <Send size={21} strokeWidth={2.4} />
      </span>
      PostPilot<span className="brand-dot">.</span>
    </span>
  );
}

import type { Metadata } from "next";
import "./lab.css";
export const metadata: Metadata = { robots: { index: false, follow: true } };
export default function LabLayout({ children }: { children: React.ReactNode }) {
  return children;
}

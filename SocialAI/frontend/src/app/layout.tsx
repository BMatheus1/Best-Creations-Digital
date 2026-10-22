import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "PostPilot — Seu conteúdo, com direção",
    template: "%s · PostPilot",
  },
  description:
    "Seu espaço para organizar a presença do seu negócio no Instagram. Plataforma em desenvolvimento por fases.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

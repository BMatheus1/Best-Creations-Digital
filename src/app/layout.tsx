import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
});
const manrope = localFont({
  src: "./fonts/manrope-latin.woff2",
  weight: "200 800",
  variable: "--font-manrope",
  display: "swap",
});
const editorial = localFont({
  src: "./fonts/cormorant-garamond-italic-latin.woff2",
  weight: "400 500",
  style: "italic",
  adjustFontFallback: "Times New Roman",
  variable: "--font-editorial",
  display: "swap",
});
export const metadata: Metadata = {
  ...(company.siteUrl ? { metadataBase: new URL(company.siteUrl) } : {}),
  title: { default: company.title, template: "%s | Best Creations" },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    title: company.title,
    description: company.description,
    locale: "pt_BR",
    type: "website",
    siteName: "Best Creations | Digital Studio",
    ...(company.siteUrl ? { url: company.siteUrl } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: company.title,
    description: company.description,
  },
};
export const viewport: Viewport = {
  themeColor: company.identity.black,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${manrope.variable} ${editorial.variable}`}
    >
      <body>
        <a className="skip-link" href="#conteudo">
          Pular para o conteúdo
        </a>
        <Header previewImage={projects[0].images[0]} />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}

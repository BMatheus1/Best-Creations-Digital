import type { Metadata, Viewport } from "next";
import { Inter, Manrope, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { company } from "@/data/company";
import { projects } from "@/data/projects";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const editorial = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
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
  themeColor: "#0B0B0B",
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
      </body>
    </html>
  );
}

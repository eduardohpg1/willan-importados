import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Willan Importados | Perfumes de Luxo",
  description: "Descubra nossa coleção exclusiva de perfumes importados. Fragrâncias únicas para momentos únicos.",
  openGraph: {
    title: "Willan Importados | Perfumes de Luxo",
    description: "Descubra nossa coleção exclusiva de perfumes importados.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}

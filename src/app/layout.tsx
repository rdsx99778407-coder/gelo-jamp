import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { WhatsappButton } from "@/components/sections/WhatsappButton";
import { IceEffect } from "@/components/sections/IceEffect";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Gelo Jamp — Distribuidora de Gelo em Jampruca - MG",
  description:
    "Gelo Jamp — Qualidade e frescor para seus melhores momentos! Distribuidora de gelo em Jampruca, MG. Peça pelo WhatsApp: +55 33 98704-6287.",
  keywords: [
    "gelo",
    "distribuidora de gelo",
    "gelo em cubos",
    "Jampruca MG",
    "gelo jamp",
    "água potável",
    "gelo para consumo humano",
  ],
  openGraph: {
    title: "Gelo Jamp — Qualidade e frescor para seus melhores momentos!",
    description:
      "Distribuidora de gelo em Jampruca - MG. Atendemos Jampruca e região. Peça pelo WhatsApp +55 33 98704-6287.",
    type: "website",
    locale: "pt_BR",
    siteName: "Gelo Jamp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col antialiased selection:bg-blue-200 selection:text-brand-dark font-sans">
        <IceEffect />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}
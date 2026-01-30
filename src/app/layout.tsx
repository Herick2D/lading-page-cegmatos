import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CEGMATOS - Engenharia de Ar Condicionado",
  description:
    "Mais de 25 anos de expertise em engenharia de ar condicionado, ventilação e exaustão mecânica. Soluções confiáveis com eficiência energética e sustentabilidade.",
  keywords: [
    "ar condicionado",
    "HVAC",
    "climatização",
    "ventilação",
    "exaustão",
    "engenharia",
    "manutenção",
    "instalação",
    "Rio de Janeiro",
  ],
  authors: [{ name: "CEGMATOS" }],
  openGraph: {
    title: "CEGMATOS - Engenharia de Ar Condicionado",
    description:
      "Mais de 25 anos de expertise em engenharia de ar condicionado, ventilação e exaustão mecânica.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${openSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

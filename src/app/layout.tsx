import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Edwin Castro — Official Community Support | Funding for Education, Housing & More",
  description:
    "The official site for Edwin Castro. Apply for funding and support across the USA: education, housing, disaster recovery, and community help. One real place to reach out.",
  keywords: [
    "Edwin Castro",
    "Powerball",
    "community support",
    "funding",
    "education",
    "housing",
    "USA",
    "apply",
    "official",
  ],
  openGraph: {
    title: "Edwin Castro — Official Community Support",
    description:
      "Apply for funding and support: education, housing, and community help across the USA.",
    url: "https://edwinmega.com",
  },
  metadataBase: new URL("https://edwinmega.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${fraunces.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

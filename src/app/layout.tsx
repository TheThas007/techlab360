import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechLab 360 — Virtual Engineering Laboratory Platform",
  description:
    "Master Automobile, Civil Engineering, Physics, and Chemistry through immersive virtual lab simulations, AI assistance, and smart learning tools. Built for engineering and technology students.",
  keywords: [
    "virtual lab",
    "engineering education",
    "automobile technology",
    "civil engineering",
    "physics simulation",
    "chemistry lab",
    "AI tutor",
    "student learning platform",
  ],
  authors: [{ name: "TechLab 360" }],
  openGraph: {
    title: "TechLab 360 — Virtual Engineering Laboratory Platform",
    description:
      "Immersive virtual labs for Automobile, Civil, Physics & Chemistry students.",
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
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

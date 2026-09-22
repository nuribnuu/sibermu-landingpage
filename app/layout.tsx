import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "SiberMu - Digital Experience Universitas Siber Muhammadiyah",
  description: "Bertumbuh dengan Ilmu, Berkarya dengan Nilai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="no-scrollbar">
      <body className="no-scrollbar bg-black text-white antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}


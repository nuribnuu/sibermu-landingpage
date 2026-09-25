import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Biro Kemahasiswaan & AIK | SIBERMU",
  description: "Biro Kemahasiswaan dan Al-Islam Kemuhammadiyahan — mendampingi mahasiswa belajar, berkarya, dan bertumbuh tanpa batas.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
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
          <CustomCursor />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}


import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "sibermu-landingpage",
  description: "Scroll-driven frame sequence animation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-scrollbar">
      <body className="no-scrollbar bg-black antialiased">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";

import { QueryProvider } from "@/provider/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMK Nusantara Digital - Portal Berita Sekolah",
  description:
    "Portal berita, pengumuman, agenda, prestasi, galeri, dan informasi PPDB SMK Nusantara Digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}

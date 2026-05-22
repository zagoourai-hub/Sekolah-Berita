import type { Metadata } from "next";

import { defaultSchoolInfo } from "@/config/school";
import { getSettings } from "@/services/public-api";
import { schoolSetting } from "@/utils/portal";
import { QueryProvider } from "@/provider/query-provider";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings().catch(() => ({}));
  const schoolName = schoolSetting(
    settings,
    "school_name",
    defaultSchoolInfo.name || "Portal Sekolah",
  );
  const tagline = schoolSetting(
    settings,
    "school_tagline",
    defaultSchoolInfo.tagline,
  );

  return {
    title: `${schoolName} - Portal Berita Sekolah`,
    description: `Portal berita, pengumuman, agenda, prestasi, galeri, dan informasi PPDB ${schoolName}. ${tagline}`,
  };
}

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

import { PublicPageShell } from "@/components/public-page-shell";
import { getPpdbList } from "@/services/public-api";

export const metadata = {
  title: "PPDB",
};

export default async function PpdbPage() {
  const ppdb = await getPpdbList();

  return (
    <PublicPageShell
      title="PPDB"
      description="Informasi penerimaan peserta didik baru, periode pendaftaran, dan jalur masuk SMK Nusantara Digital."
      emptyMessage="Belum ada informasi PPDB dari backend."
      items={ppdb.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.content,
        date: item.startDate,
        image: item.bannerUrl,
        badge: item.status ?? "PPDB",
      }))}
    />
  );
}

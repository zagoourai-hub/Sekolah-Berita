import { PublicPageShell } from "@/components/public-page-shell";
import { getAnnouncementList } from "@/services/public-api";

export const metadata = {
  title: "Pengumuman",
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncementList();

  return (
    <PublicPageShell
      title="Pengumuman"
      description="Informasi penting sekolah, jadwal administratif, dan pemberitahuan resmi untuk siswa serta orang tua."
      emptyMessage="Belum ada pengumuman dari backend."
      items={announcements.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.content,
        date: item.publishedAt ?? item.createdAt,
        badge: "Pengumuman",
      }))}
    />
  );
}

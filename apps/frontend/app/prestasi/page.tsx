import { PublicPageShell } from "@/components/public-page-shell";
import { getAchievementList } from "@/services/public-api";

export const metadata = {
  title: "Prestasi Sekolah",
};

export default async function AchievementsPage() {
  const achievements = await getAchievementList();

  return (
    <PublicPageShell
      title="Prestasi Sekolah"
      description="Capaian siswa, guru, tim, dan sekolah dalam bidang akademik, teknologi, serta kegiatan non-akademik."
      emptyMessage="Belum ada data prestasi dari backend."
      items={achievements.map((item) => ({
        id: item.id,
        title: item.title,
        description: [item.description, item.winner, item.level]
          .filter(Boolean)
          .join(" - "),
        date: item.achievementDate,
        image: item.imageUrl,
        badge: "Prestasi",
      }))}
    />
  );
}

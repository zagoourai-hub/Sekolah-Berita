import { PublicPageShell } from "@/components/public-page-shell";
import { getNewsList } from "@/services/public-api";

export const metadata = {
  title: "Berita Sekolah",
};

export default async function NewsPage() {
  const news = await getNewsList();

  return (
    <PublicPageShell
      title="Berita Sekolah"
      description="Kumpulan kabar terbaru, kegiatan, prestasi, dan informasi akademik dari sekolah."
      emptyMessage="Belum ada berita dari backend."
      items={news.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.excerpt,
        date: item.publishedAt ?? item.createdAt,
        image: item.thumbnail,
        href: `/berita/${item.slug}`,
        badge: item.category?.name ?? "Berita",
      }))}
    />
  );
}

import { PublicPageShell } from "@/components/public-page-shell";
import { getGalleryList } from "@/services/public-api";

export const metadata = {
  title: "Galeri Kegiatan",
};

export default async function GalleryPage() {
  const galleries = await getGalleryList();

  return (
    <PublicPageShell
      title="Galeri Kegiatan"
      description="Dokumentasi visual kegiatan belajar, kolaborasi industri, organisasi siswa, dan prestasi sekolah."
      emptyMessage="Belum ada galeri dari backend."
      items={galleries.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.imageUrl,
        badge: "Galeri",
      }))}
    />
  );
}

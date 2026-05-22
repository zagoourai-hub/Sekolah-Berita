import { PublicPageShell } from "@/components/public-page-shell";
import { getAgendaList } from "@/services/public-api";

export const metadata = {
  title: "Agenda Sekolah",
};

export default async function AgendaPage() {
  const agendas = await getAgendaList();

  return (
    <PublicPageShell
      title="Agenda Sekolah"
      description="Jadwal kegiatan, ujian, workshop, dan acara resmi sekolah yang akan datang."
      emptyMessage="Belum ada agenda dari backend."
      items={agendas.map((item) => ({
        id: item.id,
        title: item.title,
        description: [item.description, item.location]
          .filter(Boolean)
          .join(" - "),
        date: item.startDate,
        badge: "Agenda",
      }))}
    />
  );
}

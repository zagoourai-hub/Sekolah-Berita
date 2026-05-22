import { ChevronLeft, Sparkles, Target } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

export const metadata = {
  title: "Visi Misi",
};

export default function VisiMisiPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="bg-school-navy py-8 text-white">
        <div className="container-school">
          <Link
            href="/profil"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-secondary"
          >
            <ChevronLeft className="size-4" />
            Kembali ke profil
          </Link>

          <h1 className="text-3xl font-extrabold">Visi Misi</h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Arah, tujuan, dan nilai utama sekolah.
          </p>
        </div>
      </section>

      <section className="container-school grid gap-5 py-8 lg:grid-cols-2">
        <Card className="card-school">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <Target className="size-5" />
              </div>

              <h2 className="text-xl font-extrabold text-primary">Visi</h2>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              Menjadi sekolah vokasi unggulan yang membentuk lulusan
              berkarakter, berprestasi, dan berdaya saing digital di tingkat
              nasional maupun global.
            </p>
          </CardContent>
        </Card>

        <Card className="card-school">
          <CardContent className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid size-11 place-items-center rounded-full bg-info text-info-foreground">
                <Sparkles className="size-5" />
              </div>

              <h2 className="text-xl font-extrabold text-primary">Misi</h2>
            </div>

            <ul className="space-y-3 text-sm leading-7 text-muted-foreground">
              <li className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-secondary" />
                Menyelenggarakan pembelajaran vokasi yang relevan dengan
                kebutuhan industri dan perkembangan teknologi.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-secondary" />
                Menanamkan karakter disiplin, tanggung jawab, kolaborasi, dan
                integritas dalam setiap kegiatan sekolah.
              </li>

              <li className="flex gap-3">
                <span className="mt-2 size-2 shrink-0 rounded-full bg-secondary" />
                Mendorong budaya prestasi, inovasi, dan kreativitas siswa.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
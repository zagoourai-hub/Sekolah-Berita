import { ChevronLeft, BookOpen } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { defaultSchoolInfo } from "@/config/school";
import { getSettings } from "@/services/public-api";
import { schoolSetting } from "@/utils/portal";

export const metadata = {
  title: "Sejarah Sekolah",
};

export default async function SejarahPage() {
  const settings = await getSettings();
  const schoolName = schoolSetting(
    settings,
    "school_name",
    defaultSchoolInfo.name,
  );

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

          <h1 className="text-3xl font-extrabold">Sejarah Sekolah</h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Perjalanan {schoolName} membangun budaya belajar digital.
          </p>
        </div>
      </section>

      <section className="container-school py-8">
        <Card className="card-school">
          <CardContent className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-accent text-primary">
                <BookOpen className="size-6" />
              </div>

              <h2 className="text-2xl font-extrabold text-primary">
                Sejarah {schoolName}
              </h2>
            </div>

            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
              <p>
                {schoolName} lahir dari kebutuhan menghadirkan sekolah vokasi
                yang mampu menjawab perkembangan teknologi, industri kreatif,
                dan transformasi digital di Indonesia.
              </p>

              <p>
                Dalam perjalanannya, sekolah terus mengembangkan program
                pembelajaran berbasis proyek, kemitraan dengan industri, dan
                kegiatan siswa yang mendorong kreativitas, kepemimpinan, serta
                prestasi.
              </p>

              <p>
                Hari ini, {schoolName} terus tumbuh sebagai sekolah yang
                menggabungkan karakter, kompetensi, dan inovasi.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
import {
  ChevronLeft,
  Building2,
  GraduationCap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { defaultSchoolInfo } from "@/config/school";
import { getOrganisasiPublicList, getSettings } from "@/services/public-api";
import { schoolSetting } from "@/utils/portal";
import { formatDateTime } from "@/utils/format";

export const metadata = {
  title: "Struktur Organisasi",
};

export default async function StrukturOrganisasiPage() {
  const [settings, organisasiList] = await Promise.all([
    getSettings(),
    getOrganisasiPublicList(),
  ]);

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

          <h1 className="text-3xl font-extrabold">Struktur Organisasi</h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Struktur pengelola dan penanggung jawab utama {schoolName}.
          </p>
        </div>
      </section>

      <section className="container-school py-8">
        <Card className="card-school">
          <CardContent className="p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <Building2 className="size-6" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-primary">
                  Struktur Organisasi {schoolName}
                </h2>

                <p className="text-sm text-muted-foreground">
                  Struktur organisasi ini terhubung langsung dengan data admin.
                </p>
              </div>
            </div>

            {organisasiList.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border bg-muted/30 p-6 text-center">
                <p className="font-semibold text-primary">
                  Belum ada data organisasi aktif
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tambahkan data organisasi dari halaman admin agar tampil di sini.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {organisasiList.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-border bg-card p-4 shadow-sm"
                  >
                    <div className="mb-4 flex items-start gap-4">
                      <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-accent">
                        {item.photoUrl ? (
                          <Image
                            src={item.photoUrl}
                            alt={item.name}
                            width={80}
                            height={80}
                            unoptimized
                            className="size-full object-cover"
                          />
                        ) : (
                          <GraduationCap className="size-8 text-primary" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-extrabold text-primary">
                          {item.position}
                        </h3>

                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.name}
                        </p>
                        <div className="mt-2 flex flex-col  gap-1 text-[10px] italic font-sans  text-muted-foreground">
                          <p>Dibuat : {formatDateTime(item.createdAt)}</p>
                          <p>Diubah : {formatDateTime(item.updatedAt)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

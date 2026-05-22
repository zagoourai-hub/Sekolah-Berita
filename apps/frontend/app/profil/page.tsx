import {
  ChevronLeft,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  Target,
  Building2,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { defaultSchoolInfo } from "@/config/school";
import { getSettings } from "@/services/public-api";
import { schoolSetting } from "@/utils/portal";

export const metadata = {
  title: "Profil Sekolah",
};

export default async function ProfilePage() {
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
            href="/"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-secondary"
          >
            <ChevronLeft className="size-4" />
            Kembali ke beranda
          </Link>

          <h1 className="text-3xl font-extrabold">Profil Sekolah</h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Identitas singkat dan informasi utama {schoolName}.
          </p>
        </div>
      </section>

      <section className="container-school grid gap-5 py-8 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="card-school">
          <CardContent className="p-6 md:p-8">
            <div className="mb-5 flex items-center gap-4">
              <div className="grid size-14 place-items-center rounded-full bg-secondary text-secondary-foreground">
                <GraduationCap className="size-7" />
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-primary">
                  {schoolName}
                </h2>

                <p className="text-sm font-semibold text-muted-foreground">
                  {schoolSetting(
                    settings,
                    "school_tagline",
                    defaultSchoolInfo.tagline,
                  )}
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-muted-foreground">
              Portal ini menampilkan berita sekolah, pengumuman, agenda,
              prestasi, galeri kegiatan, dan informasi PPDB yang dikelola dari
              backend sekolah.
            </p>
          </CardContent>
        </Card>

        <Card className="card-school">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-extrabold text-primary">
              Informasi Kontak
            </h2>

            <p className="flex gap-3 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" />
              {schoolSetting(
                settings,
                "school_address",
                defaultSchoolInfo.address,
              )}
            </p>

            <p className="flex gap-3 text-sm text-muted-foreground">
              <Phone className="mt-0.5 size-4 shrink-0 text-secondary" />
              {schoolSetting(
                settings,
                "school_phone",
                defaultSchoolInfo.phone,
              )}
            </p>

            <p className="flex gap-3 text-sm text-muted-foreground">
              <Mail className="mt-0.5 size-4 shrink-0 text-secondary" />
              {schoolSetting(
                settings,
                "school_email",
                defaultSchoolInfo.email,
              )}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="container-school grid gap-5 pb-8 md:grid-cols-3">
        <ProfileMenuCard
          href="/profil/sejarah"
          title="Sejarah Sekolah"
          description="Lihat perjalanan dan perkembangan sekolah."
          icon={BookOpen}
        />

        <ProfileMenuCard
          href="/profil/visi-misi"
          title="Visi Misi"
          description="Lihat arah, tujuan, dan nilai utama sekolah."
          icon={Target}
        />

        <ProfileMenuCard
          href="/profil/struktur-organisasi"
          title="Struktur Organisasi"
          description="Lihat struktur pengelola sekolah."
          icon={Building2}
        />
      </section>
    </main>
  );
}

type ProfileMenuCardProps = {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
};

function ProfileMenuCard({
  href,
  title,
  description,
  icon: Icon,
}: ProfileMenuCardProps) {
  return (
    <Link href={href}>
      <Card className="card-school h-full transition hover:-translate-y-1 hover:shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 grid size-12 place-items-center rounded-full bg-accent text-primary">
            <Icon className="size-6" />
          </div>

          <h2 className="text-lg font-extrabold text-primary">{title}</h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

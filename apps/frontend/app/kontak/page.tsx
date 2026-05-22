import { ChevronLeft, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { defaultSchoolInfo } from "@/config/school";
import { getSettings } from "@/services/public-api";
import { schoolSetting } from "@/utils/portal";

export const metadata = {
  title: "Kontak Sekolah",
};

export default async function ContactPage() {
  const settings = await getSettings();

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
          <h1 className="text-3xl font-extrabold">Kontak Sekolah</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            Hubungi SMK Nusantara Digital untuk informasi akademik, PPDB, dan
            kerja sama.
          </p>
        </div>
      </section>

      <section className="container-school grid gap-5 py-8 md:grid-cols-3">
        <Card className="card-school">
          <CardContent className="p-6">
            <MapPin className="mb-4 size-7 text-secondary" />
            <h2 className="text-lg font-extrabold text-primary">Alamat</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {schoolSetting(settings, "school_address", defaultSchoolInfo.address)}
            </p>
          </CardContent>
        </Card>
        <Card className="card-school">
          <CardContent className="p-6">
            <Phone className="mb-4 size-7 text-secondary" />
            <h2 className="text-lg font-extrabold text-primary">Telepon</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {schoolSetting(settings, "school_phone", defaultSchoolInfo.phone)}
            </p>
          </CardContent>
        </Card>
        <Card className="card-school">
          <CardContent className="p-6">
            <Mail className="mb-4 size-7 text-secondary" />
            <h2 className="text-lg font-extrabold text-primary">Email</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {schoolSetting(settings, "school_email", defaultSchoolInfo.email)}
            </p>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

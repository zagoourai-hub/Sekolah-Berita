import {
  CalendarDays,
  ChevronLeft,
  GraduationCap,
  Megaphone,
  Search,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { searchContent } from "@/services/public-api";
import { formatDate, stripHtml } from "@/utils/format";

type SearchPageProps = {
  searchParams: Promise<{ q?: string | string[] }>;
};

function getQuery(value?: string | string[]) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = getQuery((await searchParams).q);
  const result = await searchContent(query);
  const total =
    (result.news?.length ?? 0) +
    (result.announcements?.length ?? 0) +
    (result.agendas?.length ?? 0) +
    (result.achievements?.length ?? 0);

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
          <h1 className="text-3xl font-extrabold">Hasil Pencarian</h1>
          <p className="mt-2 text-white/75">
            {query
              ? `${total} hasil ditemukan untuk "${query}"`
              : "Masukkan kata kunci berita, pengumuman, agenda, atau prestasi."}
          </p>
          <form action="/search" className="mt-6 flex max-w-2xl">
            <Input
              name="q"
              defaultValue={query}
              placeholder="Cari berita, pengumuman, agenda..."
              className="h-12 rounded-r-none border-white/20 bg-white text-foreground"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center gap-2 rounded-r-lg bg-secondary px-5 text-sm font-bold text-secondary-foreground"
            >
              <Search className="size-4" />
              Cari
            </button>
          </form>
        </div>
      </section>

      <section className="container-school py-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {result.news?.map((item) => (
            <Link key={item.id} href={`/berita/${item.slug}`}>
              <Card className="card-school h-full">
                <CardContent className="p-5">
                  <Badge className="news-badge badge-kegiatan border-0">
                    Berita
                  </Badge>
                  <h2 className="mt-3 text-xl font-extrabold text-primary">
                    {item.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                    {stripHtml(item.excerpt)}
                  </p>
                  <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <CalendarDays className="size-4" />
                    {formatDate(item.publishedAt ?? item.createdAt)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}

          {result.announcements?.map((item) => (
            <Card key={item.id} className="card-school">
              <CardContent className="p-5">
                <Badge className="news-badge badge-pengumuman border-0">
                  Pengumuman
                </Badge>
                <h2 className="mt-3 flex gap-2 text-xl font-extrabold text-primary">
                  <Megaphone className="mt-1 size-5 shrink-0 text-secondary" />
                  {item.title}
                </h2>
                <p className="mt-4 text-xs text-muted-foreground">
                  {formatDate(item.publishedAt ?? item.createdAt)}
                </p>
              </CardContent>
            </Card>
          ))}

          {result.achievements?.map((item) => (
            <Card key={item.id} className="card-school">
              <CardContent className="p-5">
                <Badge className="news-badge badge-prestasi border-0">
                  Prestasi
                </Badge>
                <h2 className="mt-3 flex gap-2 text-xl font-extrabold text-primary">
                  <GraduationCap className="mt-1 size-5 shrink-0 text-secondary" />
                  {item.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {query && total === 0 && (
          <Card className="card-school">
            <CardContent className="p-8 text-center">
              <p className="text-lg font-bold text-primary">
                Belum ada hasil yang cocok.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Coba gunakan kata kunci yang lebih umum.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  );
}

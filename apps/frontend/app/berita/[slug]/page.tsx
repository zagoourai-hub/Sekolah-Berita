import { CalendarDays, ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getNewsDetail } from "@/services/public-api";
import { formatDate, stripHtml } from "@/utils/format";
import { heroImageStyle } from "@/utils/portal";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

  if (!news) {
    return (
      <main className="min-h-screen bg-background">
        <section className="container-school py-10">
          <Link
            href="/berita"
            className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary-foreground"
          >
            <ChevronLeft className="size-4" />
            Kembali ke berita
          </Link>
          <Card className="card-school">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-extrabold text-primary">
                Berita tidak ditemukan.
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Data berita belum tersedia dari backend atau slug sudah berubah.
              </p>
            </CardContent>
          </Card>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <article>
        <section
          className="bg-school-navy bg-cover bg-center py-10 text-white"
          style={heroImageStyle(news.thumbnail)}
        >
          <div className="container-school">
            <Link
              href="/berita"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-secondary"
            >
              <ChevronLeft className="size-4" />
              Kembali ke berita
            </Link>
            <Badge className="news-badge badge-kegiatan border-0">
              {news.category?.name ?? "Berita"}
            </Badge>
            <h1 className="mt-4 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
              {news.title}
            </h1>
            <p className="mt-4 flex items-center gap-2 text-sm text-white/75">
              <CalendarDays className="size-4" />
              {formatDate(news.publishedAt ?? news.createdAt)}
            </p>
          </div>
        </section>

        <section className="container-school py-8">
          <Card className="card-school">
            <CardContent className="p-6 md:p-8">
              {news.excerpt && (
                <p className="mb-6 text-lg font-semibold leading-8 text-primary">
                  {stripHtml(news.excerpt)}
                </p>
              )}
              <div className="space-y-4 text-sm leading-7 text-muted-foreground md:text-base">
                {stripHtml(news.content ?? news.excerpt)
                  .split("\n")
                  .filter(Boolean)
                  .map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </article>
    </main>
  );
}

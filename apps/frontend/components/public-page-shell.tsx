import { CalendarDays, ChevronLeft, GraduationCap } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate, stripHtml } from "@/utils/format";
import { imageStyle } from "@/utils/portal";

export type PublicCardItem = {
  id: string;
  title: string;
  description?: string | null;
  date?: string | null;
  image?: string | null;
  href?: string;
  badge?: string;
};

export function PublicPageShell({
  title,
  description,
  items,
  emptyMessage,
}: {
  title: string;
  description: string;
  items: PublicCardItem[];
  emptyMessage: string;
}) {
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
          <h1 className="text-3xl font-extrabold">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">
            {description}
          </p>
        </div>
      </section>

      <section className="container-school py-8">
        {items.length === 0 ? (
          <Card className="card-school">
            <CardContent className="p-8 text-center">
              <GraduationCap className="mx-auto mb-3 size-10 text-secondary" />
              <p className="font-bold text-primary">{emptyMessage}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Tambahkan data dari backend/admin agar halaman ini terisi.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => {
              const content = (
                <Card className="card-school h-full gap-0 p-0">
                  <div
                    className="h-44 rounded-t-xl bg-cover bg-center"
                    style={imageStyle(item.image)}
                  />
                  <CardContent className="p-5">
                    {item.badge && (
                      <Badge className="news-badge badge-kegiatan border-0">
                        {item.badge}
                      </Badge>
                    )}
                    <h2 className="mt-3 line-clamp-2 text-xl font-extrabold text-primary">
                      {item.title}
                    </h2>
                    {item.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                        {stripHtml(item.description)}
                      </p>
                    )}
                    {item.date && (
                      <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <CalendarDays className="size-4" />
                        {formatDate(item.date)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              );

              return item.href ? (
                <Link key={item.id} href={item.href}>
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

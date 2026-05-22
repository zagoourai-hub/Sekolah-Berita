"use client";

import { CalendarDays } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { NewsItem } from "@/types/school";
import { formatDate, stripHtml } from "@/utils/format";

import { getNewsImage, imageStyle, newsHref } from "./portal-home.helpers";
import { CategoryBadge, EmptyState, SectionHeading } from "./portal-shared";

type PortalLatestNewsProps = {
  items: NewsItem[];
};

export function PortalLatestNews({ items }: PortalLatestNewsProps) {
  return (
    <section className="mt-8" id="berita">
      <SectionHeading title="Berita Terbaru" href="/berita" />

      {items.length === 0 ? (
        <EmptyState message="Belum ada berita terbaru dari backend." />
      ) : null}

      <div className="grid gap-5 md:grid-cols-3">
        {items.slice(0, 3).map((item) => (
          <Link key={item.id} href={newsHref(item)}>
            <Card className="card-school h-full gap-0 p-0">
              <div
                className="relative h-44 rounded-t-xl bg-cover bg-center"
                style={imageStyle(getNewsImage(item))}
              >
                <div className="absolute bottom-3 left-3">
                  <CategoryBadge name={item.category?.name} />
                </div>
              </div>

              <CardContent className="flex flex-1 flex-col p-4">
                <h3 className="line-clamp-2 text-lg font-extrabold leading-tight">
                  {item.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {stripHtml(item.excerpt)}
                </p>

                <span className="mt-auto flex items-center gap-2 pt-4 text-xs text-muted-foreground">
                  <CalendarDays className="size-4" />
                  {formatDate(item.publishedAt ?? item.createdAt)}
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

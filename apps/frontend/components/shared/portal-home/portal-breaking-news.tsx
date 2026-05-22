"use client";

import { ChevronRight, Flame } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { NewsItem } from "@/types/school";

type PortalBreakingNewsProps = {
  items: NewsItem[];
};

export function PortalBreakingNews({ items }: PortalBreakingNewsProps) {
  const marqueeText =
    "Siswa SMK Sawit Raih Juara 1 Lomba Web Design Tingkat Kota / SMK Sawit Ikuti Pameran Pendidikan & Teknologi 2026";
  const text =
    items.length > 0 ? marqueeText : "Belum ada breaking news dari backend.";
  const copies = items.length > 0 ? [0, 1, 2] : [0];

  return (
    <section className="bg-card py-2.5 md:py-3">
      <div className="container-school">
        <div className="flex h-9 overflow-hidden rounded-lg border border-border bg-secondary text-xs shadow-sm md:h-auto md:text-sm">
          <div className="flex shrink-0 items-center gap-1.5 bg-news-breaking px-3 py-2 font-bold uppercase text-news-breaking-foreground md:gap-2 md:px-4">
            <Flame className="size-3.5 md:size-4" />
            Breaking News
          </div>

          <div className="relative flex min-w-0 flex-1 items-center overflow-hidden px-4 font-semibold text-secondary-foreground">
            <div className="breaking-news-mask">
              <div
                className={`breaking-news-marquee ${items.length === 0 ? "opacity-80" : ""}`}
                data-empty={items.length === 0 ? "true" : "false"}
              >
                {copies.map((copy) => (
                  <span
                    key={copy}
                    className="breaking-news-marquee-item"
                    aria-hidden={copy > 0}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-1 px-2 md:flex">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-7 bg-card/70"
              aria-label="Berita sebelumnya"
            >
              <ChevronRight className="size-3 rotate-180" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-7 bg-card/70"
              aria-label="Berita berikutnya"
            >
              <ChevronRight className="size-3" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

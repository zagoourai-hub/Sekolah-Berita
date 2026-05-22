"use client";

import { CalendarDays } from "lucide-react";
import Link from "next/link";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { NewsItem } from "@/types/school";
import { formatDate, stripHtml } from "@/utils/format";

import { getNewsImage, imageStyle, newsHref } from "./portal-home.helpers";
import { CategoryBadge } from "./portal-shared";


type PortalHeroNewsProps = {
  featured: NewsItem[];
};

export function PortalHeroNews({ featured }: PortalHeroNewsProps) {
  const [main, ...smallItems] = featured;

  if (!main) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-[18px] border border-dashed border-border bg-card p-6 text-center md:min-h-[320px]">
        <div>
          <h1 className="text-xl font-extrabold text-primary md:text-2xl">
            Belum ada berita utama
          </h1>

          <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Tambahkan berita berstatus published dan featured dari admin/backend
            agar hero portal terisi.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="w-full min-w-0">
      {/* Mobile carousel */}
      <div className="block md:hidden">
        <Carousel
          className="w-full overflow-hidden"
          opts={{
            loop: true,
            align: "start",
          }}
        >
          <CarouselContent className="-ml-0">
            {featured.slice(0, 4).map((item) => (
              <CarouselItem key={item.id} className="basis-full pl-0">
                <HeroCard item={item} large />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-3 flex items-center justify-center gap-2">
          {featured.slice(0, 4).map((item, index) => (
            <span
              key={item.id}
              className={[
                "rounded-full transition-all",
                index === 0
                  ? "h-2 w-2 bg-secondary"
                  : "h-2 w-2 bg-muted-foreground/25",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Desktop / tablet layout */}
      <div className="hidden gap-4 md:grid lg:grid-cols-[1.45fr_0.8fr]">
        <HeroCard item={main} large />

        <div className="grid grid-rows-3 gap-4">
          {smallItems.slice(0, 3).map((item) => (
            <HeroCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

type HeroCardProps = {
  item: NewsItem;
  large?: boolean;
};
function HeroCard({ item, large = false }: HeroCardProps) {
  return (
    <Link
      href={newsHref(item)}
      className={[
        "group relative flex w-full min-w-0 flex-col overflow-hidden bg-cover bg-center",
        "border border-white/10 shadow-[0_10px_30px_rgba(15,23,42,0.16)]",
        large
          ? "min-h-[240px] rounded-none md:min-h-[360px] lg:min-h-[430px]"
          : "min-h-[132px] rounded-none",
      ].join(" ")}
      style={imageStyle(getNewsImage(item))}
    >
      {/* Overlay gelap agar teks tetap terbaca di atas gambar */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/5" />

      <div className="relative mt-auto flex w-full min-w-0 flex-col gap-2 p-4 text-white md:gap-3 md:p-5">
        <CategoryBadge name={item.category?.name} />

        <h1
          className={[
            "line-clamp-3 max-w-full break-words font-extrabold leading-tight tracking-[-0.02em]",
            "whitespace-normal group-hover:text-secondary",
            large ? "text-[19px] md:text-3xl" : "text-base",
          ].join(" ")}
        >
          {item.title}
        </h1>

        {large ? (
          <p className="line-clamp-2 max-w-[95%] text-[12px] leading-5 text-white/90 md:max-w-2xl md:text-sm md:leading-6">
            {stripHtml(item.excerpt)}
          </p>
        ) : null}

        <span className="mt-1 flex items-center gap-2 text-[11px] font-medium text-white/90 md:text-xs">
          <CalendarDays className="size-3.5 shrink-0 md:size-4" />
          {formatDate(item.publishedAt ?? item.createdAt)}
        </span>
      </div>
    </Link>
  );
}

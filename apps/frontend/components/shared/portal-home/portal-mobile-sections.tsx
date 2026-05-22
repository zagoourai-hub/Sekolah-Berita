"use client";

import { CalendarDays, ChevronRight } from "lucide-react";
import Link from "next/link";

import type { HomeData, NewsItem } from "@/types/school";
import { formatDate, stripHtml } from "@/utils/format";

import { defaultSchoolInfo, mobileActionItems, shortcutItems } from "./portal-home.data";
import { getNewsImage, imageStyle, newsHref, schoolSetting } from "./portal-home.helpers";
import { CategoryBadge, EmptyState, LogoMark, SectionHeading } from "./portal-shared";

type PortalMobileShortcutsProps = {
  className?: string;
};

export function PortalMobileShortcuts({ className }: PortalMobileShortcutsProps) {
  return (
    <section
      className={`mt-5 grid w-full grid-cols-4 gap-2 rounded-xl bg-card p-2 shadow-sm ring-1 ring-border lg:hidden ${className ?? ""}`}
    >
      {shortcutItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-card px-1.5 py-3 text-center text-card-foreground"
        >
          <item.icon className="size-5 text-primary" />
          <span className="max-w-full truncate text-[10px] font-bold">
            {item.label}
          </span>
        </Link>
      ))}
    </section>
  );
}

type PortalMobileLatestListProps = {
  items: NewsItem[];
};

export function PortalMobileLatestList({ items }: PortalMobileLatestListProps) {
  return (
    <section className="container-school mt-5 lg:hidden">
      <SectionHeading title="Berita Terbaru" href="/berita" />

      {items.length === 0 ? (
        <EmptyState message="Belum ada berita terbaru dari backend." />
      ) : null}

      <div className="space-y-3">
        {items.slice(0, 3).map((item) => (
          <Link key={item.id} href={newsHref(item)} className="flex gap-3">
            <div
              className="aspect-3/2 w-24 shrink-0 rounded-none bg-cover bg-center"
              style={imageStyle(getNewsImage(item))}
            />

            <div className="min-w-0">
              <CategoryBadge name={item.category?.name} />
              <p className="mt-1.5 line-clamp-2 text-[13px] font-extrabold leading-snug">
                {item.title}
              </p>
              <p className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                {stripHtml(item.excerpt)}
              </p>
              <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3" />
                {formatDate(item.publishedAt ?? item.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PortalMobileActionList() {
  return (
    <section className="container-school mt-5 space-y-2.5 lg:hidden">
      {mobileActionItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-sm font-bold shadow-sm"
        >
          <span className="flex items-center gap-3">
            <item.icon className="size-5 text-secondary" />
            {item.label}
          </span>
          <ChevronRight className="size-4 text-muted-foreground" />
        </Link>
      ))}
    </section>
  );
}

type PortalMobileFooterCardProps = {
  settings: HomeData["settings"];
};

export function PortalMobileFooterCard({ settings }: PortalMobileFooterCardProps) {
  const schoolName = schoolSetting(
    settings,
    "school_name",
    defaultSchoolInfo.name,
  );

  return (
    <section className="container-school mb-6 mt-5 lg:hidden">
      <div className="rounded-xl bg-school-navy p-4 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <h2 className="font-extrabold">
              {schoolName || "Portal Sekolah"}
            </h2>
            <p className="text-xs text-white/70">
              {schoolSetting(
                settings,
                "school_tagline",
                defaultSchoolInfo.tagline,
              )}
            </p>
          </div>
        </div>

        <Link
          href="/ppdb"
          className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-secondary text-sm font-bold text-secondary-foreground hover:bg-secondary/90"
        >
          PPDB Online
          <ChevronRight className="size-4" />
        </Link>

        <p className="mt-4 text-center text-xs text-white/60">
          (c) 2026 {schoolName || "Portal Sekolah"}.
        </p>
      </div>
    </section>
  );
}

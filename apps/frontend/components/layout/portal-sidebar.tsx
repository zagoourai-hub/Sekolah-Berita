"use client";

import {
  Bell,
  Calendar,
  ChevronRight,
  Clock,
  Flame,
  Link as LinkIcon,
  Megaphone,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import type {
  Agenda,
  AnnouncementItem,
  HomeData,
  NewsItem,
} from "@/types/school";

import { EmptyState } from "@/components/shared/portal-home/portal-shared";
import { announcementHref, getNewsImage, imageStyle, newsHref } from "@/components/shared/portal-home/portal-home.helpers";
import { quickLinks } from "@/components/shared/portal-home/portal-home.data";
import { formatAgendaDay, formatDate } from "@/utils/format";



type PopularNewsProps = {
  items: NewsItem[];
};

function PopularNews({ items }: PopularNewsProps) {
  return (
    <Card className="card-school gap-0 p-0" id="populer">
      <CardContent className="p-4">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-primary">
          <Flame className="size-5 text-news-breaking" />
          Berita Populer
        </h2>

        {items.length === 0 ? (
          <EmptyState message="Belum ada berita populer dari backend." />
        ) : null}

        <div className="space-y-4">
          {items.slice(0, 5).map((item, index) => (
            <Link key={item.id} href={newsHref(item)} className="flex gap-3">
              <div
                className="relative h-16 w-24 shrink-0 rounded-none bg-cover bg-center"
                style={imageStyle(getNewsImage(item))}
              >
                <span className="absolute -left-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-secondary text-xs font-bold text-secondary-foreground">
                  {index + 1}
                </span>
              </div>

              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-bold leading-snug hover:text-primary">
                  {item.title}
                </p>

                <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {formatDate(item.publishedAt ?? item.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type AnnouncementPanelProps = {
  items: AnnouncementItem[];
};

function AnnouncementPanel({ items }: AnnouncementPanelProps) {
  return (
    <Card className="card-school gap-0 p-0" id="pengumuman">
      <CardContent className="p-4">
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary">
          <Megaphone className="size-5 text-info" />
          Pengumuman Penting
        </h2>

        {items.length === 0 ? (
          <EmptyState message="Belum ada pengumuman penting dari backend." />
        ) : null}

        <div className="space-y-4">
          {items.slice(0, 3).map((item) => (
            <Link
              key={item.id}
              href={announcementHref()}
              className="flex gap-3"
            >
              <Bell className="mt-1 size-4 shrink-0 text-secondary" />

              <div>
                <p className="line-clamp-2 text-sm font-bold leading-snug">
                  {item.title}
                </p>

                <span className="text-xs text-muted-foreground">
                  {formatDate(item.publishedAt ?? item.createdAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Link
          href="/pengumuman"
          className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-primary"
        >
          Lihat semua pengumuman
          <ChevronRight className="size-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

type SidebarAgendaProps = {
  items: Agenda[];
};

function SidebarAgenda({ items }: SidebarAgendaProps) {
  return (
    <Card className="card-school gap-0 p-0" id="agenda-sidebar">
      <CardContent className="p-4">
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary">
          <Calendar className="size-5 text-secondary" />
          Agenda Terdekat
        </h2>

        {items.length === 0 ? (
          <EmptyState message="Belum ada agenda terdekat dari backend." />
        ) : null}

        <div className="space-y-3">
          {items.slice(0, 3).map((item) => {
            const date = formatAgendaDay(item.startDate);

            return (
              <Link key={item.id} href="/agenda" className="flex gap-3">
                <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-muted text-primary">
                  <span className="text-lg font-black leading-none">
                    {date.day}
                  </span>

                  <span className="text-[10px] font-bold">{date.month}</span>
                </div>

                <div>
                  <p className="line-clamp-2 text-sm font-bold leading-snug">
                    {item.title}
                  </p>

                  <span className="text-xs text-muted-foreground">
                    {formatDate(item.startDate)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/agenda"
          className="mt-4 flex items-center justify-center gap-1 text-xs font-semibold text-primary"
        >
          Lihat semua agenda
          <ChevronRight className="size-3" />
        </Link>
      </CardContent>
    </Card>
  );
}

function QuickLinks() {
  return (
    <Card className="card-school gap-0 p-0">
      <CardContent className="p-4">
        <h2 className="mb-4 flex items-center gap-2 text-base font-bold text-primary">
          <LinkIcon className="size-5 text-secondary" />
          Link Cepat
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-2 text-xs font-semibold text-foreground hover:text-primary"
            >
              <item.icon className="size-4 text-primary" />
              {item.label}
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type PortalSidebarProps = {
  data: HomeData;
};

export function PortalSidebar({ data }: PortalSidebarProps) {
  return (
    <aside className="hidden space-y-5 lg:block">
      <PopularNews items={data.popularNews} />
      <AnnouncementPanel items={data.announcements} />
      <SidebarAgenda items={data.agendas} />
      <QuickLinks />
    </aside>
  );
}

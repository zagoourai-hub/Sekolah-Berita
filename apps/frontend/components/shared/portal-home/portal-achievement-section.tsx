"use client";

import { Medal, Trophy } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { Galeri, Prestasi } from "@/types/school";

import {
  getGalleryImage,
  getStringField,
  imageStyle,
} from "./portal-home.helpers";
import { EmptyState, SectionHeading } from "./portal-shared";

type PortalAchievementSectionProps = {
  items: Prestasi[];
  galleries: Galeri[];
};

function achievementImage(item: Prestasi) {
  return getStringField(item, "imageUrl") || getStringField(item, "image");
}

function achievementDate(item: Prestasi) {
  return getStringField(item, "achievementDate") || getStringField(item, "date");
}

export function PortalAchievementSection({
  items,
  galleries,
}: PortalAchievementSectionProps) {
  return (
    <Card className="card-school gap-0 p-0" id="prestasi">
      <CardContent className="p-4">
        <SectionHeading title="Prestasi Sekolah" href="/prestasi" />

        {items.length === 0 ? (
          <EmptyState message="Belum ada prestasi sekolah dari backend." />
        ) : null}

        <div className="grid gap-3 md:grid-cols-[1fr_1fr_1.4fr]">
          {items.slice(0, 2).map((item, index) => (
            <Link
              key={item.id}
              href="/prestasi"
              className="rounded-lg border border-border bg-background p-4 text-center shadow-sm transition hover:border-secondary"
            >
              {achievementImage(item) ? (
                <div
                  className="mx-auto mb-3 size-12 rounded-full bg-cover bg-center"
                  style={imageStyle(achievementImage(item))}
                />
              ) : index === 0 ? (
                <Trophy className="mx-auto mb-3 size-10 text-secondary" />
              ) : (
                <Medal className="mx-auto mb-3 size-10 text-info" />
              )}

              <p className="line-clamp-2 text-sm font-extrabold">{item.title}</p>
              <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                {item.winner || item.description || achievementDate(item)}
              </p>
            </Link>
          ))}

          <Link href="/galeri" className="grid grid-cols-2 gap-2">
            {galleries.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="min-h-20 rounded-lg bg-cover bg-center"
                style={imageStyle(getGalleryImage(item))}
                aria-label={item.title}
              />
            ))}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

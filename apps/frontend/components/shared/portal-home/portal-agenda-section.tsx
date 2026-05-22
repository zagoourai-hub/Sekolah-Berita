"use client";

import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import type { Agenda } from "@/types/school";
import { formatAgendaDay, formatDate } from "@/utils/format";

import { EmptyState, SectionHeading } from "./portal-shared";

type PortalAgendaSectionProps = {
  items: Agenda[];
};

export function PortalAgendaSection({ items }: PortalAgendaSectionProps) {
  return (
    <Card className="card-school gap-0 p-0" id="agenda">
      <CardContent className="p-4">
        <SectionHeading title="Agenda Sekolah" href="/agenda" />

        {items.length === 0 ? (
          <EmptyState message="Belum ada agenda sekolah dari backend." />
        ) : null}

        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {items.slice(0, 4).map((item) => {
            const date = formatAgendaDay(item.startDate);

            return (
              <Link
                key={item.id}
                href="/agenda"
                className="rounded-lg border border-border bg-background p-3 text-center shadow-sm transition hover:border-secondary"
              >
                <div className="mx-auto mb-3 flex size-14 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xl font-black leading-none">
                    {date.day}
                  </span>
                  <span className="text-[10px] font-bold">{date.month}</span>
                </div>

                <p className="line-clamp-2 min-h-9 text-xs font-bold leading-tight">
                  {item.title}
                </p>

                <p className="mt-2 text-[11px] text-muted-foreground">
                  {formatDate(item.startDate)}
                </p>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

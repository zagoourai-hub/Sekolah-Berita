import { ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { categoryClass } from "./portal-home.helpers";

export function CategoryBadge({ name }: { name?: string | null }) {
  return (
    <Badge className={`news-badge border-0 ${categoryClass(name)}`}>
      {name || "Berita"}
    </Badge>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/40 p-5 text-center text-sm font-medium text-muted-foreground">
      {message}
    </div>
  );
}

export function LogoMark() {
  return (
    <Avatar className="size-14 border-4 border-secondary bg-primary shadow-md md:size-20">
      <AvatarFallback className="bg-primary text-primary-foreground">
        <GraduationCap className="size-8 md:size-11" />
      </AvatarFallback>
    </Avatar>
  );
}

type SectionHeadingProps = {
  title: string;
  action?: string;
  href: string;
};

export function SectionHeading({
  title,
  action = "Lihat semua",
  href,
}: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="section-title">{title}</h2>

      <Link
        href={href}
        className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-primary transition-colors hover:text-secondary md:text-xs"
      >
        {action}
        <ChevronRight className="size-3" />
      </Link>
    </div>
  );
}

import { Menu, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { HomeData } from "@/types/school";

import { defaultSchoolInfo } from "@/components/shared/portal-home/portal-home.data";
import { schoolSetting } from "@/components/shared/portal-home/portal-home.helpers";
import { LogoMark } from "@/components/shared/portal-home/portal-shared";

type PortalHeaderProps = {
  settings: HomeData["settings"];
  onMenuClick: () => void;
};

export function PortalHeader({ settings, onMenuClick }: PortalHeaderProps) {
  const schoolName = schoolSetting(
    settings,
    "school_name",
    defaultSchoolInfo.name,
  );

  const tagline = schoolSetting(
    settings,
    "school_tagline",
    defaultSchoolInfo.tagline,
  );

  return (
    <header className="bg-card text-card-foreground">
      <div className="container-school flex min-h-20 items-center justify-between gap-3 py-3 md:min-h-28 md:gap-4 md:py-4">
        <Link href="/" className="flex min-w-0 items-center gap-3 md:gap-4">
          <LogoMark />

          <div className="min-w-0">
            <p className="max-w-[220px] truncate text-[17px] font-extrabold text-primary md:max-w-none md:text-3xl">
              {schoolName}
            </p>
            <p className="mt-1 line-clamp-2 max-w-[220px] text-[11px] font-medium leading-4 text-muted-foreground md:max-w-none md:text-sm">
              {tagline}
            </p>
          </div>
        </Link>

        <form action="/search" className="hidden w-full max-w-lg items-center md:flex">
          <Input
            name="q"
            aria-label="Cari konten sekolah"
            placeholder="Cari berita, pengumuman, agenda..."
            className="h-12 rounded-r-none border-r-0 bg-background"
          />

          <Button
            type="submit"
            className="h-12 rounded-l-none bg-school-navy px-5 text-primary-foreground hover:bg-school-navy/90"
            aria-label="Cari"
          >
            <Search className="size-5" />
          </Button>
        </form>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="size-10 shrink-0 md:hidden"
          aria-label="Buka menu"
          onClick={onMenuClick}
        >
          <Menu className="size-6" />
        </Button>
      </div>
    </header>
  );
}

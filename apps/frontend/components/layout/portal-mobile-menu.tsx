"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { HomeData } from "@/types/school";
import { schoolSetting } from "@/components/shared/portal-home/portal-home.helpers";
import {
  defaultSchoolInfo,
  navItems,
} from "@/components/shared/portal-home/portal-home.data";

type PortalMobileMenuProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  settings: HomeData["settings"];
};

type MobileNavChild = {
  label: string;
  href: string;
};

type MobileNavItem = {
  label: string;
  href: string;
  children?: MobileNavChild[];
};

export function PortalMobileMenu({
  open,
  onOpenChange,
  settings,
}: PortalMobileMenuProps) {
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);

  const mobileNavItems = navItems as MobileNavItem[];

  function handleToggleSubmenu(label: string) {
    setOpenMenuLabel((currentLabel) =>
      currentLabel === label ? null : label,
    );
  }

  function handleCloseMenu() {
    setOpenMenuLabel(null);
    onOpenChange(false);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[86vw] bg-card p-0 text-card-foreground"
      >
        <SheetHeader className="border-b border-border p-4">
          <div className="flex items-center gap-3">
            <Avatar className="size-12 border-2 border-secondary bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground">
                <GraduationCap className="size-7" />
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 text-left">
              <SheetTitle className="truncate text-primary">
                {schoolSetting(settings, "school_name", defaultSchoolInfo.name)}
              </SheetTitle>

              <SheetDescription className="line-clamp-2 text-xs">
                {schoolSetting(
                  settings,
                  "school_tagline",
                  defaultSchoolInfo.tagline,
                )}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="flex flex-col px-4">
          {mobileNavItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenuLabel === item.label;

            if (hasChildren) {
              return (
                <div key={item.label} className="border-b border-border">
                  <button
                    type="button"
                    onClick={() => handleToggleSubmenu(item.label)}
                    className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-primary"
                    aria-expanded={isOpen}
                  >
                    <span>{item.label}</span>

                    <ChevronRight
                      className={
                        isOpen
                          ? "size-4 rotate-90 text-muted-foreground transition-transform"
                          : "size-4 text-muted-foreground transition-transform"
                      }
                    />
                  </button>

                  {isOpen ? (
                    <div className="grid gap-1 pb-3 pl-3">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={handleCloseMenu}
                          className="rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleCloseMenu}
                className="flex items-center justify-between border-b border-border py-4 text-sm font-semibold text-primary"
              >
                {item.label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
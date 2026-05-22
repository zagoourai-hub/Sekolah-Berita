"use client";

import { navItems } from "@/components/shared/portal-home/portal-home.data";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Home } from "lucide-react";
import Link from "next/link";

export function PortalNavbar() {
  return (
    <nav className="hidden bg-primary md:block">
      <div className="container-school flex items-center">
        <NavigationMenu className="">
          <NavigationMenuList className="gap-0">
            {navItems.map((item) => {
              const hasDropdown = item.hasMenu && item.children?.length;

              if (hasDropdown) {
                return (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuTrigger
                      className={[
                        "h-12 rounded-none bg-transparent px-4 py-0",
                        "text-sm font-bold text-primary-foreground",
                        "hover:bg-secondary hover:text-secondary-foreground",
                        "focus:bg-secondary focus:text-secondary-foreground",
                        "data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground",
                      ].join(" ")}
                    >
                      {item.label}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="!rounded-none border border-border bg-card ">
                      <div className="grid w-60 gap-1 p-2">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-none px-3 py-2 text-sm font-semibold text-card-foreground hover:bg-muted hover:text-primary"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={item.label}>
                  <Link
                    href={item.href}
                    className={[
                      "flex h-12 items-center gap-2 rounded-none px-4 py-0",
                      "text-sm font-bold text-primary-foreground transition",
                      item.active
                        ? "bg-secondary text-secondary-foreground"
                        : "hover:bg-secondary hover:text-secondary-foreground",
                    ].join(" ")}
                  >
                    {item.label === "Beranda" ? (
                      <Home className="size-4" />
                    ) : null}

                    {item.label}
                  </Link>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
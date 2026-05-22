"use client";

import type { HomeData } from "@/types/school";
import { usePortalHome } from "@/hooks/use-portal-home";

import { PortalTopbar } from "./layout/portal-topbar";
import { PortalHeader } from "./layout/portal-header";
import { PortalNavbar } from "./layout/portal-navbar";
import { PortalMobileMenu } from "./layout/portal-mobile-menu";
import { PortalBreakingNews } from "@/components/shared/portal-home/portal-breaking-news";
import { PortalHeroNews } from "@/components/shared/portal-home/portal-hero-news";
import { PortalAgendaSection } from "@/components/shared/portal-home/portal-agenda-section";
import { PortalAchievementSection } from "@/components/shared/portal-home/portal-achievement-section";
import { PortalFooter } from "@/components/shared/portal-home/portal-footer";
import { PortalLatestNews } from "@/components/shared/portal-home/portal-latest-news";
import {
  PortalMobileActionList,
  PortalMobileFooterCard,
  PortalMobileLatestList,
  PortalMobileShortcuts,
} from "@/components/shared/portal-home/portal-mobile-sections";
import { PortalSidebar } from "./layout/portal-sidebar";

export function PortalHome({ data }: { data: HomeData }) {
  const { menuOpen, setMenuOpen, mobileNews } = usePortalHome(data);

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <PortalTopbar settings={data.settings} />

      <PortalHeader
        settings={data.settings}
        onMenuClick={() => setMenuOpen(true)}
      />

      <PortalNavbar />

      <PortalMobileMenu
        open={menuOpen}
        onOpenChange={setMenuOpen}
        settings={data.settings}
      />

      <PortalBreakingNews items={data.breakingNews} />

      <main>
        <section className="container-school py-3 md:py-5">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="min-w-0">
              <PortalHeroNews featured={data.featuredNews} />
              <PortalMobileShortcuts />

              <div className="hidden lg:block">
                <PortalLatestNews items={data.latestNews} />

                <div className="mt-8 grid gap-5 xl:grid-cols-2">
                  <PortalAgendaSection items={data.agendas} />

                  <PortalAchievementSection
                    items={data.achievements}
                    galleries={data.galleries}
                  />
                </div>
              </div>
            </div>

            <PortalSidebar data={data} />
          </div>
        </section>

        <PortalMobileLatestList items={mobileNews} />
        <PortalMobileActionList />

        <div className="container-school mt-6 grid gap-5 lg:hidden">
          <PortalAgendaSection items={data.agendas} />

          <PortalAchievementSection
            items={data.achievements}
            galleries={data.galleries}
          />
        </div>

        <PortalMobileFooterCard settings={data.settings} />
      </main>

      <div className="hidden lg:block">
        <PortalFooter settings={data.settings} />
      </div>
    </div>
  );
}

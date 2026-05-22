"use client";

import { ChevronRight, Send } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNewsletter } from "@/hooks/use-newsletter";
import type { HomeData } from "@/types/school";

import { defaultSchoolInfo, navItems } from "./portal-home.data";
import { schoolSetting } from "./portal-home.helpers";
import { LogoMark } from "./portal-shared";

type PortalFooterProps = {
  settings: HomeData["settings"];
};

function NewsletterCard() {
  const { message, pending, handleSubmit } = useNewsletter();

  return (
    <div>
      <h3 className="mb-2 font-bold">Newsletter</h3>
      <p className="mb-4 text-sm text-white/75">
        Dapatkan berita terbaru dari SMA Sawit.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex">
          <Input
            required
            type="email"
            name="email"
            placeholder="Masukkan email Anda"
            className="h-10 rounded-r-none border-white/20 bg-white text-foreground"
          />
          <Button
            type="submit"
            disabled={pending}
            className="h-10 rounded-l-none bg-secondary text-secondary-foreground hover:bg-secondary/90"
            aria-label="Kirim email newsletter"
          >
            <Send className="size-4" />
          </Button>
        </div>

        <Button
          type="submit"
          disabled={pending}
          className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          {pending ? "Mengirim..." : "Berlangganan"}
          <ChevronRight className="size-4" />
        </Button>
      </form>

      {message ? <p className="mt-3 text-xs text-white/75">{message}</p> : null}
    </div>
  );
}

export function PortalFooter({ settings }: PortalFooterProps) {
  return (
    <footer id="kontak" className="mt-8 bg-school-navy text-white">
      <div className="container-school grid gap-8 py-8 md:grid-cols-[1.25fr_1fr_1fr_1.2fr]">
        <div className="flex gap-4">
          <LogoMark />
          <div>
            <h2 className="text-lg font-extrabold">
              {schoolSetting(settings, "school_name", defaultSchoolInfo.name)}
            </h2>
            <p className="mt-1 text-sm text-white/75">
              {schoolSetting(settings, "school_tagline", defaultSchoolInfo.tagline)}
            </p>
            <div className="mt-4 space-y-2 text-xs text-white/70">
              <p>
                {schoolSetting(
                  settings,
                  "school_address",
                  defaultSchoolInfo.address,
                )}
              </p>
              <p>{schoolSetting(settings, "school_phone", defaultSchoolInfo.phone)}</p>
              <p>{schoolSetting(settings, "school_email", defaultSchoolInfo.email)}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Tautan Cepat</h3>
          <div className="grid grid-cols-2 gap-2">
            {navItems.slice(0, 8).map((item) => (
              <Link key={item.label} href={item.href} className="footer-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold">Informasi</h3>
          <div className="space-y-2">
            {[
              "Visi & Misi",
              "Struktur Organisasi",
              "Guru & Tenaga Kependidikan",
              "Fasilitas",
              "Ekstrakurikuler",
            ].map((item) => (
              <Link key={item} href="/profil" className="block footer-link">
                {item}
              </Link>
            ))}
          </div>
        </div>

        <NewsletterCard />
      </div>

      <div className="bg-secondary py-2 text-center text-xs font-semibold text-secondary-foreground">
        (c) 2026 SMK Nusantara Digital. All rights reserved.
      </div>
    </footer>
  );
}

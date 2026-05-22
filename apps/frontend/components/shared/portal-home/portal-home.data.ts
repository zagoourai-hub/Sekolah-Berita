import type { ElementType } from "react";

import {
  CalendarDays,
  Camera,
  Flame,
  GraduationCap,
  Megaphone,
  Newspaper,
  Trophy,
} from "lucide-react";

export type LocalNavItem = {
  label: string;
  href: string;
  active?: boolean;
  hasMenu?: boolean;
   children?: LocalNavChildItem[];
};

export type LocalNavChildItem = {
  label: string;
  href: string;
};

export type LocalActionItem = {
  label: string;
  href: string;
  icon: ElementType;
};

export const defaultSchoolInfo = {
  name: "",
  tagline: "Sekolah digital, kreatif, dan berprestasi",
  phone: "0812-3456-7890",
  email: "info@smasawit.ac.id",
  address: "Jl. Pendidikan No. 1, Indonesia, Jawa Barat",
};

export const navItems: LocalNavItem[] = [
  { label: "Beranda", href: "/", active: true },
  { label: "Profil", 
    href: "/profil",
     hasMenu: true,
     children: [
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi Misi", href: "/profil/visi-misi" },
      { label: "Struktur Organisasi", href: "/profil/organisasi" },
      { label: "Admin", href: "/admin" },
    ],
  },
  { label: "Berita", href: "/berita" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Agenda", href: "/agenda" },
  { label: "Prestasi", href: "/prestasi" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Kontak", href: "/kontak" },
];

export const quickLinks: LocalActionItem[] = [
  { label: "PPDB Online", href: "/ppdb", icon: GraduationCap },
  { label: "Pengumuman", href: "/pengumuman", icon: Megaphone },
  { label: "Agenda", href: "/agenda", icon: CalendarDays },
  { label: "Galeri", href: "/galeri", icon: Camera },
];

export const shortcutItems: LocalActionItem[] = [
  { label: "Berita", href: "/berita", icon: Newspaper },
  { label: "Pengumuman", href: "/pengumuman", icon: Megaphone },
  { label: "Agenda", href: "/agenda", icon: CalendarDays },
  { label: "PPDB", href: "/ppdb", icon: GraduationCap },
];

export const mobileActionItems: LocalActionItem[] = [
  { label: "Pengumuman Penting", href: "/pengumuman", icon: Megaphone },
  { label: "Agenda Terdekat", href: "/agenda", icon: CalendarDays },
  { label: "Prestasi Sekolah", href: "/prestasi", icon: Trophy },
  { label: "Galeri Kegiatan", href: "/galeri", icon: Camera },
];

export const breakingFallbackIcon = Flame;

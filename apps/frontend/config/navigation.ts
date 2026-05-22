import {
  BookOpen,
  Calendar,
  CalendarDays,
  Camera,
  Download,
  GraduationCap,
  Megaphone,
  Newspaper,
  Trophy,
  UsersRound,
} from "lucide-react";

export const navItems = [
  { label: "Beranda", href: "/", active: true },
  { label: "Profil", href: "/profil", hasMenu: true },
  { label: "Berita", href: "/berita" },
  { label: "Pengumuman", href: "/pengumuman" },
  { label: "Prestasi", href: "/prestasi" },
  { label: "Agenda", href: "/agenda" },
  { label: "Galeri", href: "/galeri" },
  { label: "PPDB", href: "/ppdb" },
  { label: "Kontak", href: "/kontak" },
];

export const shortcutItems = [
  { label: "Berita", icon: Newspaper, href: "/berita" },
  { label: "Pengumuman", icon: Megaphone, href: "/pengumuman" },
  { label: "Agenda", icon: Calendar, href: "/agenda" },
  { label: "PPDB", icon: UsersRound, href: "/ppdb" },
];

export const quickLinks = [
  { label: "PPDB Online", icon: GraduationCap, href: "/ppdb" },
  { label: "Jadwal Pelajaran", icon: CalendarDays, href: "/agenda" },
  { label: "Perpustakaan Digital", icon: BookOpen, href: "/berita" },
  { label: "Unduh Formulir", icon: Download, href: "/ppdb" },
];

export const mobileActionItems = [
  { label: "Pengumuman Penting", icon: Megaphone, href: "/pengumuman" },
  { label: "Agenda Terdekat", icon: Calendar, href: "/agenda" },
  { label: "Prestasi Sekolah", icon: Trophy, href: "/prestasi" },
  { label: "Galeri Kegiatan", icon: Camera, href: "/galeri" },
];

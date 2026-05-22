import {
  CalendarDays,
  FileText,
  FolderTree,
  GalleryVerticalEnd,
  Megaphone,
  Trophy,
  Users,
} from "lucide-react";
import { z } from "zod";

import type { AdminModuleConfig } from "@/types/admin";

const optionalText = z.string().optional();

export function getAdminModules(
  categoryOptions: Array<{ label: string; value: string }> = [],
): AdminModuleConfig[] {
  return [
    {
      key: "categories",
      label: "Kategori",
      path: "/categories",
      icon: FolderTree,
      schema: z.object({
        name: optionalText,
        slug: optionalText,
        description: optionalText,
        color: optionalText,
      }),
      defaults: {
        name: "",
        slug: "",
        description: "",
        color: "",
      },
      fields: [
        { name: "name", label: "Nama Kategori", placeholder: "Contoh: Berita Sekolah" },
        { name: "slug", label: "Slug", placeholder: "berita-sekolah" },
      ],
      roleHint: "Kelola kategori berita.",
    },
    {
      key: "news",
      label: "Berita",
      path: "/news",
      icon: FileText,
      schema: z.object({
        title: optionalText,
        slug: optionalText,
        summary: optionalText,
        content: optionalText,
        thumbnail: optionalText,
        categoryId: optionalText,
      }),
      defaults: {
        title: "",
        slug: "",
        summary: "",
        content: "",
        thumbnail: "",
        categoryId: "",
      },
      fields: [
        { name: "title", label: "Judul Berita", placeholder: "Masukkan judul berita" },
        { name: "categoryId", label: "Kategori", type: "select", options: categoryOptions },
      ],
      roleHint: "Kelola artikel berita sekolah.",
    },
    {
      key: "announcements",
      label: "Pengumuman",
      path: "/announcements",
      icon: Megaphone,
      schema: z.object({
        title: optionalText,
        content: optionalText,
        attachment: optionalText,
      }),
      defaults: {
        title: "",
        content: "",
        attachment: "",
      },
      fields: [{ name: "title", label: "Judul Pengumuman", placeholder: "Masukkan judul pengumuman" }],
      roleHint: "Kelola pengumuman sekolah.",
    },
    {
      key: "agendas",
      label: "Agenda",
      path: "/agendas",
      icon: CalendarDays,
      schema: z.object({
        title: optionalText,
        description: optionalText,
        location: optionalText,
      }),
      defaults: {
        title: "",
        description: "",
        location: "",
      },
      fields: [{ name: "title", label: "Judul Agenda", placeholder: "Masukkan judul agenda" }],
      roleHint: "Kelola agenda dan kegiatan sekolah.",
    },
    {
      key: "achievements",
      label: "Prestasi",
      path: "/achievements",
      icon: Trophy,
      schema: z.object({
        title: optionalText,
        winner: optionalText,
        image: optionalText,
      }),
      defaults: {
        title: "",
        winner: "",
        image: "",
      },
      fields: [{ name: "title", label: "Judul Prestasi", placeholder: "Masukkan judul prestasi" }],
      roleHint: "Kelola data prestasi siswa atau sekolah.",
    },
    {
      key: "galleries",
      label: "Galeri",
      path: "/galleries",
      icon: GalleryVerticalEnd,
      schema: z.object({
        title: optionalText,
        image: optionalText,
      }),
      defaults: {
        title: "",
        image: "",
      },
      fields: [{ name: "title", label: "Judul Galeri", placeholder: "Masukkan judul galeri" }],
      roleHint: "Kelola galeri foto sekolah.",
    },
    {
      key: "ppdb",
      label: "PPDB",
      path: "/ppdb",
      icon: Users,
      schema: z.object({
        title: optionalText,
        content: optionalText,
        banner: optionalText,
      }),
      defaults: {
        title: "",
        content: "",
        banner: "",
      },
      fields: [{ name: "title", label: "Judul PPDB", placeholder: "Masukkan judul PPDB" }],
      roleHint: "Kelola informasi PPDB.",
    },
  ];
}

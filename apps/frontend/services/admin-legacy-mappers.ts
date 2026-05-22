import { getStoredAdminUser } from "@/services/admin-api";
import type {
  Agenda,
  AgendaPayload,
  AgendaUpdatePayload,
  Berita,
  BeritaPayload,
  BeritaUpdatePayload,
  Galeri,
  GaleriPayload,
  GaleriUpdatePayload,
  Kategori,
  Pengumuman,
  PengugumanUpdatePayload,
  PengumumanPayload,
  Ppdb,
  PpdbPayload,
  PpdbUpdatePayload,
  Prestasi,
  PrestasiPayload,
  PrestasiUpdatePayload,
} from "@/types/school";

export type RawCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  color?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RawNews = {
  id: string;
  title: string;
  slug?: string | null;
  excerpt?: string | null;
  content: string;
  thumbnail?: string | null;
  category?: RawCategory | null;
  status: string;
  isFeatured?: boolean | null;
  isBreaking?: boolean | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RawAnnouncement = {
  id: string;
  title: string;
  slug?: string;
  content: string;
  attachment?: string | null;
  status: string;
  isImportant?: boolean | null;
  publishedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RawAchievement = {
  id: string;
  title: string;
  slug?: string;
  description?: string | null;
  winner?: string | null;
  level?: string | null;
  image?: string | null;
  date?: string | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

export type RawGallery = {
  id: string;
  title: string;
  image: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RawPpdb = {
  id: string;
  title: string;
  content: string;
  banner?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status: string;
  createdAt?: string;
  updatedAt?: string;
};

type PublishStatus = "DRAFT" | "PUBLISHED";

function normalizeStatus(status?: string | null): PublishStatus {
  return status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
}

export function mapCategoryRecord(record: RawCategory): Kategori {
  return {
    id: record.id,
    name: record.name,
    slug: record.slug,
    description: record.description ?? null,
    color: record.color ?? null,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function mapNewsRecord(record: RawNews): Berita {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug ?? "",
    summary: record.excerpt ?? "",
    content: record.content,
    thumbnailUrl: record.thumbnail ?? "",
    category: record.category?.name ?? "",
    status: normalizeStatus(record.status),
    isFeatured: Boolean(record.isFeatured),
    isBreakingNews: Boolean(record.isBreaking),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function mapAnnouncementRecord(record: RawAnnouncement): Pengumuman {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug ?? "",
    content: record.content,
    attachmentUrl: record.attachment ?? "",
    status: normalizeStatus(record.status),
    isImportant: Boolean(record.isImportant),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function mapAgendaRecord(record: Agenda): Agenda {
  return {
    ...record,
    slug: record.slug ?? "",
    description: record.description ?? "",
    location: record.location ?? "",
    startDate: record.startDate ?? "",
    endDate: record.endDate ?? "",
    status: normalizeStatus(record.status),
  };
}

export function mapAchievementRecord(record: RawAchievement): Prestasi {
  return {
    id: record.id,
    title: record.title,
    slug: record.slug ?? "",
    description: record.description ?? "",
    winner: record.winner ?? "",
    level: record.level ?? "",
    imageUrl: record.image ?? "",
    achievementDate: record.date ?? "",
    status: normalizeStatus(record.status),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function mapGalleryRecord(record: RawGallery): Galeri {
  return {
    id: record.id,
    title: record.title,
    imageUrl: record.image,
    description: record.description ?? "",
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function mapPpdbRecord(record: RawPpdb): Ppdb {
  return {
    id: record.id,
    title: record.title,
    content: record.content,
    bannerUrl: record.banner ?? "",
    startDate: record.startDate ?? "",
    endDate: record.endDate ?? "",
    status: normalizeStatus(record.status),
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export function toAnnouncementPayload(
  payload: PengumumanPayload | PengugumanUpdatePayload,
) {
  return {
    title: payload.title,
    slug: payload.slug,
    content: payload.content,
    attachment: payload.attachmentUrl,
    status: payload.status,
    isImportant: payload.isImportant ?? false,
  };
}

export function toAgendaPayload(payload: AgendaPayload | AgendaUpdatePayload) {
  return {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    location: payload.location,
    startDate: payload.startDate,
    endDate: payload.endDate,
    status: payload.status,
  };
}

export function toAchievementPayload(
  payload: PrestasiPayload | PrestasiUpdatePayload,
) {
  return {
    title: payload.title,
    slug: payload.slug,
    description: payload.description,
    winner: payload.winner,
    level: payload.level,
    image: payload.imageUrl,
    date: payload.achievementDate,
    status: payload.status,
  };
}

export function toGalleryPayload(payload: GaleriPayload | GaleriUpdatePayload) {
  return {
    title: payload.title,
    image: payload.imageUrl,
    description: payload.description,
  };
}

export function toPpdbPayload(payload: PpdbPayload | PpdbUpdatePayload) {
  return {
    title: payload.title,
    content: payload.content,
    banner: payload.bannerUrl,
    startDate: payload.startDate,
    endDate: payload.endDate,
    status: payload.status,
  };
}

export async function toNewsPayload(
  payload: BeritaPayload | BeritaUpdatePayload,
  categories: Kategori[],
  options?: { includeAuthorId?: boolean },
) {
  const mappedPayload: Record<string, unknown> = {
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.summary,
    content: payload.content,
    thumbnail: payload.thumbnailUrl,
    status: payload.status,
    isFeatured: payload.isFeatured ?? false,
    isBreaking: payload.isBreakingNews ?? false,
  };

  if (payload.category) {
    const selectedCategory =
      categories.find((item) => item.id === payload.category) ??
      categories.find(
        (item) =>
          item.name.toLowerCase() === payload.category?.trim().toLowerCase(),
      ) ??
      categories[0];

    if (!selectedCategory) {
      throw new Error("Kategori berita belum tersedia.");
    }

    mappedPayload.categoryId = selectedCategory.id;
  } else if (options?.includeAuthorId) {
    const fallbackCategory = categories[0];
    if (!fallbackCategory) {
      throw new Error("Kategori berita belum tersedia.");
    }

    mappedPayload.categoryId = fallbackCategory.id;
  }

  if (options?.includeAuthorId) {
    const user = getStoredAdminUser();
    if (!user?.id) {
      throw new Error("Sesi admin tidak ditemukan. Silakan login ulang.");
    }

    mappedPayload.authorId = user.id;
  }

  return mappedPayload;
}

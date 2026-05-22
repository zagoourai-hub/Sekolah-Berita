import { publicEnv } from "@/config/env";
import { apiFetch } from "@/lib/api.wrapper";
import {
  mapAchievementRecord,
  mapAnnouncementRecord,
  mapGalleryRecord,
  mapNewsRecord,
  mapPpdbRecord,
  type RawAchievement,
  type RawAnnouncement,
  type RawGallery,
  type RawNews,
  type RawPpdb,
} from "@/services/admin-legacy-mappers";
import type {
  Agenda,
  AnnouncementItem,
  Galeri,
  HomeData,
  NewsItem,
  Organisasi,
  Ppdb,
  Prestasi,
  SearchResult,
  SettingItem,
} from "@/types/school";
import { normalizeAssetUrl } from "@/utils/media";

export const apiBaseUrl =
  publicEnv.apiBaseUrl ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type CollectionResponse<T> =
  | T[]
  | {
      value?: T[];
      Count?: number;
    };

type OrganisasiApiRecord = Organisasi & {
  Kelas?: string | null;
};

function mapPublicNewsItem(record: RawNews): NewsItem {
  const berita = mapNewsRecord(record);

  return {
    id: berita.id,
    title: berita.title,
    slug: berita.slug ?? "",
    excerpt: berita.summary ?? "",
    content: berita.content,
    thumbnail: berita.thumbnailUrl ? normalizeAssetUrl(berita.thumbnailUrl) ?? null : null,
    publishedAt: record.publishedAt ?? null,
    createdAt: berita.createdAt ?? null,
    category: berita.category
      ? {
          id: record.category?.id ?? "",
          name: berita.category,
          slug: record.category?.slug ?? "",
          description: record.category?.description ?? null,
          color: record.category?.color ?? null,
          createdAt: record.category?.createdAt,
          updatedAt: record.category?.updatedAt,
        }
      : null,
  };
}

function mapPublicAnnouncementItem(record: RawAnnouncement): AnnouncementItem {
  const announcement = mapAnnouncementRecord(record);

  return {
    id: announcement.id,
    title: announcement.title,
    slug: announcement.slug,
    content: announcement.content,
    publishedAt: record.publishedAt ?? null,
    createdAt: announcement.createdAt ?? null,
  };
}

function mapPublicAchievement(record: RawAchievement): Prestasi {
  const achievement = mapAchievementRecord(record);

  return {
    ...achievement,
    imageUrl: achievement.imageUrl ? normalizeAssetUrl(achievement.imageUrl) ?? null : achievement.imageUrl,
  };
}

function mapPublicGallery(record: RawGallery): Galeri {
  const gallery = mapGalleryRecord(record);

  return {
    ...gallery,
    imageUrl: normalizeAssetUrl(gallery.imageUrl) ?? gallery.imageUrl,
  };
}

function mapPublicPpdb(record: RawPpdb): Ppdb {
  const ppdb = mapPpdbRecord(record);

  return {
    ...ppdb,
    bannerUrl: ppdb.bannerUrl ? normalizeAssetUrl(ppdb.bannerUrl) ?? null : ppdb.bannerUrl,
  };
}

function mapPublicOrganisasi(item: OrganisasiApiRecord): Organisasi {
  return {
    ...item,
    kelas: item.kelas ?? item.Kelas ?? null,
    photoUrl: item.photoUrl ? normalizeAssetUrl(item.photoUrl) ?? null : item.photoUrl,
  };
}

function settingsToMap(settings: SettingItem[]) {
  return settings.reduce<Record<string, string>>((acc, item) => {
    acc[item.key] = item.value;
    return acc;
  }, {});
}

function unwrapCollection<T>(input: CollectionResponse<T>) {
  return Array.isArray(input) ? input : input.value ?? [];
}

export async function getSettings() {
  const settings = await apiFetch<Record<string, string> | SettingItem[]>("/settings", {
    method: "GET",
  });

  return Array.isArray(settings) ? settingsToMap(settings) : settings;
}

export async function getNewsList() {
  const response = await apiFetch<CollectionResponse<RawNews>>("/news?limit=24", {
    method: "GET",
  });

  return unwrapCollection(response).map(mapPublicNewsItem);
}

export async function getNewsDetail(slug: string) {
  const record = await apiFetch<RawNews>(`/news/${encodeURIComponent(slug)}`, {
    method: "GET",
  });

  return mapPublicNewsItem(record);
}

export async function getAnnouncementList() {
  const response = await apiFetch<CollectionResponse<RawAnnouncement>>("/announcements", {
    method: "GET",
  });

  return unwrapCollection(response).map(mapPublicAnnouncementItem);
}

export async function getAgendaList() {
  const agendas = await apiFetch<Agenda[]>("/agendas", {
    method: "GET",
  });

  return agendas;
}

export async function getAchievementList() {
  const records = await apiFetch<RawAchievement[]>("/achievements", {
    method: "GET",
  });

  return records.map(mapPublicAchievement);
}

export async function getGalleryList() {
  const records = await apiFetch<RawGallery[]>("/galleries", {
    method: "GET",
  });

  return records.map(mapPublicGallery);
}

export async function getPpdbList() {
  const records = await apiFetch<RawPpdb[]>("/ppdb", {
    method: "GET",
  });

  return records.map(mapPublicPpdb);
}

export async function getOrganisasiPublicList() {
  const records = await apiFetch<OrganisasiApiRecord[]>("/organisasi", {
    method: "GET",
  });

  return records.map(mapPublicOrganisasi);
}

export async function getHomeData(): Promise<HomeData> {
  const [
    featuredNews,
    breakingNews,
    latestNews,
    announcements,
    agendas,
    achievements,
    galleries,
    settings,
  ] = await Promise.all([
    apiFetch<CollectionResponse<RawNews>>("/news/featured", { method: "GET" }),
    apiFetch<CollectionResponse<RawNews>>("/news/breaking", { method: "GET" }),
    apiFetch<CollectionResponse<RawNews>>("/news?limit=6", { method: "GET" }),
    apiFetch<CollectionResponse<RawAnnouncement>>("/announcements/important", { method: "GET" }),
    apiFetch<Agenda[]>("/agendas", { method: "GET" }),
    apiFetch<RawAchievement[]>("/achievements", { method: "GET" }),
    apiFetch<RawGallery[]>("/galleries", { method: "GET" }),
    apiFetch<Record<string, string> | SettingItem[]>("/settings", { method: "GET" }),
  ]);

  const normalizedNews = unwrapCollection(latestNews).map(mapPublicNewsItem);
  const normalizedSettings = Array.isArray(settings) ? settingsToMap(settings) : settings;

  return {
    featuredNews: unwrapCollection(featuredNews).map(mapPublicNewsItem),
    breakingNews: unwrapCollection(breakingNews).map(mapPublicNewsItem),
    popularNews: normalizedNews,
    latestNews: normalizedNews,
    announcements: unwrapCollection(announcements).map(mapPublicAnnouncementItem),
    agendas,
    achievements: achievements.map(mapPublicAchievement),
    galleries: galleries.map(mapPublicGallery),
    settings: normalizedSettings,
  };
}

export async function searchContent(query: string): Promise<SearchResult> {
  if (!query.trim()) {
    return {
      news: [],
      announcements: [],
      agendas: [],
      achievements: [],
    };
  }

  const result = await apiFetch<SearchResult>(
    `/search?q=${encodeURIComponent(query.trim())}`,
    {
      method: "GET",
    },
  );

  return {
    news:
      result.news?.map((item) => ({
        ...item,
        thumbnail: item.thumbnail ? normalizeAssetUrl(item.thumbnail) : item.thumbnail,
      })) ?? [],
    announcements: result.announcements ?? [],
    agendas: result.agendas ?? [],
    achievements:
      result.achievements?.map((item) => ({
        ...item,
        imageUrl: item.imageUrl ? normalizeAssetUrl(item.imageUrl) : item.imageUrl,
      })) ?? [],
  };
}

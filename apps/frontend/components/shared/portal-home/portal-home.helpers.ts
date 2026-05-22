import type { CSSProperties } from "react";
import type { Galeri, HomeData, NewsItem } from "@/types/school";

type SettingItem = {
  key?: string;
  value?: string | null;
};

type UnknownRecord = Record<string, unknown>;

export function currentDateLabel() {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  }).format(new Date());
}

export function schoolSetting(
  settings: HomeData["settings"],
  key: string,
  fallback: string,
) {
  if (!settings) return fallback;

  if (Array.isArray(settings)) {
    const item = (settings as SettingItem[]).find(
      (setting) => setting.key === key,
    );

    if (typeof item?.value === "string" && item.value.trim().length > 0) {
      return item.value;
    }

    return fallback;
  }

  if (typeof settings === "object") {
    const value = (settings as UnknownRecord)[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value;
    }
  }

  return fallback;
}

export function categoryClass(name?: string | null) {
  const value = name?.toLowerCase() ?? "";

  if (value.includes("prestasi")) return "badge-prestasi";
  if (value.includes("akademik")) return "badge-akademik";
  if (value.includes("kegiatan")) return "badge-kegiatan";
  if (value.includes("pengumuman")) return "badge-pengumuman";
  if (value.includes("breaking")) return "badge-breaking";

  return "bg-primary text-primary-foreground";
}

export function imageStyle(image?: string | null): CSSProperties {
  const fallbackImage = "/images/school-placeholder.jpg";
  const imageUrl = image && image.trim().length > 0 ? image : fallbackImage;

  return {
    backgroundImage: `linear-gradient(180deg, rgba(6, 38, 77, 0.02), rgba(6, 38, 77, 0.12)), url("${imageUrl}")`,
  };
}

export function getStringField(data: unknown, fieldName: string) {
  if (!data || typeof data !== "object") return "";

  const value = (data as UnknownRecord)[fieldName];

  return typeof value === "string" ? value : "";
}

export function getNewsImage(item: NewsItem) {
  return (
    getStringField(item, "thumbnail") ||
    getStringField(item, "thumbnailUrl") ||
    getStringField(item, "imageUrl")
  );
}

export function getGalleryImage(item: Galeri) {
  return getStringField(item, "imageUrl") || getStringField(item, "image");
}

export function newsHref(item: NewsItem) {
  const slug = getStringField(item, "slug");

  return slug ? `/berita/${slug}` : `/berita/${item.id}`;
}

export function announcementHref() {
  return "/pengumuman";
}

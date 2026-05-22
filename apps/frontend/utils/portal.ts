import { categorySlug } from "@/utils/format";

export function imageStyle(image?: string | null) {
  return {
    backgroundImage: image
      ? `linear-gradient(180deg, rgba(6, 38, 77, 0.02), rgba(6, 38, 77, 0.08)), url("${image}")`
      : "linear-gradient(135deg, rgba(8, 47, 95, 0.92), rgba(6, 38, 77, 0.74))",
  };
}

export function heroImageStyle(image?: string | null) {
  return {
    backgroundImage: image
      ? `linear-gradient(180deg, rgba(6, 38, 77, 0.04), rgba(6, 38, 77, 0.16)), url("${image}")`
      : "linear-gradient(135deg, rgba(8, 47, 95, 0.92), rgba(6, 38, 77, 0.74))",
  };
}

export function schoolSetting(
  settings: Record<string, string>,
  key: string,
  fallback: string,
) {
  return settings[key] || fallback;
}

export function categoryClass(name?: string | null) {
  const slug = categorySlug(name);
  if (slug.includes("prestasi")) return "badge-prestasi";
  if (slug.includes("akademik")) return "badge-akademik";
  if (slug.includes("pengumuman")) return "badge-pengumuman";
  return "badge-kegiatan";
}

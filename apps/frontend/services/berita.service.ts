import { apiFetch } from "@/lib/api.wrapper";
import {
  type RawCategory,
  type RawNews,
  mapNewsRecord,
  mapCategoryRecord,
  toNewsPayload,
} from "@/services/admin-legacy-mappers";
import { Berita, BeritaPayload, BeritaUpdatePayload } from "@/types/school";


export async function getBeritaList(): Promise<Berita[]> {
  const records = await apiFetch<RawNews[]>("/news", {
    method: "GET",
    auth: true,
  });

  return records.map(mapNewsRecord);
}

export async function createBerita(payload: BeritaPayload): Promise<Berita> {
  const categories = await apiFetch<RawCategory[]>("/categories", {
    method: "GET",
    auth: true,
  });
  const body = await toNewsPayload(
    payload,
    categories.map(mapCategoryRecord),
    { includeAuthorId: true },
  );

  const record = await apiFetch<RawNews>("/news", {
    method: "POST",
    auth: true,
    body,
  });

  return mapNewsRecord(record);
}

export async function updateBerita(
  id: string,
  payload: BeritaUpdatePayload,
): Promise<Berita> {
  const categories = await apiFetch<RawCategory[]>("/categories", {
    method: "GET",
    auth: true,
  });
  const body = await toNewsPayload(payload, categories.map(mapCategoryRecord));

  const record = await apiFetch<RawNews>(`/news/${id}`, {
    method: "PATCH",
    auth: true,
    body,
  });

  return mapNewsRecord(record);
}

export async function deleteBerita(id: string): Promise<void> {
  return apiFetch<void>(`/news/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

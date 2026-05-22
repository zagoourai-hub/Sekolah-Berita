import { apiFetch } from "@/lib/api.wrapper";
import {
  type RawCategory,
  mapCategoryRecord,
} from "@/services/admin-legacy-mappers";

import type {
  Kategori,
  KategoriPayload,
  KategoriUpdatePayload,
} from "@/types/school";

export async function getKategoriList(): Promise<Kategori[]> {
  const records = await apiFetch<RawCategory[]>("/categories", {
    method: "GET",
    auth: true,
  });

  return records.map(mapCategoryRecord);
}

export async function createKategori(
  payload: KategoriPayload,
): Promise<Kategori> {
  const record = await apiFetch<RawCategory>("/categories", {
    method: "POST",
    auth: true,
    body: payload,
  });

  return mapCategoryRecord(record);
}

export async function updateKategori(
  id: string,
  payload: KategoriUpdatePayload,
): Promise<Kategori> {
  const record = await apiFetch<RawCategory>(`/categories/${id}`, {
    method: "PATCH",
    auth: true,
    body: payload,
  });

  return mapCategoryRecord(record);
}

export async function deleteKategori(id: string): Promise<void> {
  return apiFetch<void>(`/categories/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

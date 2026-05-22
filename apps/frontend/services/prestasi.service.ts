import { apiFetch } from "@/lib/api.wrapper";
import {
  type RawAchievement,
  mapAchievementRecord,
  toAchievementPayload,
} from "@/services/admin-legacy-mappers";
import { Prestasi, PrestasiPayload, PrestasiUpdatePayload } from "@/types/school";

export async function getPrestasiList(): Promise<Prestasi[]> {
  const records = await apiFetch<RawAchievement[]>("/achievements", {
    method: "GET",
    auth: true,
  });

  return records.map(mapAchievementRecord);
}

export async function createPrestasi(
  payload: PrestasiPayload,
): Promise<Prestasi> {
  const record = await apiFetch<RawAchievement>("/achievements", {
    method: "POST",
    auth: true,
    body: toAchievementPayload(payload),
  });

  return mapAchievementRecord(record);
}

export async function updatePrestasi(
  id: string,
  payload: PrestasiUpdatePayload,
): Promise<Prestasi> {
  const record = await apiFetch<RawAchievement>(`/achievements/${id}`, {
    method: "PATCH",
    auth: true,
    body: toAchievementPayload(payload),
  });

  return mapAchievementRecord(record);
}

export async function deletePrestasi(id: string): Promise<void> {
  return apiFetch<void>(`/achievements/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

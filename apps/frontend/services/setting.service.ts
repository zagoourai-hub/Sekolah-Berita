import { apiFetch } from "@/lib/api.wrapper";
import type {
  SettingItem,
  SettingPayload,
  UpdateSettingPayload,
} from "@/types/school";

type SettingsRecord = Record<string, string>;

function normalizeSettings(response: SettingsRecord): SettingItem[] {
  return Object.entries(response).map(([key, value]) => ({
    key,
    value: String(value ?? ""),
  }));
}

export async function getSettingsList(): Promise<SettingItem[]> {
  const response = await apiFetch<SettingsRecord>("/settings", {
    method: "GET",
    auth: true,
  });

  return normalizeSettings(response);
}

/**
 * Untuk tambah / upsert satu setting.
 *
 * Backend menerima:
 * {
 *   key: "school_name",
 *   value: "SMK Nusantara Digital"
 * }
 */
export async function createSetting(
  payload: SettingPayload,
): Promise<SettingItem[]> {
  const response = await apiFetch<SettingsRecord>("/settings", {
    method: "PATCH",
    auth: true,
    body: payload,
  });

  return normalizeSettings(response);
}

/**
 * Untuk update banyak settings sekaligus.
 *
 * Backend menerima:
 * {
 *   settings: {
 *     school_name: "...",
 *     phone: "..."
 *   }
 * }
 */
export async function updateSettings(
  payload: Record<string, string>,
): Promise<SettingItem[]> {
  const response = await apiFetch<SettingsRecord>("/settings", {
    method: "PATCH",
    auth: true,
    body: {
      settings: payload,
    },
  });

  return normalizeSettings(response);
}

/**
 * Untuk update satu setting berdasarkan key.
 *
 * Endpoint:
 * PATCH /settings/:key
 *
 * Body:
 * {
 *   value: "SMK Baru"
 * }
 */
export async function updateSetting(
  key: string,
  payload: UpdateSettingPayload,
): Promise<SettingItem[]> {
  const response = await apiFetch<SettingsRecord>(`/settings/${key}`, {
    method: "PATCH",
    auth: true,
    body: payload,
  });

  return normalizeSettings(response);
}

/**
 * Untuk hapus satu setting berdasarkan key.
 *
 * Endpoint:
 * DELETE /settings/:key
 */
export async function deleteSetting(key: string): Promise<SettingItem[]> {
  const response = await apiFetch<SettingsRecord>(`/settings/${key}`, {
    method: "DELETE",
    auth: true,
  });

  return normalizeSettings(response);
}
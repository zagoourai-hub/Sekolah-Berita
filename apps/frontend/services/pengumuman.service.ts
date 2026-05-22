import { apiFetch } from "@/lib/api.wrapper";
import {
  type RawAnnouncement,
  mapAnnouncementRecord,
  toAnnouncementPayload,
} from "@/services/admin-legacy-mappers";
import { PengugumanUpdatePayload, Pengumuman, PengumumanPayload } from "@/types/school";


export async function getPengumumanList(): Promise<Pengumuman[]> {
  const records = await apiFetch<RawAnnouncement[]>("/announcements", {
    method: "GET",
    auth: true,
  });

  return records.map(mapAnnouncementRecord);
}

export async function createPengumuman(
  payload: PengumumanPayload,
): Promise<Pengumuman> {
  const record = await apiFetch<RawAnnouncement>("/announcements", {
    method: "POST",
    auth: true,
    body: toAnnouncementPayload(payload),
  });

  return mapAnnouncementRecord(record);
}

export async function updatePengumuman(
  id: string,
  payload: PengugumanUpdatePayload,
): Promise<Pengumuman> {
  const record = await apiFetch<RawAnnouncement>(`/announcements/${id}`, {
    method: "PATCH",
    auth: true,
    body: toAnnouncementPayload(payload),
  });

  return mapAnnouncementRecord(record);
}

export async function deletePengumuman(id: string): Promise<void> {
  return apiFetch<void>(`/announcements/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

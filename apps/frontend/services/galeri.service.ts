import { apiFetch } from "@/lib/api.wrapper";
import {
  type RawGallery,
  mapGalleryRecord,
  toGalleryPayload,
} from "@/services/admin-legacy-mappers";
import { Galeri, GaleriPayload, GaleriUpdatePayload } from "@/types/school";


export async function getGaleriList(): Promise<Galeri[]> {
  const records = await apiFetch<RawGallery[]>("/galleries", {
    method: "GET",
    auth: true,
  });

  return records.map(mapGalleryRecord);
}

export async function createGaleri(payload: GaleriPayload): Promise<Galeri> {
  const record = await apiFetch<RawGallery>("/galleries", {
    method: "POST",
    auth: true,
    body: toGalleryPayload(payload),
  });

  return mapGalleryRecord(record);
}

export async function updateGaleri(
  id: string,
  payload: GaleriUpdatePayload,
): Promise<Galeri> {
  const record = await apiFetch<RawGallery>(`/galleries/${id}`, {
    method: "PATCH",
    auth: true,
    body: toGalleryPayload(payload),
  });

  return mapGalleryRecord(record);
}

export async function deleteGaleri(id: string): Promise<void> {
  return apiFetch<void>(`/galleries/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

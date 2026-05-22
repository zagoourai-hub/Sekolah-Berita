import { apiFetch } from "@/lib/api.wrapper";
import { CreateOrganisasiPayload, Organisasi, UpdateOrganisasiPayload } from "@/types/school";
import { normalizeAssetUrl } from "@/utils/media";


function OrganisasiFormData(
  payload: CreateOrganisasiPayload | UpdateOrganisasiPayload,
): FormData {
  const formData = new FormData();

  if (payload.name !== undefined) {
    formData.append("name", payload.name);
  }

  if (payload.position !== undefined) {
    formData.append("position", payload.position);
  }

  if (payload.sortOrder !== undefined) {
    formData.append("sortOrder", String(payload.sortOrder));
  }

  if (payload.isActive !== undefined) {
    formData.append("isActive", String(payload.isActive));
  }

    if (payload.photoUrl) {
    formData.append("photoUrl", payload.photoUrl);
  }

  if (payload.kelas !== undefined && payload.kelas !== null) {
    formData.append("kelas", payload.kelas);
  }

  if (payload.photo) {
    formData.append("photo", payload.photo);
  }

  return formData;
}

function normalizeOrganisasi(item: Organisasi): Organisasi {
  return {
    ...item,
    photoUrl: item.photoUrl ? normalizeAssetUrl(item.photoUrl) ?? null : item.photoUrl,
  };
}

export async function getOrganisasiList(): Promise<Organisasi[]> {
  const response = await apiFetch<Organisasi[]>("/organisasi/admin", {
    method: "GET",
    auth: true,
  });

  return response.map(normalizeOrganisasi);
}

export async function getPublicOrganisasiList(): Promise<Organisasi[]> {
  const response = await apiFetch<Organisasi[]>("/organisasi", {
    method: "GET",
  });

  return response.map(normalizeOrganisasi);
}

export async function getOrganisasiById(id: string): Promise<Organisasi> {
  const response = await apiFetch<Organisasi>(`/organisasi/${id}`, {
    method: "GET",
    auth: true,
  });

  return normalizeOrganisasi(response);
}

export async function createOrganisasi(
  payload: CreateOrganisasiPayload,
): Promise<Organisasi> {
  const body = OrganisasiFormData(payload);

  const response = await apiFetch<Organisasi>("/organisasi", {
    method: "POST",
    auth: true,
    body,
  });

  return normalizeOrganisasi(response);
}

export async function updateOrganisasi(
  id: string,
  payload: UpdateOrganisasiPayload,
): Promise<Organisasi> {
  const body = OrganisasiFormData(payload);

  const response = await apiFetch<Organisasi>(`/organisasi/${id}`, {
    method: "PATCH",
    auth: true,
    body,
  });

  return normalizeOrganisasi(response);
}

export async function deleteOrganisasi(id: string): Promise<void> {
  return apiFetch<void>(`/organisasi/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

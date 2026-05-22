import { apiFetch } from "@/lib/api.wrapper";
import {
  type RawPpdb,
  mapPpdbRecord,
  toPpdbPayload,
} from "@/services/admin-legacy-mappers";
import { Ppdb, PpdbPayload, PpdbUpdatePayload } from "@/types/school";


export async function getPpdbList(): Promise<Ppdb[]> {
  const records = await apiFetch<RawPpdb[]>("/ppdb", {
    method: "GET",
    auth: true,
  });

  return records.map(mapPpdbRecord);
}

export async function createPpdb(payload: PpdbPayload): Promise<Ppdb> {
  const record = await apiFetch<RawPpdb>("/ppdb", {
    method: "POST",
    auth: true,
    body: toPpdbPayload(payload),
  });

  return mapPpdbRecord(record);
}

export async function updatePpdb(
  id: string,
  payload: PpdbUpdatePayload,
): Promise<Ppdb> {
  const record = await apiFetch<RawPpdb>(`/ppdb/${id}`, {
    method: "PATCH",
    auth: true,
    body: toPpdbPayload(payload),
  });

  return mapPpdbRecord(record);
}

export async function deletePpdb(id: string): Promise<void> {
  return apiFetch<void>(`/ppdb/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

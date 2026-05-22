import { apiFetch } from "@/lib/api.wrapper";
import { mapAgendaRecord, toAgendaPayload } from "@/services/admin-legacy-mappers";
import { Agenda, AgendaPayload, AgendaUpdatePayload } from "@/types/school";


export async function getAgendaList(): Promise<Agenda[]> {
  const records = await apiFetch<Agenda[]>("/agendas", {
    method: "GET",
    auth: true,
  });

  return records.map(mapAgendaRecord);
}

export async function createAgenda(payload: AgendaPayload): Promise<Agenda> {
  const record = await apiFetch<Agenda>("/agendas", {
    method: "POST",
    auth: true,
    body: toAgendaPayload(payload),
  });

  return mapAgendaRecord(record);
}

export async function updateAgenda(
  id: string,
  payload: AgendaUpdatePayload,
): Promise<Agenda> {
  const record = await apiFetch<Agenda>(`/agendas/${id}`, {
    method: "PATCH",
    auth: true,
    body: toAgendaPayload(payload),
  });

  return mapAgendaRecord(record);
}

export async function deleteAgenda(id: string): Promise<void> {
  return apiFetch<void>(`/agendas/${id}`, {
    method: "DELETE",
    auth: true,
  });
}

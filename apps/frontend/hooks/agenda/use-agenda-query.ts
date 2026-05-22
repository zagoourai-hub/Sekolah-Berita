"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createAgenda,
  deleteAgenda,
  getAgendaList,
  updateAgenda,
} from "@/services/agenda.service";

import type { AgendaPayload, AgendaUpdatePayload } from "@/types/school";
import { createMutationAlertHandlers } from "@/hooks/shared/query-alert";

export const AGENDA_QUERY_KEY = ["admin", "agenda"];

export function useAgendaQuery() {
  return useQuery({
    queryKey: AGENDA_QUERY_KEY,
    queryFn: getAgendaList,
  });
}

export function useCreateAgendaMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menyimpan agenda...",
    successText: "Agenda berhasil ditambahkan.",
  });

  return useMutation({
    mutationFn: (payload: AgendaPayload) => createAgenda(payload),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: AGENDA_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useUpdateAgendaMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Memperbarui agenda...",
    successText: "Agenda berhasil diperbarui.",
  });

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: AgendaUpdatePayload;
    }) => updateAgenda(id, payload),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: AGENDA_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useDeleteAgendaMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menghapus agenda...",
    successText: "Agenda berhasil dihapus.",
  });

  return useMutation({
    mutationFn: (id: string) => deleteAgenda(id),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: AGENDA_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

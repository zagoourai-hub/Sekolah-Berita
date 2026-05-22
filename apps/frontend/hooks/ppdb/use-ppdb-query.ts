"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPpdb,
  deletePpdb,
  getPpdbList,
  updatePpdb,
} from "@/services/ppdb.service";

import type { PpdbPayload, PpdbUpdatePayload } from "@/types/school";
import { createMutationAlertHandlers } from "@/hooks/shared/query-alert";

export const PPDB_QUERY_KEY = ["admin", "ppdb"];

export function usePpdbQuery() {
  return useQuery({
    queryKey: PPDB_QUERY_KEY,
    queryFn: getPpdbList,
  });
}

export function useCreatePpdbMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menyimpan PPDB...",
    successText: "Data PPDB berhasil ditambahkan.",
  });

  return useMutation({
    mutationFn: (payload: PpdbPayload) => createPpdb(payload),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PPDB_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useUpdatePpdbMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Memperbarui PPDB...",
    successText: "Data PPDB berhasil diperbarui.",
  });

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: PpdbUpdatePayload;
    }) => updatePpdb(id, payload),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PPDB_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useDeletePpdbMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menghapus PPDB...",
    successText: "Data PPDB berhasil dihapus.",
  });

  return useMutation({
    mutationFn: (id: string) => deletePpdb(id),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PPDB_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

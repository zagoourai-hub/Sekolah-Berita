"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPrestasi,
  deletePrestasi,
  getPrestasiList,
  updatePrestasi,
} from "@/services/prestasi.service";
import { PrestasiPayload, PrestasiUpdatePayload } from "@/types/school";
import { createMutationAlertHandlers } from "@/hooks/shared/query-alert";



export const PRESTASI_QUERY_KEY = ["admin", "prestasi"];

export function usePrestasiQuery() {
  return useQuery({
    queryKey: PRESTASI_QUERY_KEY,
    queryFn: getPrestasiList,
  });
}

export function useCreatePrestasiMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menyimpan prestasi...",
    successText: "Prestasi berhasil ditambahkan.",
  });

  return useMutation({
    mutationFn: (payload: PrestasiPayload) => createPrestasi(payload),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRESTASI_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useUpdatePrestasiMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Memperbarui prestasi...",
    successText: "Prestasi berhasil diperbarui.",
  });

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: PrestasiUpdatePayload;
    }) => updatePrestasi(id, payload),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRESTASI_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useDeletePrestasiMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menghapus prestasi...",
    successText: "Prestasi berhasil dihapus.",
  });

  return useMutation({
    mutationFn: (id: string) => deletePrestasi(id),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PRESTASI_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

"use client";

import { createBerita, deleteBerita, getBeritaList, updateBerita } from "@/services/berita.service";
import { BeritaPayload, BeritaUpdatePayload } from "@/types/school";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createMutationAlertHandlers } from "@/hooks/shared/query-alert";



export const BERITA_QUERY_KEY = ["admin", "berita"];

export function useBeritaQuery() {
  return useQuery({
    queryKey: BERITA_QUERY_KEY,
    queryFn: getBeritaList,
  });
}

export function useCreateBeritaMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menyimpan berita...",
    successText: "Berita berhasil ditambahkan.",
  });

  return useMutation({
    mutationFn: (payload: BeritaPayload) => {
      return createBerita(payload);
    },
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BERITA_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useUpdateBeritaMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Memperbarui berita...",
    successText: "Berita berhasil diperbarui.",
  });

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: BeritaUpdatePayload;
    }) => {
      return updateBerita(id, payload);
    },
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BERITA_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useDeleteBeritaMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menghapus berita...",
    successText: "Berita berhasil dihapus.",
  });

  return useMutation({
    mutationFn: (id: string) => {
      return deleteBerita(id);
    },
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: BERITA_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



import type {
  KategoriPayload,
  KategoriUpdatePayload,
} from "@/types/school";
import { createKategori, deleteKategori, getKategoriList, updateKategori } from "@/services/kategori.service";
import { createMutationAlertHandlers } from "@/hooks/shared/query-alert";

export const KATEGORI_QUERY_KEY = ["admin", "kategori"];

export function useKategoriQuery() {
  return useQuery({
    queryKey: KATEGORI_QUERY_KEY,
    queryFn: getKategoriList,
  });
}

export function useCreateKategoriMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menyimpan kategori...",
    successText: "Kategori berhasil ditambahkan.",
  });

  return useMutation({
    mutationFn: (payload: KategoriPayload) => {
      return createKategori(payload);
    },
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: KATEGORI_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useUpdateKategoriMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Memperbarui kategori...",
    successText: "Kategori berhasil diperbarui.",
  });

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: KategoriUpdatePayload;
    }) => {
      return updateKategori(id, payload);
    },
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: KATEGORI_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

export function useDeleteKategoriMutation() {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: "Menghapus kategori...",
    successText: "Kategori berhasil dihapus.",
  });

  return useMutation({
    mutationFn: (id: string) => {
      return deleteKategori(id);
    },
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: KATEGORI_QUERY_KEY,
      });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });
}

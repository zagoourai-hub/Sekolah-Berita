"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { createMutationAlertHandlers } from "../shared/query-alert";
import { createOrganisasi, deleteOrganisasi, getOrganisasiList, getPublicOrganisasiList, updateOrganisasi } from "@/services/organisasi.service";
import { UpdateOrganisasiPayload } from "@/types/school";


export const ORGANISASI_QUERY_KEY = ["admin", "organisasi"] as const;
export const ORGANISASI_PUBLIC_QUERY_KEY = ["organisasi", "public"] as const;



export function usePublicOrganisasiListQuery() {
  return useQuery({
    queryKey: ORGANISASI_PUBLIC_QUERY_KEY,
    queryFn: getPublicOrganisasiList,
  });
}

export function useOrganisasiQuery() {
  return useQuery({
    queryKey: ORGANISASI_QUERY_KEY,
    queryFn: getOrganisasiList,
  });
}

export function useCreateOrganisasiMutation() {
  const queryClient = useQueryClient();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Menyimpan data organisasi",
    loadingText: "Data guru/staff sedang disimpan.",
    successTitle: "Berhasil",
    successText: "Data organisasi berhasil ditambahkan.",
    errorTitle: "Gagal menyimpan",
  });

  return useMutation({
    mutationFn: createOrganisasi,

    onMutate: alertHandlers.onMutate,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ORGANISASI_QUERY_KEY,
      });

      alertHandlers.onSuccess();
    },

    onError: alertHandlers.onError,
  });
}

export function useUpdateOrganisasiMutation() {
  const queryClient = useQueryClient();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Mengubah data organisasi",
    loadingText: "Perubahan data sedang disimpan.",
    successTitle: "Berhasil",
    successText: "Data organisasi berhasil diperbarui.",
    errorTitle: "Gagal mengubah",
  });

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateOrganisasiPayload }) =>
      updateOrganisasi(id, payload),

    onMutate: alertHandlers.onMutate,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ORGANISASI_QUERY_KEY,
      });

      alertHandlers.onSuccess();
    },

    onError: alertHandlers.onError,
  });
}

export function useDeleteOrganisasiMutation() {
  const queryClient = useQueryClient();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Menghapus data organisasi",
    loadingText: "Mohon tunggu sebentar.",
    successTitle: "Berhasil",
    successText: "Data organisasi berhasil dihapus.",
    errorTitle: "Gagal menghapus",
  });

  return useMutation({
    mutationFn: deleteOrganisasi,

    onMutate: alertHandlers.onMutate,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ORGANISASI_QUERY_KEY,
      });

      alertHandlers.onSuccess();
    },

    onError: alertHandlers.onError,
  });
}
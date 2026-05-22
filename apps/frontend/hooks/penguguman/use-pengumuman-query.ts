"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createPengumuman,
  deletePengumuman,
  getPengumumanList,
  updatePengumuman,
} from "@/services/pengumuman.service";

import type {
    PengugumanUpdatePayload,
  PengumumanPayload,
 
} from "@/types/school";
import { sweetAlert } from "@/components/alert/alert";

export const PENGUMUMAN_QUERY_KEY = ["admin", "pengumuman"];

export function usePengumumanQuery() {
  return useQuery({
    queryKey: PENGUMUMAN_QUERY_KEY,
    queryFn: getPengumumanList,
  });
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message;
  }

  return "Terjadi kesalahan. Silakan coba lagi.";
}

export function useCreatePengumumanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PengumumanPayload) => createPengumuman(payload),

     onMutate: () => {
      sweetAlert.loading("Menyimpan pengumuman...", "Mohon tunggu sebentar");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PENGUMUMAN_QUERY_KEY,
      });
        sweetAlert.success({
        title: "Berhasil",
        text: "Pengumuman berhasil ditambahkan.",
      });

      
    },
      onError: (error) => {
      sweetAlert.error({
        title: "Gagal",
        text: getErrorMessage(error),
      });
    }
  });
}

export function useUpdatePengumumanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({id,   payload, }: {  id: string;   payload: PengugumanUpdatePayload;  }) => updatePengumuman(id, payload),

    onMutate: () => {
      sweetAlert.loading("Memperbarui pengumuman...", "Mohon tunggu sebentar");
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PENGUMUMAN_QUERY_KEY,
      });
         sweetAlert.success({
        title: "Berhasil",
        text: "Pengumuman berhasil diperbarui.",
      });
    },
       onError: (error) => {
      sweetAlert.error({
        title: "Gagal",
        text: getErrorMessage(error),
      });
    },
  });
}

export function useDeletePengumumanMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePengumuman(id),
     onMutate: () => {
      sweetAlert.loading("Menghapus pengumuman...", "Mohon tunggu sebentar");
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: PENGUMUMAN_QUERY_KEY,
       
      });
      sweetAlert.success({
        title: "Berhasil",
        text: "Pengumuman berhasil dihapus.",
      });
    },
       onError: (error) => {
      sweetAlert.error({
        title: "Gagal",
        text: getErrorMessage(error),
      });
    },
  });
}
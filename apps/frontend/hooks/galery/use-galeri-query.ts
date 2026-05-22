"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createGaleri,
  deleteGaleri,
  getGaleriList,
  updateGaleri,
} from "@/services/galeri.service";

import type { GaleriPayload, GaleriUpdatePayload } from "@/types/school";
import { sweetAlert } from "@/components/alert/alert";

export const GALERI_QUERY_KEY = ["admin", "galeri"];

export function useGaleriQuery() {
  return useQuery({
    queryKey: GALERI_QUERY_KEY,
    queryFn: getGaleriList,
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

export function useCreateGaleriMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GaleriPayload) => createGaleri(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: GALERI_QUERY_KEY,
      });
       sweetAlert.success({
              title: "Berhasil",
              text: "Gambar berhasil Tambah.",
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

export function useUpdateGaleriMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: GaleriUpdatePayload;
    }) => updateGaleri(id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: GALERI_QUERY_KEY,
      });
        sweetAlert.success({
              title: "Berhasil",
              text: "Gambar berhasil Edit.",
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

export function useDeleteGaleriMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteGaleri(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: GALERI_QUERY_KEY,
      });
        sweetAlert.success({
              title: "Berhasil",
              text: "Gambar di Delete.",
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
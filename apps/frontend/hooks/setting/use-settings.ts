"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createSetting,
  deleteSetting,
  getSettingsList,
  updateSetting,
} from "@/services/setting.service";
import type { SettingPayload, UpdateSettingPayload } from "@/types/school";
import { createMutationAlertHandlers } from "../shared/query-alert";

export const SETTINGS_QUERY_KEY = ["admin", "settings"] as const;
export const PUBLIC_HOME_QUERY_KEY = ["public", "home"] as const;

export function useSettingsQuery() {
  return useQuery({
    queryKey: SETTINGS_QUERY_KEY,
    queryFn: getSettingsList,
  });
}

export function useCreateSettingMutation() {
  const queryClient = useQueryClient();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Menyimpan setting",
    loadingText: "Data setting sedang disimpan.",
    successTitle: "Berhasil",
    successText: "Setting berhasil ditambahkan.",
    errorTitle: "Gagal menyimpan setting",
  });

  return useMutation({
    mutationFn: (payload: SettingPayload) => {
      return createSetting(payload);
    },

    onMutate: alertHandlers.onMutate,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: SETTINGS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: PUBLIC_HOME_QUERY_KEY,
        }),
      ]);

      alertHandlers.onSuccess();
    },

    onError: alertHandlers.onError,
  });
}

export function useUpdateSettingMutation() {
  const queryClient = useQueryClient();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Mengubah setting",
    loadingText: "Data setting sedang diperbarui.",
    successTitle: "Berhasil",
    successText: "Setting berhasil diperbarui.",
    errorTitle: "Gagal mengubah setting",
  });

  return useMutation({
    mutationFn: ({
      key,
      payload,
    }: {
      key: string;
      payload: UpdateSettingPayload;
    }) => {
      return updateSetting(key, payload);
    },

    onMutate: alertHandlers.onMutate,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: SETTINGS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: PUBLIC_HOME_QUERY_KEY,
        }),
      ]);

      alertHandlers.onSuccess();
    },

    onError: alertHandlers.onError,
  });
}

export function useDeleteSettingMutation() {
  const queryClient = useQueryClient();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Menghapus setting",
    loadingText: "Mohon tunggu sebentar.",
    successTitle: "Berhasil",
    successText: "Setting berhasil dihapus.",
    errorTitle: "Gagal menghapus setting",
  });

  return useMutation({
    mutationFn: (key: string) => {
      return deleteSetting(key);
    },

    onMutate: alertHandlers.onMutate,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: SETTINGS_QUERY_KEY,
        }),
        queryClient.invalidateQueries({
          queryKey: PUBLIC_HOME_QUERY_KEY,
        }),
      ]);

      alertHandlers.onSuccess();
    },

    onError: alertHandlers.onError,
  });
}
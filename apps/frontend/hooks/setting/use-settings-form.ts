"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { updateSettings } from "@/services/setting.service";
import type { SettingItem } from "@/types/school";
import {
  settingsDefaultValues,
  settingsSchema,
  type SettingsFormValues,
} from "@/validation/settings.schema";
import { createMutationAlertHandlers } from "../shared/query-alert";
import {
  PUBLIC_HOME_QUERY_KEY,
  SETTINGS_QUERY_KEY,
  useDeleteSettingMutation,
} from "./use-settings";

const WEBSITE_SETTING_KEYS = {
  school_name: "school_name",
  school_tagline: "school_tagline",
  phone: "school_phone",
  email: "school_email",
  address: "school_address",
} as const;

function cleanPayload(values: SettingsFormValues) {
  return {
    school_name: values.school_name.trim(),
    school_tagline: values.school_tagline.trim(),
    school_phone: values.phone.trim(),
    school_email: values.email.trim(),
    school_address: values.address.trim(),
  };
}

function findSettingValue(settingsList: SettingItem[], ...keys: string[]) {
  for (const key of keys) {
    const setting = settingsList.find((item) => item.key === key);

    if (setting) {
      return setting.value ?? "";
    }
  }

  return "";
}

function toFormValues(settingsList: SettingItem[]): SettingsFormValues {
  return {
    school_name: findSettingValue(settingsList, WEBSITE_SETTING_KEYS.school_name),
    school_tagline: findSettingValue(
      settingsList,
      WEBSITE_SETTING_KEYS.school_tagline,
    ),
    phone: findSettingValue(settingsList, WEBSITE_SETTING_KEYS.phone, "phone"),
    email: findSettingValue(settingsList, WEBSITE_SETTING_KEYS.email, "email"),
    address: findSettingValue(
      settingsList,
      WEBSITE_SETTING_KEYS.address,
      "address",
    ),
  };
}

export function useSettingsForm(settingsList: SettingItem[]) {
  const queryClient = useQueryClient();
  const [editingSetting, setEditingSetting] = useState<SettingItem | null>(null);
  const deleteMutation = useDeleteSettingMutation();

  const alertHandlers = createMutationAlertHandlers({
    loadingTitle: "Menyimpan setting website",
    loadingText: "Perubahan setting website sedang disimpan.",
    successTitle: "Berhasil",
    successText: "Setting website berhasil diperbarui.",
    errorTitle: "Gagal menyimpan setting website",
  });

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settingsDefaultValues,
  });

  const updateMutation = useMutation({
    mutationFn: updateSettings,
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

  useEffect(() => {
    if (editingSetting) {
      return;
    }

    form.reset(toFormValues(settingsList));
  }, [editingSetting, form, settingsList]);

  function handleSubmit(values: SettingsFormValues) {
    updateMutation.mutate(cleanPayload(values), {
      onSuccess: () => {
        setEditingSetting(null);
      },
    });
  }

  function handleEdit(data: SettingItem) {
    setEditingSetting(data);
    form.reset(toFormValues(settingsList));
  }

  function handleCancelEdit() {
    setEditingSetting(null);
    form.reset(toFormValues(settingsList));
  }

  function handleDelete(key: string) {
    const confirmed = window.confirm(
      `Yakin ingin menghapus setting "${key}"?`,
    );

    if (!confirmed) return;

    deleteMutation.mutate(key, {
      onSuccess: () => {
        if (editingSetting?.key === key) {
          setEditingSetting(null);
        }
      },
    });
  }

  return {
    form,
    editingSetting,
    isSubmitting: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    handleSubmit,
    handleEdit,
    handleCancelEdit,
    handleDelete,
  };
}

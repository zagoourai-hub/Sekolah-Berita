"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { adminRequest } from "@/services/admin-api";
import type {
  AdminFormValues,
  AdminModuleConfig,
  AdminRecord,
  AdminUser,
} from "@/types/admin";
import { cleanPayload } from "@/utils/admin-record";
import { createMutationAlertHandlers, getQueryErrorMessage } from "@/hooks/shared/query-alert";

export function useAdminForm(module: AdminModuleConfig, user: AdminUser | null) {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const form = useForm<AdminFormValues>({
    resolver: zodResolver(module.schema),
    defaultValues: module.defaults,
  });

  useEffect(() => {
    form.reset(module.defaults);
    queueMicrotask(() => setMessage(""));
  }, [form, module]);

  const alerts = createMutationAlertHandlers({
    loadingTitle: `Menyimpan ${module.label}...`,
    successText: `${module.label} berhasil disimpan.`,
  });

  const createMutation = useMutation({
    mutationFn: (payload: AdminFormValues) =>
      adminRequest<AdminRecord>(module.path, {
        method: "POST",
        json: payload,
      }),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-list", module.key] });
      await queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      form.reset(module.defaults);
      setMessage("Data berhasil disimpan.");
      alerts.onSuccess();
    },
    onError: (error) => {
      setMessage(getQueryErrorMessage(error));
      alerts.onError(error);
    },
  });

  async function onSubmit(values: AdminFormValues) {
    const payload = cleanPayload(values);
    if (module.key === "news" && user?.id) {
      payload.authorId = user.id;
    }
    setMessage("");
    await createMutation.mutateAsync(payload);
  }

  return {
    form,
    message,
    createMutation,
    onSubmit,
  };
}

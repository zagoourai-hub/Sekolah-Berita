"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { adminRequest } from "@/services/admin-api";
import type { AdminModuleConfig, AdminRecord } from "@/types/admin";
import { createMutationAlertHandlers } from "@/hooks/shared/query-alert";

export function useAdminList(module: AdminModuleConfig) {
  const queryClient = useQueryClient();
  const alerts = createMutationAlertHandlers({
    loadingTitle: `Menghapus ${module.label}...`,
    successText: `${module.label} berhasil dihapus.`,
  });
  const listQuery = useQuery({
    queryKey: ["admin-list", module.key],
    queryFn: () => adminRequest<AdminRecord[]>(module.path),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      adminRequest<{ success: boolean }>(`${module.path}/${id}`, {
        method: "DELETE",
      }),
    onMutate: alerts.onMutate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["admin-list", module.key] });
      await queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      alerts.onSuccess();
    },
    onError: alerts.onError,
  });

  return {
    listQuery,
    deleteMutation,
  };
}

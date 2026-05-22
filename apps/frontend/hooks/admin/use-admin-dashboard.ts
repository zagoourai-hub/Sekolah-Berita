"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { getAdminModules } from "@/config/admin-modules";
import { sweetAlert } from "@/components/alert/alert";
import {
  adminRequest,
  clearAdminUser,
  getDashboardStats,
  getStoredAdminUser,
  logoutAdmin,
} from "@/services/admin-api";
import type { AdminUser } from "@/types/admin";
import { Kategori } from "@/types/school";

export function useAdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [activeKey, setActiveKey] = useState("news");

  useEffect(() => {
    queueMicrotask(() => setUser(getStoredAdminUser()));
  }, []);

  const statsQuery = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getDashboardStats,
    retry: false,
  });


  
  const categoriesQuery = useQuery({
    queryKey: ["admin-list", "categories"],
    queryFn: () => adminRequest<Kategori[]>("/categories"),
  });

  const categoryOptions = useMemo(
    () =>
      categoriesQuery.data?.map((category) => ({
        label: category.name,
        value: category.id ?? "",
      })) ?? [],
    [categoriesQuery.data],
  );
  const moduleList = useMemo(
    () => getAdminModules(categoryOptions),
    [categoryOptions],
  );
  const activeModule =
    moduleList.find((item) => item.key === activeKey) ?? moduleList[1];



async function handleLogout() {
  try {
    await logoutAdmin();
  } catch (error) {
    console.error("Logout gagal:", error);
    await sweetAlert.error({
      title: "Logout gagal",
      text: error instanceof Error ? error.message : "Silakan coba lagi.",
    });
  } finally {
    clearAdminUser();
    router.replace("/admin/login");
    router.refresh();
  }
}

const unauthorized =
  statsQuery.error instanceof Error &&
  statsQuery.error.message.toLowerCase().includes("unauthorized");

return {
  user,
  statsQuery,
  moduleList,
  activeModule,
  activeKey,
  setActiveKey,
  unauthorized,
  handleLogout,
  goToLogin: () => router.replace("/admin/login"),
}
}

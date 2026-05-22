import { publicEnv } from "@/config/env";
import type { AdminUser, DashboardStats, LoginResponse } from "@/types/admin";

type RequestOptions = RequestInit & {
  json?: unknown;
};

const apiBaseUrl =
  publicEnv.apiBaseUrl ?? process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";
const BACKEND_OFFLINE_MESSAGE = "Backend belum dijalankan";

export async function adminRequest<T>(
  path: string,
  { json, headers, ...options }: RequestOptions = {},
): Promise<T> {
  if (!apiBaseUrl) {
    throw new Error(BACKEND_OFFLINE_MESSAGE);
  }

  let response: Response;

  try {
    response = await fetch(`${apiBaseUrl}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(json ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: json ? JSON.stringify(json) : options.body,
    });
  } catch {
    throw new Error(BACKEND_OFFLINE_MESSAGE);
  }

  const contentType = response.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    throw new Error(BACKEND_OFFLINE_MESSAGE);
  }

  const payload = await response.json();

  if (!response.ok) {
    let message = "Request admin gagal";

    if (Array.isArray(payload?.message)) {
      message = payload.message.join(", ");
    } else if (typeof payload?.message === "string") {
      message = payload.message;
    }

    throw new Error(message);
  }

  return payload as T;
}

export function loginAdmin(input: { email: string; password: string }) {
  return adminRequest<LoginResponse>("/auth/login", {
    method: "POST",
    json: input,
  });
}

export function logoutAdmin() {
  return adminRequest<{ success: boolean }>("/auth/logout", {
    method: "POST",
  });
}

export function getDashboardStats() {
  return adminRequest<DashboardStats>("/dashboard/stats");
}

export function getStoredAdminUser() {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem("school_admin_user");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function storeAdminUser(user: AdminUser) {
  window.localStorage.setItem("school_admin_user", JSON.stringify(user));
}

export function clearAdminUser() {
  window.localStorage.removeItem("school_admin_user");
}

import type { z } from "zod";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "HEADMASTER";
  avatar?: string | null;
};

export type LoginResponse = {
  token: string;
  expiresIn: string;
  user: AdminUser;
};

export type DashboardStats = {
  totalNews: number;
  totalAnnouncements: number;
  totalAgendas: number;
  totalAchievements: number;
  totalGalleries: number;
  totalUsers: number;
  totalSubscribers: number;
  draftNews: number;
  publishedNews: number;
};

export type AdminRecord = {
  id: string;
  title?: string;
  name?: string;
  slug?: string;
  status?: string;
  publishedAt?: string | null;
  createdAt?: string | null;
  startDate?: string | null;
  date?: string | null;
  category?: { name: string } | null;
};

export type AdminFormValues = Record<string, unknown>;

export type AdminFieldType =
  | "text"
  | "textarea"
  | "select"
  | "checkbox"
  | "datetime-local";

export type AdminFieldConfig = {
  name: string;
  label: string;
  type?: AdminFieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export type AdminModuleConfig = {
  key: string;
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  schema: z.ZodObject<z.ZodRawShape>;
  defaults: AdminFormValues;
  fields: AdminFieldConfig[];
  roleHint: string;
};

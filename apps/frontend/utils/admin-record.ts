import type { AdminFormValues } from "@/types/admin";

export function cleanPayload<T extends AdminFormValues>(values: T) {
  return Object.entries(values).reduce<Record<string, unknown>>((acc, [key, value]) => {
    if (value === undefined || value === null) {
      return acc;
    }

    if (typeof value === "string" && value.trim() === "") {
      return acc;
    }

    acc[key] = value;
    return acc;
  }, {}) as T;
}

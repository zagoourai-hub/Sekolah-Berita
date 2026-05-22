import { publicEnv } from "@/config/env";

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";

export function getApiBaseUrl() {
  return publicEnv.apiBaseUrl ?? DEFAULT_API_BASE_URL;
}

export function getAssetOrigin() {
  return getApiBaseUrl().replace(/\/api\/?$/, "");
}

export function normalizeAssetUrl(value?: string | null) {
  if (!value) {
    return value;
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${getAssetOrigin()}${value}`;
  }

  return `${getAssetOrigin()}/${value}`;
}

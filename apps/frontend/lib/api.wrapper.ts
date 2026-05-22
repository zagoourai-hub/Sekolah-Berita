type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiFetchOptions = Omit<RequestInit, "body" | "headers" | "method"> & {
  method?: HttpMethod;
  auth?: boolean;
  body?: unknown;
  headers?: Record<string, string>;
};

const DEFAULT_API_BASE_URL = "http://localhost:4000/api";

function resolveErrorMessage(errorData: unknown): string | null {
  if (!errorData || typeof errorData !== "object") {
    return null;
  }

  if (
    "message" in errorData &&
    typeof errorData.message === "string" &&
    errorData.message.trim()
  ) {
    return errorData.message;
  }

  if ("message" in errorData && Array.isArray(errorData.message)) {
    return errorData.message.join(", ");
  }

  if (
    "error" in errorData &&
    errorData.error &&
    typeof errorData.error === "object"
  ) {
    const nestedError = errorData.error as {
      message?: string;
      errors?: Array<{ path?: string; message?: string }>;
    };

    if (typeof nestedError.message === "string" && nestedError.message.trim()) {
      if (Array.isArray(nestedError.errors) && nestedError.errors.length > 0) {
        return nestedError.errors
          .map((item) =>
            item.path ? `${item.path}: ${item.message ?? "Invalid value"}` : item.message,
          )
          .filter((item): item is string => Boolean(item))
          .join(", ");
      }

      return nestedError.message;
    }
  }

  if (
    "error" in errorData &&
    typeof errorData.error === "string" &&
    errorData.error.trim()
  ) {
    return errorData.error;
  }

  return null;
}

function getAccessToken() {

  if (typeof window === "undefined") {
    return null;
  }

 
  return localStorage.getItem("access_token") || localStorage.getItem("token");
}

function getApiBaseUrl() {
  if (typeof window === "undefined") {
    return (
      process.env.INTERNAL_API_URL ??
      process.env.NEXT_PUBLIC_API_URL ??
      DEFAULT_API_BASE_URL
    );
  }

  return process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL;
}

function buildUrl(path: string) {

  if (path.startsWith("http")) {
    return path;
  }

  return `${getApiBaseUrl()}${path}`;
}

export async function apiFetch<T>(
  path: string,
  options: ApiFetchOptions = {},
): Promise<T> {
  const { method = "GET", auth = false, body, headers, ...restOptions } = options;

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  let requestBody: BodyInit | undefined;


  if (body instanceof FormData) {
    requestBody = body;
  }

  if (body && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
    requestBody = JSON.stringify(body);
  }

 
  if (auth) {
    const token = getAccessToken();

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const response = await fetch(buildUrl(path), {
    method,
    headers: requestHeaders,
    body: requestBody,
    credentials: auth ? "include" : "same-origin",

    ...restOptions,
  });

  if (!response.ok) {
    let errorMessage = `Request gagal dengan status ${response.status}`;

    try {
      const errorData = await response.json();
      errorMessage =
        resolveErrorMessage(errorData) ??
        JSON.stringify(errorData) ??
        errorMessage;
    } catch {
      const errorText = await response.text().catch(() => "");
      errorMessage = errorText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

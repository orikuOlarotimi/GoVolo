// lib/apiClient.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const DEFAULT_TIMEOUT_MS = 8000;

export class NetworkError extends Error {
  constructor(
    message = "Network error. Please check your connection and try again.",
  ) {
    super(message);
    this.name = "NetworkError";
  }
}

export class SessionExpiredError extends Error {
  constructor(message = "Session expired. Please log in again.") {
    super(message);
    this.name = "SessionExpiredError";
  }
}

export class ApiError extends Error {
  status: number;
  data: unknown;
  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export type ApiFetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  params?: Record<string, string | number | boolean | undefined | null>;
  requiresAuth?: boolean;
  timeoutMs?: number;
};

type AuthHooks = {
  getAccessToken: () => string | null;
  refreshAccessToken: () => Promise<string | null>;
  onSessionExpired: () => void;
};

function buildUrl(path: string, params?: ApiFetchOptions["params"]) {
  const url = new URL(`${API_BASE_URL}${path}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

// Single attempt, aborted after timeoutMs. Rejects on timeout or network failure.
async function attemptFetch(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...init, signal: controller.signal });
    clearTimeout(timeoutId);
    return res;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

// Retries once on timeout/network failure. The first attempt's promise is simply
// discarded on rejection — nothing from it is ever read or applied.
async function fetchWithRetry(
  url: string,
  init: RequestInit,
  timeoutMs: number,
): Promise<Response> {
  try {
    return await attemptFetch(url, init, timeoutMs);
  } catch {
    try {
      return await attemptFetch(url, init, timeoutMs);
    } catch {
      throw new NetworkError();
    }
  }
}

export async function apiFetch<T = unknown>(
  path: string,
  options: ApiFetchOptions,
  auth: AuthHooks,
): Promise<T> {
  const {
    method = "GET",
    body,
    params,
    requiresAuth = false,
    timeoutMs = DEFAULT_TIMEOUT_MS,
  } = options;

  const url = buildUrl(path, params);

  const buildInit = (token?: string | null): RequestInit => {
    const headers: Record<string, string> = {};
    if (body !== undefined) headers["Content-Type"] = "application/json";
    if (requiresAuth && token) headers["Authorization"] = `Bearer ${token}`;

    return {
      method,
      headers,
      credentials: "include",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    };
  };

  const currentToken = requiresAuth ? auth.getAccessToken() : null;
  let res = await fetchWithRetry(url, buildInit(currentToken), timeoutMs);

  // Access token missing/expired/invalid — attempt one silent refresh, then retry once.
  if (requiresAuth && res.status === 401) {
    const newToken = await auth.refreshAccessToken();

    if (!newToken) {
      auth.onSessionExpired();
      throw new SessionExpiredError();
    }

    res = await fetchWithRetry(url, buildInit(newToken), timeoutMs);

    if (res.status === 401) {
      // Fresh token still rejected — genuinely invalid session, not just a stale token.
      auth.onSessionExpired();
      throw new SessionExpiredError();
    }
  }

  let data: unknown = null;
  try {
    data = await res.json();
  } catch {
    // no JSON body (e.g. 204 No Content) — fine
  }

  if (!res.ok) {
    const message =
      (data as { message?: string })?.message || "Something went wrong";
    throw new ApiError(message, res.status, data);
  }

  return data as T;
}

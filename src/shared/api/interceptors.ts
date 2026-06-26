import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface ApiEnvelope<T> {
  success: true;
  data: T;
}

function isApiEnvelope(payload: unknown): payload is ApiEnvelope<unknown> {
  return typeof payload === "object" && payload !== null && "success" in payload && "data" in payload;
}

type RetryableConfig = InternalAxiosRequestConfig & { _retried?: boolean };

function redirectTo(path: string): void {
  // Guard against reload loops: AuthProvider probes /auth/me on every page
  // (including /login itself), so a 401 there must never force-navigate to
  // a page we're already on.
  if (typeof window !== "undefined" && window.location.pathname !== path) {
    window.location.href = path;
  }
}

// /auth/me is a session probe — its caller (getCurrentUser) already treats
// a 401 as "logged out" and returns null, so it must never trigger the
// refresh/redirect dance below.
const SILENT_AUTH_ENDPOINTS = ["/auth/login", "/auth/refresh", "/auth/me", "/auth/register"];

export function attachInterceptors(client: AxiosInstance): void {
  let refreshPromise: Promise<void> | null = null;

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (isApiEnvelope(response.data)) {
        response.data = response.data.data;
      }
      return response;
    },
    async (error: AxiosError) => {
      // 403 is left to the calling query/widget — it usually means "no
      // company yet" rather than a hard authorization failure (§20), so a
      // global redirect would yank the user off pages that mix protected
      // and unprotected widgets (e.g. the dashboard).
      const config = error.config as RetryableConfig | undefined;
      const isSilentAuthEndpoint = SILENT_AUTH_ENDPOINTS.some((path) => config?.url?.includes(path));

      if (error.response?.status !== 401 || !config || config._retried || isSilentAuthEndpoint) {
        if (error.response?.status === 401 && !isSilentAuthEndpoint) {
          redirectTo("/login");
        }
        return Promise.reject(error);
      }

      config._retried = true;

      try {
        refreshPromise ??= client.post("/auth/refresh").then(
          () => undefined,
          (refreshError) => {
            throw refreshError;
          },
        );
        await refreshPromise;
        refreshPromise = null;
        return client(config);
      } catch (refreshError) {
        refreshPromise = null;
        redirectTo("/login");
        return Promise.reject(refreshError);
      }
    },
  );
}

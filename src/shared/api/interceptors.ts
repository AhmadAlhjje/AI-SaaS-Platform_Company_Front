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
  if (typeof window !== "undefined") {
    window.location.href = path;
  }
}

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
      if (error.response?.status === 403) {
        redirectTo("/unauthorized");
        return Promise.reject(error);
      }

      const config = error.config as RetryableConfig | undefined;
      const isAuthEndpoint = config?.url?.includes("/auth/login") || config?.url?.includes("/auth/refresh");

      if (error.response?.status !== 401 || !config || config._retried || isAuthEndpoint) {
        if (error.response?.status === 401) {
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

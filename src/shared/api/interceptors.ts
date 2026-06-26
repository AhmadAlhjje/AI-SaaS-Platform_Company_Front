import type { AxiosInstance } from "axios";

export function attachInterceptors(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401 && typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return Promise.reject(error);
    },
  );
}

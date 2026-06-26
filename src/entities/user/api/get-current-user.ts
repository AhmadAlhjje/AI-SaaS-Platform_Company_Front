import { axiosInstance } from "@/shared/api/axios-instance";
import type { AuthenticatedUser } from "../model/types";

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const { data } = await axiosInstance.get<AuthenticatedUser>("/auth/me");
    return data;
  } catch {
    return null;
  }
}

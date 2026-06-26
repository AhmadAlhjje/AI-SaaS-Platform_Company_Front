import { axiosInstance } from "@/shared/api/axios-instance";
import type { AuthenticatedUser, CurrentUserApiModel } from "../model/types";

export async function getCurrentUser(): Promise<AuthenticatedUser | null> {
  try {
    const { data } = await axiosInstance.get<CurrentUserApiModel>("/auth/me");
    return {
      id: data.id,
      email: data.email,
      fullName: data.name,
      role: data.role,
      companyId: data.companyId,
    };
  } catch {
    return null;
  }
}

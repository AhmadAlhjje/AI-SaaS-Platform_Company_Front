import { axiosInstance } from "@/shared/api/axios-instance";
import type { CurrentUserApiModel } from "@/entities/user";
import type { UpdateProfileFormValues } from "../model/update-profile.schema";

// PATCH /auth/me
export async function updateProfile(values: UpdateProfileFormValues): Promise<CurrentUserApiModel> {
  const { data } = await axiosInstance.patch<CurrentUserApiModel>("/auth/me", values);
  return data;
}

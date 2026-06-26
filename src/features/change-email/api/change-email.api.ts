import { axiosInstance } from "@/shared/api/axios-instance";
import type { CurrentUserApiModel } from "@/entities/user";
import type { ChangeEmailFormValues } from "../model/change-email.schema";

// PATCH /auth/me/email
export async function changeEmail(values: ChangeEmailFormValues): Promise<CurrentUserApiModel> {
  const { data } = await axiosInstance.patch<CurrentUserApiModel>("/auth/me/email", values);
  return data;
}

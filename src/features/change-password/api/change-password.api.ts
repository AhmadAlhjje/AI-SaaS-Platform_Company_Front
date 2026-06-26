import { axiosInstance } from "@/shared/api/axios-instance";
import type { ChangePasswordFormValues } from "../model/change-password.schema";

// PATCH /auth/me/password — 204 No Content on success
export async function changePassword(values: ChangePasswordFormValues): Promise<void> {
  await axiosInstance.patch("/auth/me/password", {
    currentPassword: values.currentPassword,
    newPassword: values.newPassword,
  });
}

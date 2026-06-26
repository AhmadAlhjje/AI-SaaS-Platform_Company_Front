"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import type { AuthenticatedUser } from "@/entities/user";
import { changeEmail } from "../api/change-email.api";

interface ApiErrorBody {
  error?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "كلمة المرور الحالية غير صحيحة",
  EMAIL_ALREADY_IN_USE: "هذا البريد الإلكتروني مستخدم مسبقاً",
};

function getErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const code = error.response?.data?.error;
  return (code && ERROR_MESSAGES[code]) || "فشل تغيير البريد الإلكتروني، حاول مجدداً";
}

export function useChangeEmail() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changeEmail,
    onSuccess: (user) => {
      queryClient.setQueryData<AuthenticatedUser>(["auth", "me"], (previous) =>
        previous ? { ...previous, email: user.email } : previous,
      );
      toast.success("تم تغيير البريد الإلكتروني بنجاح");
    },
    onError: (error: AxiosError<ApiErrorBody>) => {
      toast.error(getErrorMessage(error));
    },
  });
}

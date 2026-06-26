"use client";

import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "sonner";
import { changePassword } from "../api/change-password.api";

interface ApiErrorBody {
  error?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "كلمة المرور الحالية غير صحيحة",
};

function getErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const code = error.response?.data?.error;
  return (code && ERROR_MESSAGES[code]) || "فشل تغيير كلمة المرور، حاول مجدداً";
}

export function useChangePassword() {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("تم تغيير كلمة المرور بنجاح");
    },
    onError: (error: AxiosError<ApiErrorBody>) => {
      toast.error(getErrorMessage(error));
    },
  });
}

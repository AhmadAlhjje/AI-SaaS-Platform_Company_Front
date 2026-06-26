"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { login } from "../api/login.api";
import type { LoginFormValues } from "./login.schema";

interface ApiErrorBody {
  message?: string;
}

function getErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const message = error.response?.data?.message;
  if (message === "Invalid email or password.") {
    return "البريد الإلكتروني أو كلمة المرور غير صحيحة";
  }
  return message ?? "حدث خطأ غير متوقع، حاول مجدداً";
}

// Submits credentials, then refreshes the auth/me cache and redirects on success
export function useLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (values: LoginFormValues) => login(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("تم تسجيل الدخول بنجاح");
      router.replace(searchParams.get("redirect") ?? "/dashboard");
    },
    onError: (error: AxiosError<ApiErrorBody>) => {
      toast.error(getErrorMessage(error));
    },
  });
}

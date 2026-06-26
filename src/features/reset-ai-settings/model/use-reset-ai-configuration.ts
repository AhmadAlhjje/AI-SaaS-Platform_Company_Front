"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { resetAiConfiguration } from "../api/reset-ai-configuration.api";

export function useResetAiConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resetAiConfiguration,
    onSuccess: (resetConfig) => {
      queryClient.setQueryData(["ai-configuration"], resetConfig);
      toast.success("تمت إعادة ضبط الإعدادات للوضع الافتراضي");
    },
    onError: () => {
      toast.error("فشل إعادة الضبط، حاول مجدداً");
    },
  });
}

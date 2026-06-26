"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateAiConfiguration } from "../api/update-ai-configuration.api";

export function useUpdateAiConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAiConfiguration,
    onSuccess: (updatedConfig) => {
      queryClient.setQueryData(["ai-configuration"], updatedConfig);
      toast.success("تم حفظ إعدادات الذكاء الاصطناعي");
    },
    onError: () => {
      toast.error("فشل حفظ الإعدادات، حاول مجدداً");
    },
  });
}

"use client";

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { testPrompt } from "../api/test-prompt.api";

export function useTestPrompt() {
  return useMutation({
    mutationFn: testPrompt,
    onError: () => {
      toast.error("فشل اختبار الـ Prompt، حاول مجدداً");
    },
  });
}

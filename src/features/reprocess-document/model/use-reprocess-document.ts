"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { reprocessDocument } from "../api/reprocess-document.api";

export function useReprocessDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reprocessDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("تمت إعادة جدولة معالجة المستند");
    },
    onError: () => {
      toast.error("فشلت إعادة المعالجة، حاول مجدداً");
    },
  });
}

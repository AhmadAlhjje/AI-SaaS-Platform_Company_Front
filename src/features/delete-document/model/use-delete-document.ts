"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteDocument } from "../api/delete-document.api";

export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("تم حذف المستند بنجاح");
    },
    onError: () => {
      toast.error("فشل حذف المستند، حاول مجدداً");
    },
  });
}

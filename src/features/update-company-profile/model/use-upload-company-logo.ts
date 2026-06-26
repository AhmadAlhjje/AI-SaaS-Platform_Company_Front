"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { uploadCompanyLogo } from "../api/upload-company-logo.api";

export function useUploadCompanyLogo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadCompanyLogo,
    onSuccess: (updatedCompany) => {
      queryClient.setQueryData(["company", "me"], updatedCompany);
      toast.success("تم تحديث شعار الشركة");
    },
    onError: () => {
      toast.error("فشل رفع الشعار، حاول مجدداً");
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCompanyProfile } from "../api/update-company-profile.api";

export function useUpdateCompanyProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCompanyProfile,
    onSuccess: (updatedCompany) => {
      queryClient.setQueryData(["company", "me"], updatedCompany);
      toast.success("تم حفظ بيانات الشركة");
    },
    onError: () => {
      toast.error("فشل حفظ بيانات الشركة، حاول مجدداً");
    },
  });
}

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePlan } from "../api/change-plan.api";

export function useChangePlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: changePlan,
    onSuccess: async (updatedSubscription) => {
      queryClient.setQueryData(["subscription", "me"], updatedSubscription);
      await queryClient.invalidateQueries({ queryKey: ["subscription", "me", "usage"] });
      toast.success(`تم الترقية إلى خطة ${updatedSubscription.plan.name}`);
    },
    onError: () => {
      toast.error("فشل تغيير الخطة، حاول مجدداً");
    },
  });
}

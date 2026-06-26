"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AuthenticatedUser } from "@/entities/user";
import { updateProfile } from "../api/update-profile.api";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (user) => {
      queryClient.setQueryData<AuthenticatedUser>(["auth", "me"], (previous) =>
        previous ? { ...previous, fullName: user.name } : previous,
      );
      toast.success("تم تحديث الاسم بنجاح");
    },
    onError: () => {
      toast.error("فشل تحديث الاسم، حاول مجدداً");
    },
  });
}

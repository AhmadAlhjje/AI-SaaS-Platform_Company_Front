"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/providers/auth-provider/auth-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { updateProfileSchema, type UpdateProfileFormValues } from "../model/update-profile.schema";
import { useUpdateProfile } from "../model/use-update-profile";

export function UpdateProfileForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileFormValues>({
    resolver: zodResolver(updateProfileSchema),
    values: { name: user?.fullName ?? "" },
  });
  const updateProfileMutation = useUpdateProfile();

  function handleUpdateSubmit(values: UpdateProfileFormValues) {
    updateProfileMutation.mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">الاسم</Label>
        <Input id="name" aria-invalid={Boolean(errors.name)} {...register("name")} />
        {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
      </div>

      <Button type="submit" className="self-start" disabled={updateProfileMutation.isPending}>
        {updateProfileMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        حفظ الاسم
      </Button>
    </form>
  );
}

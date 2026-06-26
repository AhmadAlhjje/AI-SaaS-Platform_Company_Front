"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { changePasswordSchema, type ChangePasswordFormValues } from "../model/change-password.schema";
import { useChangePassword } from "../model/use-change-password";

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });
  const changePasswordMutation = useChangePassword();

  function handleChangePasswordSubmit(values: ChangePasswordFormValues) {
    changePasswordMutation.mutate(values, { onSuccess: () => reset() });
  }

  return (
    <form onSubmit={handleSubmit(handleChangePasswordSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="currentPassword">كلمة المرور الحالية</Label>
        <Input
          id="currentPassword"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.currentPassword)}
          {...register("currentPassword")}
        />
        {errors.currentPassword && <p className="text-destructive text-xs">{errors.currentPassword.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="newPassword">كلمة المرور الجديدة</Label>
        <Input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.newPassword)}
          {...register("newPassword")}
        />
        {errors.newPassword && <p className="text-destructive text-xs">{errors.newPassword.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="confirmPassword">تأكيد كلمة المرور الجديدة</Label>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-destructive text-xs">{errors.confirmPassword.message}</p>}
      </div>

      <Button type="submit" className="self-start" disabled={changePasswordMutation.isPending}>
        {changePasswordMutation.isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Save className="size-4" />
        )}
        تغيير كلمة المرور
      </Button>
    </form>
  );
}

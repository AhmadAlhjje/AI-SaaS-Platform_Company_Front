"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/providers/auth-provider/auth-provider";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { changeEmailSchema, type ChangeEmailFormValues } from "../model/change-email.schema";
import { useChangeEmail } from "../model/use-change-email";

export function ChangeEmailForm() {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    values: { email: user?.email ?? "", currentPassword: "" },
  });
  const changeEmailMutation = useChangeEmail();

  function handleChangeEmailSubmit(values: ChangeEmailFormValues) {
    changeEmailMutation.mutate(values, {
      onSuccess: (updatedUser) => reset({ email: updatedUser.email, currentPassword: "" }),
    });
  }

  return (
    <form onSubmit={handleSubmit(handleChangeEmailSubmit)} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">البريد الإلكتروني</Label>
        <Input id="email" type="email" aria-invalid={Boolean(errors.email)} {...register("email")} />
        {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="currentPasswordForEmail">كلمة المرور الحالية</Label>
        <Input
          id="currentPasswordForEmail"
          type="password"
          autoComplete="current-password"
          aria-invalid={Boolean(errors.currentPassword)}
          {...register("currentPassword")}
        />
        {errors.currentPassword && <p className="text-destructive text-xs">{errors.currentPassword.message}</p>}
      </div>

      <Button type="submit" className="self-start" disabled={changeEmailMutation.isPending}>
        {changeEmailMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        حفظ البريد الإلكتروني
      </Button>
    </form>
  );
}

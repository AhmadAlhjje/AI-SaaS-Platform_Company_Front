import { z } from "zod";

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
    newPassword: z.string().min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل").max(72, "كلمة المرور طويلة جداً"),
    confirmPassword: z.string().min(1, "تأكيد كلمة المرور مطلوب"),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "كلمتا المرور غير متطابقتين",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

import { z } from "zod";

export const changeEmailSchema = z.object({
  email: z.string().min(1, "البريد الإلكتروني مطلوب").email("صيغة البريد الإلكتروني غير صحيحة"),
  currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
});

export type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

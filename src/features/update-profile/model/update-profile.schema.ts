import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب").max(120, "الاسم طويل جداً"),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

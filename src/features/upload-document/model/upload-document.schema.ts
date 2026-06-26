import { z } from "zod";

export const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

export const uploadDocumentSchema = z.object({
  file: z
    .instanceof(File, { message: "يجب اختيار ملف" })
    .refine((file) => (ALLOWED_FILE_TYPES as readonly string[]).includes(file.type), {
      message: "نوع الملف غير مدعوم — الأنواع المسموحة: PDF، CSV، Excel",
    })
    .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
      message: "حجم الملف يجب أن لا يتجاوز 50 ميجابايت",
    }),
  knowledgeType: z
    .string()
    .min(1, "نوع المعرفة مطلوب")
    .max(120, "الحد الأقصى 120 حرفاً"),
});

export type UploadDocumentFormValues = z.infer<typeof uploadDocumentSchema>;

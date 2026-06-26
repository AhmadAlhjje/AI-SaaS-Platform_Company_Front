import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "@/shared/ui/badge";

export const DOCUMENT_STATUS_VARIANT: Record<string, VariantProps<typeof badgeVariants>["variant"]> = {
  ready: "success",
  processing: "warning",
  failed: "destructive",
};

export const DOCUMENT_STATUS_LABEL: Record<string, string> = {
  ready: "جاهز",
  processing: "قيد المعالجة",
  failed: "فشل",
};

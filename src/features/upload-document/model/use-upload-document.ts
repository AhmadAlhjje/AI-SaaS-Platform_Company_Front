"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { uploadDocument } from "../api/upload-document.api";
import type { UploadDocumentFormValues } from "./upload-document.schema";

interface ApiErrorBody {
  error?: string;
  message?: string;
}

const ERROR_MESSAGES: Record<string, string> = {
  UNSUPPORTED_FILE_TYPE: "نوع الملف غير مدعوم",
  USAGE_LIMIT_EXCEEDED: "تم الوصول للحد الأقصى المسموح به في خطتك الحالية، يلزم ترقية الخطة",
};

function getErrorMessage(error: AxiosError<ApiErrorBody>): string {
  const code = error.response?.data?.error;
  return (code && ERROR_MESSAGES[code]) || "فشل رفع الملف، حاول مجدداً";
}

// Uploads a document and tracks upload progress for the progress bar
export function useUploadDocument() {
  const queryClient = useQueryClient();
  const [progress, setProgress] = useState(0);

  const mutation = useMutation({
    mutationFn: (values: UploadDocumentFormValues) => uploadDocument({ ...values, onProgress: setProgress }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("تم رفع المستند بنجاح");
      setProgress(0);
    },
    onError: (error: AxiosError<ApiErrorBody>) => {
      toast.error(getErrorMessage(error));
      setProgress(0);
    },
  });

  return { ...mutation, progress };
}

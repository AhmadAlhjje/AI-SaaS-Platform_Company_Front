import { axiosInstance } from "@/shared/api/axios-instance";
import type { Document } from "@/entities/document";

export interface UploadDocumentInput {
  file: File;
  knowledgeType: string;
  onProgress?: (percent: number) => void;
}

// POST /documents (multipart/form-data)
export async function uploadDocument({ file, knowledgeType, onProgress }: UploadDocumentInput): Promise<Document> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("knowledgeType", knowledgeType);

  const { data } = await axiosInstance.post<Document>("/documents", formData, {
    // The shared instance defaults to Content-Type: application/json, which
    // makes axios JSON-stringify the FormData instead of sending it as
    // multipart — clearing it lets the browser set the correct boundary.
    headers: { "Content-Type": undefined },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    },
  });

  return data;
}

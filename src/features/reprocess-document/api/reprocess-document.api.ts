import { axiosInstance } from "@/shared/api/axios-instance";
import type { Document } from "@/entities/document";

// POST /documents/:id/reprocess
export async function reprocessDocument(documentId: string): Promise<Document> {
  const { data } = await axiosInstance.post<Document>(`/documents/${documentId}/reprocess`);
  return data;
}

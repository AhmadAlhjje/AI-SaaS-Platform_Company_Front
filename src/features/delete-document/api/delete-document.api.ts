import { axiosInstance } from "@/shared/api/axios-instance";

// DELETE /documents/:id
export async function deleteDocument(documentId: string): Promise<void> {
  await axiosInstance.delete(`/documents/${documentId}`);
}

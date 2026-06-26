import { axiosInstance } from "@/shared/api/axios-instance";
import type { ListDocumentsParams, PaginatedDocuments } from "../model/types";

// GET /documents?search=&page=&limit= — paginated, ordered by createdAt desc
export async function getDocuments(params: ListDocumentsParams = {}): Promise<PaginatedDocuments> {
  const { data } = await axiosInstance.get<PaginatedDocuments>("/documents", { params });
  return data;
}

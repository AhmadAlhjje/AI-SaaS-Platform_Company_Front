import { axiosInstance } from "@/shared/api/axios-instance";
import type { Document } from "../model/types";

// GET /documents — backend returns all documents ordered by createdAt desc
export async function getDocuments(): Promise<Document[]> {
  const { data } = await axiosInstance.get<Document[]>("/documents");
  return data;
}

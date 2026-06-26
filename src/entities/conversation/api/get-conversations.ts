import { axiosInstance } from "@/shared/api/axios-instance";
import type { Conversation } from "../model/types";

// GET /conversations — backend returns all conversations ordered by createdAt desc
export async function getConversations(): Promise<Conversation[]> {
  const { data } = await axiosInstance.get<Conversation[]>("/conversations");
  return data;
}

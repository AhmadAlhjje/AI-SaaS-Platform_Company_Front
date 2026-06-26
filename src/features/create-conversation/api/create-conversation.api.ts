import { axiosInstance } from "@/shared/api/axios-instance";
import type { Conversation } from "@/entities/conversation";

// POST /conversations
export async function createConversation(): Promise<Conversation> {
  const { data } = await axiosInstance.post<Conversation>("/conversations", {});
  return data;
}

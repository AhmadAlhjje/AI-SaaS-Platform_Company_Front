import { axiosInstance } from "@/shared/api/axios-instance";
import type { Conversation } from "@/entities/conversation";

// PATCH /conversations/:id
export async function renameConversation(conversationId: string, title: string): Promise<Conversation> {
  const { data } = await axiosInstance.patch<Conversation>(`/conversations/${conversationId}`, { title });
  return data;
}

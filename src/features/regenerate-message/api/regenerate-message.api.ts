import { axiosInstance } from "@/shared/api/axios-instance";
import type { Message } from "@/entities/message";

// POST /conversations/:id/messages/regenerate — replaces the AI reply to the
// last user message and returns the new one
export async function regenerateMessage(conversationId: string): Promise<Message> {
  const { data } = await axiosInstance.post<Message>(`/conversations/${conversationId}/messages/regenerate`);
  return data;
}

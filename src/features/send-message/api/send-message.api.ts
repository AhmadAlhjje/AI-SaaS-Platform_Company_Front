import { axiosInstance } from "@/shared/api/axios-instance";
import type { SendMessageResult } from "@/entities/message";

// POST /conversations/:id/messages — persists the user message, then returns
// it alongside the AI reply generated for it in the same request.
export async function sendMessage(conversationId: string, content: string): Promise<SendMessageResult> {
  const { data } = await axiosInstance.post<SendMessageResult>(`/conversations/${conversationId}/messages`, {
    content,
  });
  return data;
}

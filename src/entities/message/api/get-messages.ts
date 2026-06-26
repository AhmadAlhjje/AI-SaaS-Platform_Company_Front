import { axiosInstance } from "@/shared/api/axios-instance";
import type { Message } from "../model/types";

// GET /conversations/:id/messages — ordered by createdAt asc
export async function getMessages(conversationId: string): Promise<Message[]> {
  const { data } = await axiosInstance.get<Message[]>(`/conversations/${conversationId}/messages`);
  return data;
}

import { axiosInstance } from "@/shared/api/axios-instance";

// DELETE /conversations/:id — hard delete, messages cascade with it
export async function deleteConversation(conversationId: string): Promise<void> {
  await axiosInstance.delete(`/conversations/${conversationId}`);
}

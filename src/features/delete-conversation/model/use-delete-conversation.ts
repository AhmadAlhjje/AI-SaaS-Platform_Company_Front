"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteConversation } from "../api/delete-conversation.api";

export function useDeleteConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConversation,
    onSuccess: async (_data, conversationId) => {
      queryClient.removeQueries({ queryKey: ["messages", conversationId] });
      await queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("تم مسح المحادثة");
    },
    onError: () => {
      toast.error("فشل مسح المحادثة، حاول مجدداً");
    },
  });
}

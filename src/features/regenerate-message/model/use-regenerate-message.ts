"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Message } from "@/entities/message";
import { regenerateMessage } from "../api/regenerate-message.api";

export function useRegenerateMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (conversationId: string) => regenerateMessage(conversationId),
    onSuccess: (aiMessage, conversationId) => {
      queryClient.setQueryData<Message[]>(["messages", conversationId], (previous = []) => {
        const withoutLastAiReply = previous.at(-1)?.senderType === "ai" ? previous.slice(0, -1) : previous;
        return [...withoutLastAiReply, aiMessage];
      });
    },
    onError: () => {
      toast.error("فشل إعادة توليد الإجابة، حاول مجدداً");
    },
  });
}

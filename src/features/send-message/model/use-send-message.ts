"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Message } from "@/entities/message";
import { sendMessage } from "../api/send-message.api";

interface SendMessageVariables {
  conversationId: string;
  content: string;
}

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, content }: SendMessageVariables) => sendMessage(conversationId, content),
    onSuccess: (result, variables) => {
      queryClient.setQueryData<Message[]>(["messages", variables.conversationId], (previous = []) => {
        const next = [...previous, result.userMessage];
        return result.aiMessage ? [...next, result.aiMessage] : next;
      });
    },
    onError: () => {
      toast.error("فشل إرسال الرسالة، حاول مجدداً");
    },
  });
}

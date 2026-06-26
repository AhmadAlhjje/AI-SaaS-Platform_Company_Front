"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Conversation } from "@/entities/conversation";
import { renameConversation } from "../api/rename-conversation.api";

interface RenameConversationVariables {
  conversationId: string;
  title: string;
}

export function useRenameConversation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ conversationId, title }: RenameConversationVariables) => renameConversation(conversationId, title),
    onSuccess: (updatedConversation) => {
      queryClient.setQueryData<Conversation[]>(["conversations"], (previous = []) =>
        previous.map((conversation) => (conversation.id === updatedConversation.id ? updatedConversation : conversation)),
      );
    },
    onError: () => {
      toast.error("فشل تعديل اسم المحادثة، حاول مجدداً");
    },
  });
}

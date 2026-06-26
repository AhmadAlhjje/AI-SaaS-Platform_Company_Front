"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useCreateConversation } from "../model/use-create-conversation";

interface NewConversationButtonProps {
  onCreated: (conversationId: string) => void;
}

export function NewConversationButton({ onCreated }: NewConversationButtonProps) {
  const createConversationMutation = useCreateConversation();

  function handleClick() {
    createConversationMutation.mutate(undefined, {
      onSuccess: (conversation) => onCreated(conversation.id),
    });
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="w-full"
      disabled={createConversationMutation.isPending}
      onClick={handleClick}
    >
      {createConversationMutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Plus />}
      محادثة جديدة
    </Button>
  );
}

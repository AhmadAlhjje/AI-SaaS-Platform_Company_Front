"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useDeleteConversation } from "../model/use-delete-conversation";

interface ClearChatButtonProps {
  conversationId: string;
  onCleared: () => void;
}

export function ClearChatButton({ conversationId, onCleared }: ClearChatButtonProps) {
  const deleteConversationMutation = useDeleteConversation();

  function handleConfirm() {
    deleteConversationMutation.mutate(conversationId, { onSuccess: onCleared });
  }

  return (
    <ConfirmDialog
      trigger={
        <Button variant="ghost" size="sm">
          <Trash2 className="size-4" />
          مسح المحادثة
        </Button>
      }
      title="مسح المحادثة"
      description="سيتم حذف هذه المحادثة وكل رسائلها نهائياً. لا يمكن التراجع عن هذا الإجراء."
      confirmLabel="مسح"
      destructive
      isPending={deleteConversationMutation.isPending}
      onConfirm={handleConfirm}
    />
  );
}

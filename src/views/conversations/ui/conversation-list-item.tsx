"use client";

import { Check, Pencil, Trash2, X } from "lucide-react";
import { useState } from "react";
import type { Conversation } from "@/entities/conversation";
import { useDeleteConversation } from "@/features/delete-conversation";
import { useRenameConversation } from "@/features/rename-conversation";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { Input } from "@/shared/ui/input";

interface ConversationListItemProps {
  conversation: Conversation;
  isSelected: boolean;
  onSelect: (conversationId: string) => void;
  onDeleted: (conversationId: string) => void;
}

export function ConversationListItem({ conversation, isSelected, onSelect, onDeleted }: ConversationListItemProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [titleInput, setTitleInput] = useState(conversation.title ?? "");
  const renameConversationMutation = useRenameConversation();
  const deleteConversationMutation = useDeleteConversation();

  function startRenaming() {
    setTitleInput(conversation.title ?? "");
    setIsRenaming(true);
  }

  function handleRenameConfirm() {
    const trimmed = titleInput.trim();
    if (!trimmed || trimmed === conversation.title) {
      setIsRenaming(false);
      return;
    }
    renameConversationMutation.mutate(
      { conversationId: conversation.id, title: trimmed },
      { onSuccess: () => setIsRenaming(false) },
    );
  }

  function handleDelete() {
    deleteConversationMutation.mutate(conversation.id, { onSuccess: () => onDeleted(conversation.id) });
  }

  if (isRenaming) {
    return (
      <li className="flex items-center gap-1 p-2">
        <Input
          autoFocus
          value={titleInput}
          onChange={(event) => setTitleInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleRenameConfirm();
            }
            if (event.key === "Escape") {
              setIsRenaming(false);
            }
          }}
          className="h-8"
        />
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label="حفظ"
          disabled={renameConversationMutation.isPending}
          onClick={handleRenameConfirm}
        >
          <Check className="size-3.5" />
        </Button>
        <Button variant="ghost" size="icon-xs" aria-label="إلغاء" onClick={() => setIsRenaming(false)}>
          <X className="size-3.5" />
        </Button>
      </li>
    );
  }

  return (
    <li className="group relative">
      <button
        type="button"
        aria-current={isSelected ? "true" : undefined}
        onClick={() => onSelect(conversation.id)}
        className={cn(
          "hover:bg-muted/50 flex w-full flex-col gap-0.5 p-3 pe-16 text-start transition-colors",
          isSelected && "bg-muted",
        )}
      >
        <span className="text-foreground truncate text-sm font-medium">
          {conversation.title ?? "محادثة بدون عنوان"}
        </span>
        <span className="text-muted-foreground text-xs">
          {new Date(conversation.createdAt).toLocaleDateString("ar")}
        </span>
      </button>

      <div className="absolute inset-e-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
        <Button variant="ghost" size="icon-xs" aria-label="إعادة تسمية" onClick={startRenaming}>
          <Pencil className="size-3.5" />
        </Button>
        <ConfirmDialog
          trigger={
            <Button variant="ghost" size="icon-xs" aria-label="حذف المحادثة">
              <Trash2 className="text-destructive size-3.5" />
            </Button>
          }
          title="حذف المحادثة"
          description={`هل أنت متأكد من حذف "${conversation.title ?? "محادثة بدون عنوان"}"؟ لا يمكن التراجع عن هذا الإجراء.`}
          confirmLabel="حذف"
          destructive
          isPending={deleteConversationMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </li>
  );
}

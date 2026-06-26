"use client";

import type { AxiosError } from "axios";
import { useState } from "react";
import { useMessages } from "@/entities/message";
import { ClearChatButton } from "@/features/delete-conversation";
import { MessageComposer, useSendMessage } from "@/features/send-message";
import { Card } from "@/shared/ui/card";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { MessageList } from "./message-list";

interface ChatPanelProps {
  conversationId: string;
  conversationTitle: string | null;
  onCleared: () => void;
}

export function ChatPanel({ conversationId, conversationTitle, onCleared }: ChatPanelProps) {
  const { data: messages, isLoading, isError, error, refetch } = useMessages(conversationId);
  const sendMessageMutation = useSendMessage();
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null);
  const status = (error as AxiosError | null)?.response?.status;

  function handleSend(content: string) {
    sendMessageMutation.mutate(
      { conversationId, content },
      {
        onSuccess: (result) => {
          if (result.aiMessage) {
            setStreamingMessageId(result.aiMessage.id);
          }
        },
      },
    );
  }

  return (
    <Card className="flex h-full min-w-0 flex-1 flex-col overflow-hidden">
      <div className="border-border flex items-center justify-between border-b p-4">
        <h2 className="text-foreground truncate text-sm font-semibold">
          {conversationTitle ?? "محادثة بدون عنوان"}
        </h2>
        <ClearChatButton conversationId={conversationId} onCleared={onCleared} />
      </div>

      {isLoading ? (
        <div className="flex-1 space-y-3 p-4">
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="ms-auto h-12 w-2/3" />
          <Skeleton className="h-12 w-1/2" />
        </div>
      ) : isError ? (
        <div className="flex-1 p-4">
          {status === 403 ? (
            <PermissionDeniedState description="يلزم إنشاء شركة أولاً لاستخدام المحادثة." />
          ) : (
            <ServerErrorState onRetry={() => refetch()} />
          )}
        </div>
      ) : (
        <MessageList
          conversationId={conversationId}
          messages={messages ?? []}
          isWaitingForReply={sendMessageMutation.isPending}
          streamingMessageId={streamingMessageId}
          onStreamDone={() => setStreamingMessageId(null)}
          onRegenerated={setStreamingMessageId}
        />
      )}

      <div className="border-border border-t p-4">
        <MessageComposer onSend={handleSend} disabled={sendMessageMutation.isPending} />
      </div>
    </Card>
  );
}

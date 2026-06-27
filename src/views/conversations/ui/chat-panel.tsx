"use client";

import type { AxiosError } from "axios";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useMessages } from "@/entities/message";
import { ClearChatButton } from "@/features/delete-conversation";
import { MessageComposer, useSendMessage } from "@/features/send-message";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { MessageList } from "./message-list";

interface ChatPanelProps {
  conversationId: string;
  conversationTitle: string | null;
  onCleared: () => void;
  onBack: () => void;
}

export function ChatPanel({ conversationId, conversationTitle, onCleared, onBack }: ChatPanelProps) {
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
        <div className="flex min-w-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon-sm"
            className="lg:hidden"
            aria-label="عودة لقائمة المحادثات"
            onClick={onBack}
          >
            <ArrowRight className="size-4" />
          </Button>
          <h2 className="text-foreground truncate text-sm font-semibold">
            {conversationTitle ?? "محادثة بدون عنوان"}
          </h2>
        </div>
        <ClearChatButton conversationId={conversationId} onCleared={onCleared} />
      </div>

      {isLoading ? (
        <div className="flex-1 space-y-4 p-4">
          <div className="flex items-start gap-2">
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <Skeleton className="h-12 w-2/3 rounded-lg" />
          </div>
          <div className="flex items-start justify-end gap-2">
            <Skeleton className="h-12 w-2/3 rounded-lg" />
          </div>
          <div className="flex items-start gap-2">
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <Skeleton className="h-12 w-1/2 rounded-lg" />
          </div>
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

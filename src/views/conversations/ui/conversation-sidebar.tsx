"use client";

import type { AxiosError } from "axios";
import { MessageSquare } from "lucide-react";
import { useConversations } from "@/entities/conversation";
import { NewConversationButton } from "@/features/create-conversation";
import { cn } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";

interface ConversationSidebarProps {
  selectedConversationId: string | null;
  onSelect: (conversationId: string) => void;
}

export function ConversationSidebar({ selectedConversationId, onSelect }: ConversationSidebarProps) {
  const { data: conversations, isLoading, isError, error, refetch } = useConversations();
  const status = (error as AxiosError | null)?.response?.status;
  const items = conversations ?? [];

  return (
    <Card className="flex h-full w-72 shrink-0 flex-col overflow-hidden">
      <div className="border-border border-b p-3">
        <NewConversationButton onCreated={onSelect} />
      </div>
      <CardContent className="flex-1 overflow-y-auto p-0">
        {isLoading && (
          <div className="space-y-2 p-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {isError && (
          <div className="p-3">
            {status === 403 ? (
              <PermissionDeniedState description="يلزم إنشاء شركة أولاً." />
            ) : (
              <ServerErrorState onRetry={() => refetch()} />
            )}
          </div>
        )}

        {!isLoading && !isError && items.length === 0 && (
          <div className="p-3">
            <EmptyState icon={MessageSquare} title="لا توجد محادثات بعد" description="ابدأ محادثة جديدة." />
          </div>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <ul className="divide-border divide-y">
            {items.map((conversation) => (
              <li key={conversation.id}>
                <button
                  type="button"
                  onClick={() => onSelect(conversation.id)}
                  className={cn(
                    "hover:bg-muted/50 flex w-full flex-col gap-0.5 p-3 text-start transition-colors",
                    selectedConversationId === conversation.id && "bg-muted",
                  )}
                >
                  <span className="text-foreground truncate text-sm font-medium">
                    {conversation.title ?? "محادثة بدون عنوان"}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {new Date(conversation.createdAt).toLocaleDateString("ar")}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

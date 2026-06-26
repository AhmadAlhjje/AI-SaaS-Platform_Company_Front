"use client";

import type { AxiosError } from "axios";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { useConversations } from "@/entities/conversation";

interface ConversationListProps {
  limit?: number;
}

export function ConversationList({ limit }: ConversationListProps) {
  const { data: conversations = [], isLoading, isError, error, refetch } = useConversations();
  const status = (error as AxiosError | null)?.response?.status;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>أحدث المحادثات</CardTitle>
        <Button variant="ghost" size="sm" nativeButton={false} render={<Link href="/conversations" />}>
          عرض الكل
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        )}

        {isError && status === 403 && (
          <PermissionDeniedState description="يلزم إنشاء شركة أولاً لعرض المحادثات." />
        )}
        {isError && status !== 403 && <ServerErrorState onRetry={() => refetch()} />}

        {!isLoading && !isError && conversations.length === 0 && (
          <EmptyState
            icon={MessageSquare}
            title="لا توجد محادثات بعد"
            description="ابدأ أول محادثة مع المساعد الذكي."
          />
        )}

        {!isLoading && !isError && conversations.length > 0 && (
          <ul className="divide-border divide-y">
            {conversations.slice(0, limit).map((conversation) => (
              <li key={conversation.id} className="flex items-center justify-between gap-2 py-2.5 text-sm">
                <span className="text-foreground truncate">
                  {conversation.title ?? "محادثة بدون عنوان"}
                </span>
                <span className="text-muted-foreground text-xs">
                  {new Date(conversation.createdAt).toLocaleDateString("ar")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

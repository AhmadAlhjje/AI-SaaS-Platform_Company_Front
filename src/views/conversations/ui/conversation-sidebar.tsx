"use client";

import type { AxiosError } from "axios";
import { ArrowDownUp, MessageSquare, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useConversations } from "@/entities/conversation";
import { NewConversationButton } from "@/features/create-conversation";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/shared/ui/empty-state";
import { Input } from "@/shared/ui/input";
import { PermissionDeniedState } from "@/shared/ui/permission-denied-state";
import { ServerErrorState } from "@/shared/ui/server-error-state";
import { Skeleton } from "@/shared/ui/skeleton";
import { ConversationListItem } from "./conversation-list-item";

type SortOrder = "desc" | "asc";

interface ConversationSidebarProps {
  selectedConversationId: string | null;
  onSelect: (conversationId: string) => void;
  onDeleted: (conversationId: string) => void;
}

export function ConversationSidebar({ selectedConversationId, onSelect, onDeleted }: ConversationSidebarProps) {
  const { data: conversations, isLoading, isError, error, refetch } = useConversations();
  const status = (error as AxiosError | null)?.response?.status;

  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const items = useMemo(() => {
    const all = conversations ?? [];
    const filtered = search
      ? all.filter((conversation) => (conversation.title ?? "").toLowerCase().includes(search.toLowerCase()))
      : all;

    return [...filtered].sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === "asc" ? diff : -diff;
    });
  }, [conversations, search, sortOrder]);

  return (
    <Card className="flex h-full w-full shrink-0 flex-col overflow-hidden lg:w-80">
      <div className="border-border flex flex-col gap-2 border-b p-3">
        <NewConversationButton onCreated={onSelect} />
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute inset-s-2.5 top-1/2 size-3.5 -translate-y-1/2" />
            <Input
              placeholder="بحث في المحادثات..."
              className="h-8 ps-8 text-sm"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label={sortOrder === "desc" ? "الأحدث أولاً" : "الأقدم أولاً"}
            onClick={() => setSortOrder((order) => (order === "desc" ? "asc" : "desc"))}
          >
            <ArrowDownUp className="size-3.5" />
          </Button>
        </div>
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
            <EmptyState
              icon={MessageSquare}
              title={search ? "لا توجد نتائج مطابقة" : "لا توجد محادثات بعد"}
              description={search ? "جرّب كلمة بحث مختلفة." : "ابدأ محادثة جديدة."}
            />
          </div>
        )}

        {!isLoading && !isError && items.length > 0 && (
          <ul className="divide-border divide-y">
            {items.map((conversation) => (
              <ConversationListItem
                key={conversation.id}
                conversation={conversation}
                isSelected={selectedConversationId === conversation.id}
                onSelect={onSelect}
                onDeleted={onDeleted}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

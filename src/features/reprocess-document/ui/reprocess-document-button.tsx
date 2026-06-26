"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useReprocessDocument } from "../model/use-reprocess-document";

interface ReprocessDocumentButtonProps {
  documentId: string;
}

export function ReprocessDocumentButton({ documentId }: ReprocessDocumentButtonProps) {
  const reprocessDocumentMutation = useReprocessDocument();

  function handleReprocess() {
    reprocessDocumentMutation.mutate(documentId);
  }

  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="إعادة معالجة المستند"
      disabled={reprocessDocumentMutation.isPending}
      onClick={handleReprocess}
    >
      {reprocessDocumentMutation.isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <RotateCcw className="size-4" />
      )}
    </Button>
  );
}

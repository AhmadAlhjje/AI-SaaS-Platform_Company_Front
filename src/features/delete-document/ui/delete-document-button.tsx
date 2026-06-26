"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useDeleteDocument } from "../model/use-delete-document";

interface DeleteDocumentButtonProps {
  documentId: string;
  fileName: string;
}

export function DeleteDocumentButton({ documentId, fileName }: DeleteDocumentButtonProps) {
  const deleteDocumentMutation = useDeleteDocument();

  function handleDelete() {
    deleteDocumentMutation.mutate(documentId);
  }

  return (
    <ConfirmDialog
      trigger={
        <Button variant="ghost" size="icon-sm" aria-label="حذف المستند">
          <Trash2 className="text-destructive size-4" />
        </Button>
      }
      title="حذف المستند"
      description={`هل أنت متأكد من حذف "${fileName}"؟ لا يمكن التراجع عن هذا الإجراء.`}
      confirmLabel="حذف"
      destructive
      isPending={deleteDocumentMutation.isPending}
      onConfirm={handleDelete}
    />
  );
}

"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { UploadDocumentForm } from "@/features/upload-document";
import { Button } from "@/shared/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/shared/ui/sheet";

export function UploadDocumentSheet() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button />}>
        <Plus className="size-4" />
        رفع مستند
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>رفع مستند جديد</SheetTitle>
          <SheetDescription>PDF، CSV، أو Excel — يُضاف إلى قاعدة معرفة شركتك.</SheetDescription>
        </SheetHeader>
        <div className="px-4">
          <UploadDocumentForm onUploaded={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
}

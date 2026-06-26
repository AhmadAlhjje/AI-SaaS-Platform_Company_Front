"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, X } from "lucide-react";
import { useState, type DragEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Progress } from "@/shared/ui/progress";
import { cn } from "@/shared/lib/utils";
import { ALLOWED_FILE_TYPES, uploadDocumentSchema, type UploadDocumentFormValues } from "../model/upload-document.schema";
import { useUploadDocument } from "../model/use-upload-document";

interface UploadDocumentFormProps {
  onUploaded?: () => void;
}

export function UploadDocumentForm({ onUploaded }: UploadDocumentFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const upload = useUploadDocument();
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UploadDocumentFormValues>({ resolver: zodResolver(uploadDocumentSchema) });

  const selectedFile = useWatch({ control, name: "file" });

  function handleFileSelected(file: File) {
    setValue("file", file, { shouldValidate: true });
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelected(file);
    }
  }

  function handleUploadSubmit(values: UploadDocumentFormValues) {
    upload.mutate(values, { onSuccess: () => onUploaded?.() });
  }

  return (
    <form onSubmit={handleSubmit(handleUploadSubmit)} className="flex flex-col gap-4" noValidate>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "border-border flex flex-col items-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          isDragging && "border-primary bg-primary/5",
        )}
      >
        <Upload className="text-muted-foreground size-8" />
        {selectedFile ? (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-foreground font-medium">{selectedFile.name}</span>
            <button
              type="button"
              aria-label="إزالة الملف"
              onClick={() => setValue("file", undefined as unknown as File)}
            >
              <X className="text-muted-foreground size-4" />
            </button>
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">اسحب الملف وأفلته هنا، أو</p>
        )}
        <Label htmlFor="file-input" className="cursor-pointer">
          <span className="text-primary text-sm font-medium underline-offset-4 hover:underline">
            اختر ملفاً من جهازك
          </span>
        </Label>
        <input
          id="file-input"
          type="file"
          className="sr-only"
          accept={ALLOWED_FILE_TYPES.join(",")}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) {
              handleFileSelected(file);
            }
          }}
        />
        <p className="text-muted-foreground text-xs">PDF، CSV، Excel — حتى 50 ميجابايت</p>
      </div>
      {errors.file && <p className="text-destructive text-xs">{errors.file.message}</p>}

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="knowledgeType">نوع المعرفة</Label>
        <Input id="knowledgeType" placeholder="مثال: سياسات الشركة" {...register("knowledgeType")} />
        {errors.knowledgeType && <p className="text-destructive text-xs">{errors.knowledgeType.message}</p>}
      </div>

      {upload.isPending && <Progress value={upload.progress} />}

      <Button type="submit" disabled={upload.isPending} className="w-full">
        {upload.isPending && <Loader2 className="size-4 animate-spin" />}
        رفع المستند
      </Button>
    </form>
  );
}

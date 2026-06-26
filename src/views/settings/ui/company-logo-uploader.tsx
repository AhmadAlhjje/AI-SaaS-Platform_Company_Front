"use client";

import { Building2, Loader2, Pencil } from "lucide-react";
import { useRef, type ChangeEvent } from "react";
import type { Company } from "@/entities/company";
import { useUploadCompanyLogo } from "@/features/update-company-profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

interface CompanyLogoUploaderProps {
  company: Company;
}

export function CompanyLogoUploader({ company }: CompanyLogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadLogoMutation = useUploadCompanyLogo();

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      uploadLogoMutation.mutate(file);
    }
    event.target.value = "";
  }

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="group relative"
        aria-label="تغيير شعار الشركة"
        disabled={uploadLogoMutation.isPending}
        onClick={() => inputRef.current?.click()}
      >
        <Avatar size="lg" className="size-16">
          {company.logo && <AvatarImage src={company.logo} alt={company.name} />}
          <AvatarFallback>
            <Building2 className="size-6" />
          </AvatarFallback>
        </Avatar>
        <span className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
          {uploadLogoMutation.isPending ? (
            <Loader2 className="size-4 animate-spin text-white" />
          ) : (
            <Pencil className="size-4 text-white" />
          )}
        </span>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/svg+xml"
        className="sr-only"
        onChange={handleFileSelected}
      />

      <div>
        <p className="text-foreground text-sm font-medium">شعار الشركة</p>
        <p className="text-muted-foreground text-xs">PNG، JPG، WEBP أو SVG</p>
      </div>
    </div>
  );
}

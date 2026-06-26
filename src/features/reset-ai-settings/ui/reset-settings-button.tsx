"use client";

import { RotateCcw } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useResetAiConfiguration } from "../model/use-reset-ai-configuration";

export function ResetSettingsButton() {
  const resetAiConfigurationMutation = useResetAiConfiguration();

  return (
    <ConfirmDialog
      trigger={
        <Button variant="outline" type="button">
          <RotateCcw className="size-4" />
          إعادة الضبط
        </Button>
      }
      title="إعادة ضبط إعدادات الذكاء الاصطناعي"
      description="سيتم استرجاع القيم الافتراضية وحذف System Prompt المخصص. لا يمكن التراجع عن هذا الإجراء."
      confirmLabel="إعادة الضبط"
      destructive
      isPending={resetAiConfigurationMutation.isPending}
      onConfirm={() => resetAiConfigurationMutation.mutate()}
    />
  );
}

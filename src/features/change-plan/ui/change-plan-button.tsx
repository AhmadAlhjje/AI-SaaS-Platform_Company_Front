"use client";

import { Loader2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { ConfirmDialog } from "@/shared/ui/confirm-dialog";
import { useChangePlan } from "../model/use-change-plan";

interface ChangePlanButtonProps {
  planId: string;
  planName: string;
}

export function ChangePlanButton({ planId, planName }: ChangePlanButtonProps) {
  const changePlanMutation = useChangePlan();

  return (
    <ConfirmDialog
      trigger={
        <Button className="w-full" disabled={changePlanMutation.isPending}>
          {changePlanMutation.isPending && <Loader2 className="size-4 animate-spin" />}
          ترقية
        </Button>
      }
      title="ترقية الخطة"
      description={`هل تريد الترقية إلى خطة "${planName}"؟ سيتم تطبيق الحدود الجديدة فوراً.`}
      confirmLabel="ترقية"
      isPending={changePlanMutation.isPending}
      onConfirm={() => changePlanMutation.mutate(planId)}
    />
  );
}

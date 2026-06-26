import { Check } from "lucide-react";
import type { Plan } from "@/entities/subscription-plan";
import { ChangePlanButton } from "@/features/change-plan";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface PlanCardProps {
  plan: Plan;
  isCurrent: boolean;
}

export function PlanCard({ plan, isCurrent }: PlanCardProps) {
  return (
    <Card className={isCurrent ? "border-primary" : undefined}>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>{plan.name}</CardTitle>
        {isCurrent && <Badge variant="success">الخطة الحالية</Badge>}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p className="text-foreground text-2xl font-bold">
          {plan.price === 0 ? "مجانية" : plan.price}
          {plan.price > 0 && <span className="text-muted-foreground text-sm font-normal"> / شهرياً</span>}
        </p>

        <ul className="text-muted-foreground flex flex-col gap-1.5 text-sm">
          <li className="flex items-center gap-2">
            <Check className="text-success size-4" />
            {plan.limits.maxDocuments} مستند
          </li>
          <li className="flex items-center gap-2">
            <Check className="text-success size-4" />
            {plan.limits.maxDataTables} جدول بيانات
          </li>
        </ul>

        {!isCurrent && <ChangePlanButton planId={plan.id} planName={plan.name} />}
      </CardContent>
    </Card>
  );
}

import { CurrentPlanCard } from "./current-plan-card";
import { PlanList } from "./plan-list";
import { UsageLimitsCard } from "./usage-limits-card";

export function SubscriptionView() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-foreground text-2xl font-bold">الاشتراك</h1>
        <p className="text-muted-foreground mt-1 text-sm">إدارة خطة اشتراك شركتك وحدود الاستخدام.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CurrentPlanCard />
        <UsageLimitsCard />
      </div>

      <div>
        <h2 className="text-foreground mb-3 text-lg font-semibold">الخطط المتاحة</h2>
        <PlanList />
      </div>
    </div>
  );
}

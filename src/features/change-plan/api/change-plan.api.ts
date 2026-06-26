import { axiosInstance } from "@/shared/api/axios-instance";
import type { MySubscription } from "@/entities/subscription-plan";

// POST /subscriptions/me/change-plan — no billing integration yet (ROLE.md
// scope); switches the active plan immediately.
export async function changePlan(planId: string): Promise<MySubscription> {
  const { data } = await axiosInstance.post<MySubscription>("/subscriptions/me/change-plan", { planId });
  return data;
}

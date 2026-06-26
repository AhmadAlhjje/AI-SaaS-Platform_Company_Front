export interface PlanLimits {
  maxDocuments: number;
  maxDataTables: number;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  limits: PlanLimits;
}

export interface MySubscription {
  id: string;
  status: string;
  startDate: string;
  endDate: string | null;
  plan: Plan;
}

import { ConversationList } from "@/widgets/conversation-list";
import { DocumentList } from "@/widgets/document-list";
import { UsageSummary } from "@/widgets/usage-summary";
import { CompanyCard } from "./company-card";
import { QuickActions } from "./quick-actions";
import { WelcomeCard } from "./welcome-card";

const LATEST_ITEMS_LIMIT = 5;

export function DashboardView() {
  return (
    <div className="flex flex-col gap-6">
      <WelcomeCard />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <CompanyCard />
        <UsageSummary />
        <QuickActions />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <DocumentList limit={LATEST_ITEMS_LIMIT} />
        <ConversationList limit={LATEST_ITEMS_LIMIT} />
      </div>
    </div>
  );
}

import { Lock } from "lucide-react";

import { EmptyState } from "@/shared/ui/empty-state";

interface PermissionDeniedStateProps {
  description?: string;
  className?: string;
}

function PermissionDeniedState({ description, className }: PermissionDeniedStateProps) {
  return (
    <EmptyState
      icon={Lock}
      title="غير مخوّل"
      description={description ?? "لا تملك الصلاحية الكافية لعرض هذه البيانات."}
      className={className}
    />
  );
}

export { PermissionDeniedState };

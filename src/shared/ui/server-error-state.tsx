import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { EmptyState } from "@/shared/ui/empty-state";

interface ServerErrorStateProps {
  description?: string;
  onRetry?: () => void;
  className?: string;
}

function ServerErrorState({ description, onRetry, className }: ServerErrorStateProps) {
  return (
    <EmptyState
      icon={AlertTriangle}
      title="حدث خطأ غير متوقع"
      description={description ?? "تعذّر تحميل البيانات، يرجى المحاولة مرة أخرى."}
      action={onRetry && <Button onClick={onRetry}>إعادة المحاولة</Button>}
      className={className}
    />
  );
}

export { ServerErrorState };

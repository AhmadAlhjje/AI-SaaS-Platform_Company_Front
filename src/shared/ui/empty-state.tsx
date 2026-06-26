import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center gap-2 py-8 text-center", className)}>
      <Icon className="text-muted-foreground size-8" />
      <p className="text-foreground text-sm font-medium">{title}</p>
      {description && <p className="text-muted-foreground max-w-xs text-sm">{description}</p>}
      {action}
    </div>
  );
}

export { EmptyState };

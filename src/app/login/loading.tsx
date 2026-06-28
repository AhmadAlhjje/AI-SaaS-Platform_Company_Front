import { Skeleton } from "@/shared/ui/skeleton";

export default function LoginLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-3">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

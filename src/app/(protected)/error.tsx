"use client";

import { Button } from "@/shared/ui/button";

export default function ProtectedError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <h2 className="text-foreground text-lg font-semibold">حدث خطأ غير متوقع</h2>
      <p className="text-muted-foreground text-sm">{error.message || "يرجى المحاولة مرة أخرى."}</p>
      <Button onClick={reset}>إعادة المحاولة</Button>
    </div>
  );
}

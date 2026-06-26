"use client";

import { Button } from "@/shared/ui/button";

export default function LoginError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full max-w-sm space-y-3 text-center">
      <h2 className="text-foreground text-lg font-semibold">تعذر تحميل صفحة الدخول</h2>
      <p className="text-muted-foreground text-sm">{error.message || "يرجى المحاولة مرة أخرى."}</p>
      <Button onClick={reset}>إعادة المحاولة</Button>
    </div>
  );
}

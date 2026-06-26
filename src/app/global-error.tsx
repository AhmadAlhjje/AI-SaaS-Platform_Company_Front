"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen flex-col items-center justify-center gap-3 text-center">
        <h2 className="text-lg font-semibold">حدث خطأ غير متوقع في التطبيق</h2>
        <p className="text-muted-foreground text-sm">{error.message}</p>
        <button
          onClick={reset}
          className="bg-primary text-primary-foreground rounded-lg px-4 py-2 text-sm font-medium"
        >
          إعادة المحاولة
        </button>
      </body>
    </html>
  );
}

import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function UnauthorizedView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <ShieldAlert className="text-destructive size-12" />
      <h1 className="text-foreground text-xl font-bold">غير مخوّل بالوصول</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        لا تملك الصلاحية الكافية لعرض هذه الصفحة. تواصل مع مسؤول حسابك إذا كنت تعتقد أن هذا خطأ.
      </p>
      <Button nativeButton={false} render={<Link href="/dashboard" />}>العودة إلى لوحة التحكم</Button>
    </div>
  );
}

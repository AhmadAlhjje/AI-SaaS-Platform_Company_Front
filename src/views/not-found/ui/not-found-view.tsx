import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/shared/ui/button";

export function NotFoundView() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <FileQuestion className="text-muted-foreground size-12" />
      <h1 className="text-foreground text-xl font-bold">الصفحة غير موجودة</h1>
      <p className="text-muted-foreground max-w-sm text-sm">
        الصفحة التي تبحث عنها غير متوفرة أو تم نقلها.
      </p>
      <Button render={<Link href="/dashboard" />}>العودة إلى لوحة التحكم</Button>
    </div>
  );
}

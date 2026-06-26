import Link from "next/link";
import { FileUp, MessageSquarePlus, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const ACTIONS = [
  { href: "/documents", label: "رفع مستند", icon: FileUp },
  { href: "/conversations", label: "محادثة جديدة", icon: MessageSquarePlus },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إجراءات سريعة</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {ACTIONS.map(({ href, label, icon: Icon }) => (
          <Button key={href} variant="outline" nativeButton={false} render={<Link href={href} />}>
            <Icon className="size-4" />
            {label}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

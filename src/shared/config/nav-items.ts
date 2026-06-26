import type { LucideIcon } from "lucide-react";
import { CreditCard, LayoutDashboard, FileText, MessageSquare, Settings, Table2 } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/documents", label: "المستندات", icon: FileText },
  { href: "/data-tables", label: "جداول البيانات", icon: Table2 },
  { href: "/conversations", label: "المحادثات", icon: MessageSquare },
  { href: "/subscription", label: "الاشتراك", icon: CreditCard },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

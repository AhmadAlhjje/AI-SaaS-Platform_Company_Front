import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, FileText, MessageSquare, Settings } from "lucide-react";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/documents", label: "المستندات", icon: FileText },
  { href: "/conversations", label: "المحادثات", icon: MessageSquare },
  { href: "/settings", label: "الإعدادات", icon: Settings },
];

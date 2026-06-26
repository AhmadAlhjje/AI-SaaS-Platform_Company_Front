"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/shared/config/nav-items";
import { useSidebarStore } from "@/shared/hooks/use-sidebar-store";
import { cn } from "@/shared/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <aside
      className={cn(
        "border-border bg-sidebar fixed inset-y-0 right-0 z-40 w-64 shrink-0 border-l transition-transform lg:static lg:translate-x-0",
        isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0",
      )}
    >
      <div className="border-sidebar-border flex h-14 items-center border-b px-4">
        <span className="text-primary text-lg font-bold">Support OTP</span>
      </div>

      <nav className="flex flex-col gap-1 p-3">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

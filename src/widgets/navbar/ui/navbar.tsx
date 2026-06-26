"use client";

import { Menu, LogOut, User as UserIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { useSidebarStore } from "@/shared/hooks/use-sidebar-store";
import { useAuth } from "@/app/providers/auth-provider/auth-provider";
import { useLogout } from "@/features/logout";

export function Navbar() {
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const { user } = useAuth();
  const handleLogout = useLogout();

  return (
    <header className="border-border bg-background sticky top-0 z-30 flex h-14 items-center justify-between border-b px-4">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
        <Menu className="size-5" />
      </Button>

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" className="gap-2" />}>
          <Avatar className="size-7">
            <AvatarFallback>
              <UserIcon className="size-4" />
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium sm:inline">
            {user?.fullName ?? "المستخدم"}
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem render={<Link href="/profile" />}>
            <UserIcon className="size-4" />
            الملف الشخصي
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => {
              void handleLogout();
              toast.success("تم تسجيل الخروج بنجاح");
            }}
          >
            <LogOut className="size-4" />
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}

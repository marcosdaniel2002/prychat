// components/LayoutInner.tsx
"use client";
import { ReactNode } from "react";
import MobileHeader from "@/components/MobileHeader";
import MobileSidebar from "@/components/MobileSidebar";
import SidebarDesktop from "@/components/shared/sidebar/SidebarDesktop";
import { useChatContext } from "@/contexts/ChatContext";

export function LayoutInner({ children }: { children: ReactNode }) {
  const { chatOpen } = useChatContext();

  return (
    <div className="h-screen overflow-hidden w-full">
      <SidebarDesktop className="hidden md:fixed md:flex" />
      <div className="flex flex-col h-full w-full md:pl-72">
        <MobileHeader className={`${chatOpen ? "hidden" : "flex"} md:hidden`} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
      <MobileSidebar className={`${chatOpen ? "hidden" : "flex"} md:hidden`} />
    </div>
  );
}

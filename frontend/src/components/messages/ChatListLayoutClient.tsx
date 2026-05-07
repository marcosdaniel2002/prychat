// components/messages/ChatListLayoutClient.tsx
"use client";
import { useChatContext } from "@/contexts/ChatContext";

export default function ChatListLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chatOpen } = useChatContext();
  return (
    <section
      className={`flex-col bg-surface-container-low h-full ${chatOpen ? "hidden" : "flex w-full"} md:flex md:w-96`}
    >
      {children}
    </section>
  );
}

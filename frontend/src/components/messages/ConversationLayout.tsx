"use client";

import { useChatContext } from "@/contexts/ChatContext";

function ConversationLayout({ children }: { children: React.ReactNode }) {
  const { chatOpen } = useChatContext();
  return (
    <section
      className={`md:flex flex-1 flex-col bg-surface relative ${chatOpen ? "flex" : "hidden"} `}
    >
      {children}
    </section>
  );
}

export default ConversationLayout;

"use client";

import ChatList from "@/components/messages/ChatList";
import ConversationView from "@/components/messages/ConversationView";
import { useChatContext } from "@/contexts/ChatContext";

function page() {
  const { chatOpen, setChatOpen } = useChatContext();

  return (
    <main className="flex-1 flex h-full overflow-hidden bg-surface">
      {/* <!-- Middle Column: Chat List --> */}
      <ChatList
        setChatOpen={setChatOpen}
        className={`${chatOpen ? "hidden" : "flex w-full"} md:flex md:w-96`}
      />

      {/* <!-- Right Column: Conversation View --> */}
      <ConversationView className={`${chatOpen ? "flex" : "hidden"} md:flex`} />
    </main>
  );
}

export default page;

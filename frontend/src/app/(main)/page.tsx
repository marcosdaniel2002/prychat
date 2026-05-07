import ChatList from "@/components/messages/ChatList";
import ConversationView from "@/components/messages/ConversationView";

function page() {
  return (
    <main className="flex-1 flex h-full overflow-hidden bg-surface">
      {/* <!-- Middle Column: Chat List --> */}
      <ChatList />
      {/* <!-- Right Column: Conversation View --> */}
      <ConversationView />
    </main>
  );
}

export default page;
